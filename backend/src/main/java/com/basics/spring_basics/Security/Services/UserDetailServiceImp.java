package com.basics.spring_basics.Security.Services;

import com.basics.spring_basics.Exceptions.ResourceNotFoundException;
import com.basics.spring_basics.Model.User;
import com.basics.spring_basics.Repository.UserRepository;
import com.basics.spring_basics.Security.Response.UserInfoResponse;
import com.basics.spring_basics.Security.Util.AuthUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailServiceImp implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthUtil authUtil;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException
                        ("User Not Found with username: " + username));
        return UserDetailsImp.build(user);

    }

    public UserInfoResponse deleteUser() {
        Long userId = authUtil.loggedInUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(()->new ResourceNotFoundException("User","UserID",userId));
        userRepository.deleteById(userId);
        return modelMapper.map(user, UserInfoResponse.class);
    }
}
