package com.basics.spring_basics.Security.Util;

import com.basics.spring_basics.Model.User;
import com.basics.spring_basics.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class AuthUtil {

    @Autowired
    private UserRepository userRepository;

    private Authentication getAuthentication() {
        System.out.println("AUTH CONTEXT: " + SecurityContextHolder.getContext().getAuthentication());

        return SecurityContextHolder.getContext().getAuthentication();
    }

    public String loggedInEmail() {
        User user = userRepository.findByUsername(getAuthentication().getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return user.getEmail();
    }

    public User loggedInUser() {
        return userRepository.findByUsername(getAuthentication().getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public Long loggedInUserId() {
        User user = userRepository.findByUsername(getAuthentication().getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return user.getUserId();
    }


}
