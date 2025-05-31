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
    public UserResponse getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        return authService.getCurrentUser(userDetails.getUsername());
    }
}