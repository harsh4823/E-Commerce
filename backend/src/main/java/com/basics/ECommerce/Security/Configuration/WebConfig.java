//package com.basics.ECommerce.Security.Configuration;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//
//    @Value("${frontend.url}")
//    private String path;
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        System.out.println("=== CORS IS ALLOWING TRAFFIC FROM: " + path + " ===");
//        registry.addMapping("/**")
//                .allowedOrigins(path)
//                .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
//                .allowedHeaders("*")
//                .allowCredentials(true);
//    }
//}
