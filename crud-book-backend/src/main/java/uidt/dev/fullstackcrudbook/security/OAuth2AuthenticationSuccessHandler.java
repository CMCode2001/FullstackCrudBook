package uidt.dev.fullstackcrudbook.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import uidt.dev.fullstackcrudbook.model.CustomOAuth2User;
import uidt.dev.fullstackcrudbook.model.Users;
import uidt.dev.fullstackcrudbook.service.JwtService;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final ObjectMapper objectMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        Users user = oAuth2User.getUser();
        String jwtToken = jwtService.generateToken(user);

        // Ajout de logs pour débogage
        System.out.println("Generated JWT token for user: " + user.getEmail());
        System.out.println("Token: " + jwtToken);

        String redirectUrl = "http://localhost:5173/auth/google/callback?token=" +
                URLEncoder.encode(jwtToken, StandardCharsets.UTF_8) +
                "&email=" + URLEncoder.encode(user.getEmail(), StandardCharsets.UTF_8) +
                "&name=" + URLEncoder.encode(user.getNomComplet(), StandardCharsets.UTF_8);

        System.out.println("Redirecting to: " + redirectUrl);
        response.sendRedirect(redirectUrl);
    }
}