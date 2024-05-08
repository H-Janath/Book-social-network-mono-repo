package com.janath.book.feedback;

import com.janath.book.book.Book;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class FeedBackMapper {

    public Feedback toFeedback(FeedbackRequest request) {
        return Feedback.builder()
                .note(request.note())
                .comment(request.comment())
                .book(Book.builder()
                        .id(request.bookId())
                        .archive(false)// Not required and has no impact :: just to satisfy lombok
                        .shareable(false)
                        .build()
                )
                .build();
    }

    public FeedbackResponse toFeedbackResponse(Feedback feedback, Integer id) {
        return FeedbackResponse
                .builder()
                .note(feedback.getNote())
                .comment(feedback.getComment())
                .ownFeedback(Objects.equals(feedback.getCreatedBy(),id))
                .build();
    }
}
