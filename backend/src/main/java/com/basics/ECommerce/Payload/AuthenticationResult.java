package com.basics.ECommerce.Payload;

import com.basics.ECommerce.Security.Response.UserInfoResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.ResponseCookie;

@Data
@AllArgsConstructor
public class AuthenticationResult {
    private final UserInfoResponse response;
    private final ResponseCookie cookie;
}
