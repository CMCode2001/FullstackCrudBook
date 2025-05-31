package uidt.dev.fullstackcrudbook.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uidt.dev.fullstackcrudbook.dto.AuthRequest;
import uidt.dev.fullstackcrudbook.dto.AuthResponse;
import uidt.dev.fullstackcrudbook.dto.RegisterRequest;
import uidt.dev.fullstackcrudbook.dto.UserResponse;
import uidt.dev.fullstackcrudbook.model.Users;
import uidt.dev.fullstackcrudbook.repository.UsersRepository;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (usersRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email déjà utilisé");
        }

        Users user = new Users();
        user.setNomComplet(request.getNomComplet());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        usersRepository.save(user);
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token);
    }

    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        String token = jwtUtil.generateToken(request.getEmail());
        return new AuthResponse(token);
    }


    public UserResponse getCurrentUser(String email) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));

        return UserResponse.builder()
                .id(user.getId())
                .nomComplet(user.getNomComplet())
                .email(user.getEmail())
                .build();
    }
}