package com.hdc.service;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebMvc
public class SecurityConfig extends WebMvcConfigurerAdapter {
	

  /*  @Override
    @Bean
    public UserDetailsService userDetailsService() {
        return new CustomUserDetailsService();
    }

    @Override  
    protected void configure(AuthenticationManagerBuilder auth)  
            throws Exception {  
        auth.userDetailsService(userDetailsService());  
    }  

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/", "/home").permitAll()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/login")
                .defaultSuccessUrl("/teacher")
                .permitAll()
                .and()
            .logout()
                .permitAll();
    }*/
	
    @Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	/*@Override
	public void addCorsMappings(CorsRegistry registry) {
    	System.out.println("in");
		registry.addMapping("/**")
				.allowedOrigins("*")
				.allowedMethods("POST", "GET", "PUT", "OPTIONS", "DELETE")
				.allowedHeaders("*")
				.exposedHeaders("access-control-allow-headers",
						"access-control-allow-methods",
						"access-control-allow-origin",
						"access-control-max-age",
						"X-Frame-Options")
				.allowCredentials(false).maxAge(3600);
	}*/




}