package com.basics.ECommerce.Security.Request;

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
