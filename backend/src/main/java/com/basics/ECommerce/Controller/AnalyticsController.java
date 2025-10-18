package com.basics.ECommerce.Controller;

import com.basics.ECommerce.Payload.AnalyticsResponse;
import com.basics.ECommerce.Service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/admin/app/analytics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AnalyticsResponse> getAnalytics(){
        AnalyticsResponse response = analyticsService.getAnalyticsData();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public boolean isPalindrome(String s){
        int i=0;
        int j = n-1;

        while(i<=j){
            if(s.charAt(i)==s.charAt(j)){
                i++;
                j--;
            }else return false;
        }
        return true;
    }
    public String longestPalindrome(String s) {
        int n = s.length();
        StringBuilder res = new StringBuilder();

        for(int i=0;i<n;i++){
            for(int j=i;j<n;j++){
                String check = s.substring(i,j+1);
                if(isPalindrome(check) && check.length()>res.length()){
                    res = new StringBuilder(check);
                }else{
                    break;
                }
            }
        }
        return res.toString();
    }
}
