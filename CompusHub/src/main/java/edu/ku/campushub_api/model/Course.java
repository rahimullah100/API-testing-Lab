package edu.ku.campushub_api.model;

public record Course(
        Long id,
        String code,
        String title,
        int credit
) {
}
