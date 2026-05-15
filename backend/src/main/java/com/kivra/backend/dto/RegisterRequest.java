package com.kivra.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Username obbligatorio")
    @Size(min = 3, max = 20, message = "Username tra 3 e 20 caratteri")
    private String username;

    @NotBlank(message = "Email obbligatoria")
    @Email(message = "Email non valida")
    private String email;

    @NotBlank(message = "Password obbligatoria")
    @Size(min = 6, message = "Password minimo 6 caratteri")
    private String password;

    @NotBlank(message = "Conferma password obbligatoria")
    private String confirmPassword;
}