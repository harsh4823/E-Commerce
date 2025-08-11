package com.basics.spring_basics.Security.Response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponse {
    private Long id;
    private String username;
    @JsonIgnore
    private String jwtToken;
    private List<String> roles;

    public UserInfoResponse(Long id, String username,List<String> roles) {
        this.id = id;
        this.username = username;
        this.roles = roles;
    }
}
