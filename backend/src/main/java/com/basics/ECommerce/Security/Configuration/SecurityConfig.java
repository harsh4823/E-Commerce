package com.basics.ECommerce.Security.Configuration;

import com.basics.ECommerce.Model.AppRole;
import com.basics.ECommerce.Model.Role;
import com.basics.ECommerce.Model.User;
import com.basics.ECommerce.Repository.RoleRepository;
import com.basics.ECommerce.Repository.UserRepository;
import com.basics.ECommerce.Security.JWT.AuthEntryPointJWT;
import com.basics.ECommerce.Security.JWT.AuthTokenFilter;
import com.basics.ECommerce.Security.Services.UserDetailServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;
import java.util.Set;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private UserDetailServiceImp userDetailServiceImp;

    @Autowired
    private AuthEntryPointJWT unauthorizedHandler;

    @Bean
    public AuthTokenFilter authTokenFilter(){
        return new AuthTokenFilter();
    }

    @Value("${frontend.url}")
    private String frontendUrl;

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailServiceImp);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
     PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig)
            throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception{
        return http.authorizeHttpRequests(authorizeRequest ->
            authorizeRequest.
                requestMatchers("/h2-console/**","/api/auth/sign-in","/api/auth/sign-up",
                            "/images/**","/api/test/**","/v3/api-docs/**",
                            "/api/public/**","/swagger-ui/**","/swagger-ui.html").permitAll()
                .requestMatchers("/api/seller/orders").hasRole("SELLER")
                .requestMatchers("/api/admin/orders/{orderId}/status",
                        "/api/admin/products/{productID}/image", "/api/admin/products/{productId}",
                        "/api/admin/categories/{category_id}/product").hasAnyRole("ADMIN","SELLER")
                .requestMatchers("api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
                .sessionManagement(session->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(exception->
                        exception.authenticationEntryPoint(unauthorizedHandler))
                .headers(headers->
                        headers.frameOptions(frameOptionsConfig ->
                                frameOptionsConfig.sameOrigin()))
                .csrf(csrf->csrf.disable())
                .cors(cors->cors.configurationSource(corsConfigurationSource()))
                .addFilterBefore(authTokenFilter(),
                        UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer(){
        return (web -> web.ignoring()
                .requestMatchers("v2/api-docs",
                        "configuration/ui",
                        "configuration/security",
                        "swagger-resources/**",
                        "/swagger-ui/.html",
                        "/webjars/**"));
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of(frontendUrl));
        corsConfiguration.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        corsConfiguration.setAllowedHeaders(List.of("*"));
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**",corsConfiguration);
        return urlBasedCorsConfigurationSource;
    }

    @Bean
    public CommandLineRunner initData(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Retrieve or create roles
            Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER)
                    .orElseGet(() -> {
                        Role newUserRole = new Role(AppRole.ROLE_USER);
                        return roleRepository.save(newUserRole);
                    });

            Role sellerRole = roleRepository.findByRoleName(AppRole.ROLE_SELLER)
                    .orElseGet(() -> {
                        Role newSellerRole = new Role(AppRole.ROLE_SELLER);
                        return roleRepository.save(newSellerRole);
                    });

            Role adminRole = roleRepository.findByRoleName(AppRole.ROLE_ADMIN)
                    .orElseGet(() -> {
                        Role newAdminRole = new Role(AppRole.ROLE_ADMIN);
                        return roleRepository.save(newAdminRole);
                    });

            Set<Role> userRoles = Set.of(userRole);
            Set<Role> sellerRoles = Set.of(sellerRole);
            Set<Role> adminRoles = Set.of(userRole, sellerRole, adminRole);

            if (!userRepository.existsByUsername("user1")) {
                User user1 = new User("user1", "user1@example.com", passwordEncoder.encode("password1"));
                user1.setRoles(userRoles); // Set roles *before* saving
                userRepository.save(user1); // Save *only once*
            }

            if (!userRepository.existsByUsername("seller1")) {
                User seller1 = new User("seller1", "seller1@example.com", passwordEncoder.encode("password2"));
                seller1.setRoles(sellerRoles); // Set roles *before* saving
                userRepository.save(seller1); // Save *only once*
            }

            if (!userRepository.existsByUsername("admin")) {
                User admin = new User("admin", "admin@example.com", passwordEncoder.encode("adminPass"));
                admin.setRoles(adminRoles); // Set roles *before* saving
                userRepository.save(admin); // Save *only once*
            }
        };
    }

}
