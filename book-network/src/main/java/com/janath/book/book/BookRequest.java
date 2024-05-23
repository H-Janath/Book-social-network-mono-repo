package com.janath.book.book;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record BookRequest(
        Integer id,
        @NotNull(message = "Book id can't be null")
        @NotEmpty(message = "Book id can't be empty")
        String title,
        @NotNull(message = "Book title can't be null")
        @NotEmpty(message = "Book title can't be empty")
        String authorName,
        @NotNull(message = "Author name can't be null")
        @NotEmpty(message = "Author name can't be empty")
        String isbn,
        @NotNull(message = "ISBN number can't be null")
        @NotEmpty(message = "ISBN number can't be empty")
        String synopsis,
        boolean shareable
) {
}
