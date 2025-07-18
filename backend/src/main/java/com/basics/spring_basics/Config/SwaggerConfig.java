package com.basics.spring_basics.Config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI(){
        SecurityScheme securityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .description("JWT Bearer Token");

        SecurityRequirement securityRequirement = new SecurityRequirement()
                .addList("Bearer Authentication");

        return new OpenAPI()
                .info(new Info()
                        .title("E-Commerce API")
                        .description("E-Commerce API Documentation")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Harsh Jain")
                                .email("harsh924823@gmail.com")
                                .url("https://github.com/harsh4823")))
                .components(new Components()
                        .addSecuritySchemes("Bearer Authentication",securityScheme))
                .addSecurityItem(securityRequirement);
    }
}
