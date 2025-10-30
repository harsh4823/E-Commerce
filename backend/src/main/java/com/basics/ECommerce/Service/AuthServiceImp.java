package com.basics.ECommerce.Service;

import com.basics.ECommerce.Exceptions.APIExceptions;
import com.basics.ECommerce.Exceptions.ResourceNotFoundException;
import com.basics.ECommerce.Model.AppRole;
import com.basics.ECommerce.Model.Role;
import com.basics.ECommerce.Model.User;
import com.basics.ECommerce.Payload.AuthenticationResult;
import com.basics.ECommerce.Payload.UserDTO;
import com.basics.ECommerce.Payload.UserResponse;
import com.basics.ECommerce.Repository.RoleRepository;
import com.basics.ECommerce.Repository.UserRepository;
import com.basics.ECommerce.Security.JWT.JWTUtils;
import com.basics.ECommerce.Security.Request.LoginRequest;
import com.basics.ECommerce.Security.Request.SignUpRequest;
import com.basics.ECommerce.Security.Response.UserInfoResponse;
import com.basics.ECommerce.Security.Services.UserDetailsImp;
import com.basics.ECommerce.Security.Util.AuthUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthServiceImp implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtUtils;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final AuthUtil authUtil;
    private final ModelMapper modelMapper;

    @Override
    public AuthenticationResult login(LoginRequest loginRequest) {
        System.out.println("Attempting login for email: [" + loginRequest.getEmail() + "]");
        Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken
                            (loginRequest.getEmail(),loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImp userDetails = (UserDetailsImp) authentication.getPrincipal();

        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
        String jwtToken = jwtCookie.getValue();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        User user = userRepository.findById(userDetails.getId()).
                orElseThrow(() -> new ResourceNotFoundException("User", "id", userDetails.getId()));

        UserInfoResponse userInfoResponse = new UserInfoResponse(user.getUserId(),user.getUsername(),user.getEmail(),jwtToken,roles);
        return new AuthenticationResult(userInfoResponse,jwtCookie);
    }

    @Override
    @Transactional
    public AuthenticationResult registerUser(SignUpRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())){
            throw new APIExceptions("Email Already Exists");
        }
        User user = new User(signUpRequest.getUsername(),signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> StrRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (StrRoles==null){
            Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER)
                    .orElseThrow(()->new RuntimeException("Error: Role is not found"));
            roles.add(userRole);
        }else {
            StrRoles.forEach(role->{
                switch (role){
                    case "admin":
                        Role adminRole  =  roleRepository.findByRoleName(AppRole.ROLE_ADMIN)
                                .orElseThrow(()->new RuntimeException("Error: Role is not found"));
                        roles.add(adminRole);
                        break;
                    case "seller":
                        Role sellerRole = roleRepository.findByRoleName(AppRole.ROLE_SELLER)
                                .orElseThrow(()->new RuntimeException("Error: Role is not found"));
                        roles.add(sellerRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER)
                                .orElseThrow(()->new RuntimeException("Error: Role is not found"));
                        roles.add(userRole);
                        break;
                }
            });
        }
        user.setRoles(roles);
        userRepository.save(user);

        SecurityContextHolder.clearContext();

        LoginRequest loginRequest = new LoginRequest(signUpRequest.getEmail(), signUpRequest.getPassword());

        return login(loginRequest);
    }

    @Override
    public UserInfoResponse getUserInfo(Authentication authentication) {
        UserDetailsImp userDetailsImp = (UserDetailsImp) authentication.getPrincipal();
        List<String> roles = userDetailsImp.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .toList();
        return new UserInfoResponse(
                userDetailsImp.getId(),userDetailsImp.getUsername(),roles);
    }

    @Override
    public ResponseCookie logOutUser() {
        return jwtUtils.cleanCookie();
    }

    @Override
    public UserInfoResponse deleteUser() {
        Long userId = authUtil.loggedInUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(()->new ResourceNotFoundException("User","UserID",userId));
        userRepository.deleteById(userId);
        return modelMapper.map(user, UserInfoResponse.class);
    }

    @Override
    public UserResponse getAllSellers(Pageable pageable) {
        Page<User> users = userRepository.findByRoleName(AppRole.ROLE_SELLER,pageable);
        List<UserDTO> userDTOS = users.getContent()
                .stream()
                .map(p->modelMapper.map(p, UserDTO.class))
                .toList();
        return new UserResponse(
                userDTOS,
                users.getNumber(),
                users.getSize(),
                users.getTotalElements(),
                users.getTotalPages(),
                users.isLast()
        );
    }
}
