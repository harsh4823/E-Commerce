package com.basics.spring_basics.security.Request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class LoginRequest {
    @NotBlank
    @Size(max = 20)
    private String username;
    private String password;
}
