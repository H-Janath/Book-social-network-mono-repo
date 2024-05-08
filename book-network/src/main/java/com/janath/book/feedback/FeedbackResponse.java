package com.janath.book.feedback;

import lombok.*;
import org.springframework.stereotype.Service;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FeedbackResponse {
    private Double note;
    private String comment;
    private boolean ownFeedback;
}
