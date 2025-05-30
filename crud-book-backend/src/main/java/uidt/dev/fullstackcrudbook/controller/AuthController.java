package uidt.dev.fullstackcrudbook.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uidt.dev.fullstackcrudbook.dto.AuthRequest;
import uidt.dev.fullstackcrudbook.dto.AuthResponse;
import uidt.dev.fullstackcrudbook.dto.RegisterRequest;
import uidt.dev.fullstackcrudbook.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        AuthResponse response = authService.authenticate(request);
        return ResponseEntity.ok(response);
    }
}

