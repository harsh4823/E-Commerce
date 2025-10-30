package com.basics.ECommerce.Controller;

import com.basics.ECommerce.Config.AppConst;
import com.basics.ECommerce.Payload.AuthenticationResult;
import com.basics.ECommerce.Security.Request.LoginRequest;
import com.basics.ECommerce.Security.Request.SignUpRequest;
import com.basics.ECommerce.Security.Response.MessageResponse;
import com.basics.ECommerce.Security.Response.UserInfoResponse;
import com.basics.ECommerce.Service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/sign-in")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest){
        AuthenticationResult result = authService.login(loginRequest);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,result.getCookie().toString())
                .body(result.getResponse());
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest){
        AuthenticationResult result = authService.registerUser(signUpRequest);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,result.getCookie().toString())
                .body(result.getResponse());
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
        UserInfoResponse response = authService.getUserInfo(authentication);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/sign-out")
    public ResponseEntity<?> signOutUSer(){
        ResponseCookie cookie = authService.logOutUser();
        return ResponseEntity.ok().header(
                HttpHeaders.SET_COOKIE,cookie.toString())
                .body(new MessageResponse("You've been signed out!"));
    }

    @DeleteMapping("/delete-account")
    public ResponseEntity<?> deleteUser(){
        return new ResponseEntity<>(authService.deleteUser(),HttpStatus.OK);
    }

    @GetMapping("/sellers")
    public ResponseEntity<?> getSellers(
    @RequestParam (name = "pageNumber",defaultValue = AppConst.PAGE_NUMBER,required = false) Integer pageNumber){
        Sort sortByAndOrder = Sort.by(AppConst.SORT_USERS_BY).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, Integer.parseInt(AppConst.PAGE_SIZE),sortByAndOrder);
        return ResponseEntity.ok(authService.getAllSellers(pageDetails));
    }
}
