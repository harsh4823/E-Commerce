package com.basics.spring_basics.security.Request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class SignUpRequest {
    private String username;
    private String password;
    private String email;
    Set<String> roles;
}
