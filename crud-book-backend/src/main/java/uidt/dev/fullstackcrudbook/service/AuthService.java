package uidt.dev.fullstackcrudbook.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uidt.dev.fullstackcrudbook.dto.AuthRequest;
import uidt.dev.fullstackcrudbook.dto.AuthResponse;
import uidt.dev.fullstackcrudbook.dto.RegisterRequest;
import uidt.dev.fullstackcrudbook.model.Users;
import uidt.dev.fullstackcrudbook.repository.UsersRepository;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    public AuthResponse register(RegisterRequest request) {
        // Vérifie si l'email existe déjà
        if (usersRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email déjà utilisé");
        }

        // Crée un nouvel utilisateur
        Users user = new Users();
        user.setNomComplet(request.getNomComplet());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Sauvegarde l'utilisateur
        usersRepository.save(user);

        // Génère le token JWT avec l'email
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token);
    }

    public AuthResponse authenticate(AuthRequest request) {
        // Authentifie l'utilisateur
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // Génère le token JWT avec l'email
        String token = jwtUtil.generateToken(request.getEmail());
        return new AuthResponse(token);
    }
}