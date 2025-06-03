package uidt.dev.fullstackcrudbook.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import uidt.dev.fullstackcrudbook.model.CustomOAuth2User;
import uidt.dev.fullstackcrudbook.model.Provider;
import uidt.dev.fullstackcrudbook.model.Role;
import uidt.dev.fullstackcrudbook.model.Users;
import uidt.dev.fullstackcrudbook.repository.UsersRepository;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UsersRepository usersRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        log.info("OAuth2User attributes: {}", oAuth2User.getAttributes());
        return processOAuth2User(oAuth2User);
    }

    private CustomOAuth2User processOAuth2User(OAuth2User oAuth2User) {
        Map<String, Object> attributes = oAuth2User.getAttributes();
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");

        log.info("Processing OAuth2 user with email: {}", email);

        Users user = usersRepository.findByEmail(email)
                .map(existingUser -> {
                    log.info("Found existing user: {}", existingUser.getEmail());
                    return updateExistingUser(existingUser, name);
                })
                .orElseGet(() -> {
                    log.info("Creating new user for email: {}", email);
                    return registerNewUser(email, name);
                });

        return new CustomOAuth2User(user, attributes);
    }

    private Users registerNewUser(String email, String name) {
        Users newUser = new Users();
        newUser.setNomComplet(name);
        newUser.setEmail(email);
        newUser.setProvider(Provider.GOOGLE);
        newUser.setRole(Role.USER);
        newUser.setPassword(""); // ✅ Correction ici : empêche null
        return usersRepository.save(newUser);
    }

    private Users updateExistingUser(Users existingUser, String newName) {
        if (!newName.equals(existingUser.getNomComplet())) {
            existingUser.setNomComplet(newName);
            return usersRepository.save(existingUser);
        }
        return existingUser;
    }
}
