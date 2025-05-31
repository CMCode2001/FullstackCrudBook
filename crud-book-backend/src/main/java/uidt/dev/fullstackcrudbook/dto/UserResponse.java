package uidt.dev.fullstackcrudbook.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String nomComplet;
    private String email;

}