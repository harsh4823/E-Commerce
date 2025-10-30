package com.basics.ECommerce.Service;

import com.basics.ECommerce.Payload.AuthenticationResult;
import com.basics.ECommerce.Payload.UserResponse;
import com.basics.ECommerce.Security.Request.LoginRequest;
import com.basics.ECommerce.Security.Request.SignUpRequest;
import com.basics.ECommerce.Security.Response.UserInfoResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;

public interface AuthService {
    AuthenticationResult login(LoginRequest loginRequest);

    AuthenticationResult registerUser(@Valid SignUpRequest signUpRequest);

    UserInfoResponse getUserInfo(Authentication authentication);

    ResponseCookie logOutUser();

    UserInfoResponse deleteUser();

    UserResponse getAllSellers(Pageable pageDetails);
}
