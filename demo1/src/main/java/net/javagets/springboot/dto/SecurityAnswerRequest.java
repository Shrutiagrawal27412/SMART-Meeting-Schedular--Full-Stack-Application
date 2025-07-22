package net.javagets.springboot.dto;

public class SecurityAnswerRequest {
    private String email;
    private String securityAnswer;
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSecurityAnswer() { return securityAnswer; }
    public void setSecurityAnswer(String securityAnswer) { this.securityAnswer = securityAnswer; }
}
