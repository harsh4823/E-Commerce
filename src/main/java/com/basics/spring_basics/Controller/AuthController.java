package com.basics.spring_basics.Controller;

import com.basics.spring_basics.Model.AppRole;
import com.basics.spring_basics.Model.Role;
import com.basics.spring_basics.Model.User;
import com.basics.spring_basics.Repository.RoleRepository;
import com.basics.spring_basics.Repository.UserRepository;
import com.basics.spring_basics.security.JWT.JWTUtils;
import com.basics.spring_basics.security.Request.LoginRequest;
import com.basics.spring_basics.security.Request.SignUpRequest;
import com.basics.spring_basics.security.Response.MessageResponse;
import com.basics.spring_basics.security.Response.UserInfoResponse;
import com.basics.spring_basics.security.Services.UserDetailsImp;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/sign-in")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest){
        Authentication authentication;
        try{
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken
                            (loginRequest.getUsername(),loginRequest.getPassword()));
        } catch (AuthenticationException e) {
            Map<String,Object> map = new HashMap<>();
            map.put("message","Bad Credentials");
            map.put("Status",false);
            return new ResponseEntity<>(map,HttpStatus.NOT_FOUND);
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImp userDetails = (UserDetailsImp) authentication.getPrincipal();

        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
        String jwtToken = jwtCookie.getValue();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        UserInfoResponse response = new UserInfoResponse(userDetails.getId(),userDetails.getUsername(),jwtToken,roles);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,jwtCookie.toString())
                .body(response);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest){
        if (userRepository.existsByUsername(signUpRequest.getUsername())){
            return ResponseEntity.badRequest().
                    body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())){
            return ResponseEntity.badRequest().
                    body(new MessageResponse("Error: Email is already in use!"));
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

        LoginRequest loginRequest = new LoginRequest(signUpRequest.getUsername(), signUpRequest.getPassword());

        return authenticateUser(loginRequest);
    }

    @GetMapping("/username")
    public String currentUserName(Authentication authentication){
        if(authentication==null){
            return "No user is logged in";
        }
        return authentication.getName();
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserInfo(Authentication authentication){
        UserDetailsImp userDetailsImp = (UserDetailsImp) authentication.getPrincipal();
        List<String> roles = userDetailsImp.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .toList();
        UserInfoResponse response = new UserInfoResponse(
                userDetailsImp.getId(),userDetailsImp.getUsername(),roles);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/sign-out")
    public ResponseEntity<?> signOutUSer(){
        ResponseCookie cookie = jwtUtils.cleanCookie();
        return ResponseEntity.ok().header(
                HttpHeaders.SET_COOKIE,cookie.toString())
                .body(new MessageResponse("You've been signed out!"));
    }
}
