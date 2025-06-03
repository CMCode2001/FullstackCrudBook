package uidt.dev.fullstackcrudbook.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uidt.dev.fullstackcrudbook.dto.UserResponse;
import uidt.dev.fullstackcrudbook.service.AuthService;

@RestController
@RequestMapping("/api-book/users")
@RequiredArgsConstructor
public class CurrentUserController {

    private final AuthService authService;

    @GetMapping("/current")
    public UserResponse getCurrentUser(@AuthenticationPrincipal Object principal) {
        String email;

        if (principal instanceof org.springframework.security.core.userdetails.UserDetails userDetails) {
            email = userDetails.getUsername();
        } else if (principal instanceof uidt.dev.fullstackcrudbook.model.CustomOAuth2User customUser) {
            email = customUser.getUser().getEmail(); // ou getEmail() si c'est défini comme tel
        } else {
            throw new RuntimeException("Utilisateur non authentifié");
        }

        return authService.getCurrentUser(email);
    }

}