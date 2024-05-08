package com.janath.book.feedback;

import com.janath.book.book.Book;
import com.janath.book.book.BookRepository;
import com.janath.book.common.PageResponse;
import com.janath.book.exception.OperationNotPermittedException;
import com.janath.book.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    private final BookRepository bookRepository;
    private final FeedBackMapper feedBackMapper;
    private final FeedbackRepository feedbackRepository;


    public Integer save(FeedbackRequest request, Authentication connectedUser) {
        Book book = bookRepository. findById(request.bookId())
                .orElseThrow(()->new EntityNotFoundException("No book found with Id:: "+request.bookId()));
        if (book.isArchive()|| !book.isShareable()){
            throw new OperationNotPermittedException("You cannot give a feedback for an archived or not shareable book");
        }
        User user = (User) connectedUser.getPrincipal();
        if(Objects.equals(book.getOwner().getId(), user.getId())){
            throw new OperationNotPermittedException("You cannot give a feedback for a different user");
        }
        Feedback feedback = feedBackMapper.toFeedback(request);
        return feedbackRepository.save(feedback).getId();
    }

    public PageResponse<FeedbackResponse> findAllFeedbackByBook(Integer bookId, int page, int size, Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page,size);
        User user = (User) connectedUser.getPrincipal();
        Page<Feedback> feedbacks = feedbackRepository.findAllByBookId(bookId,pageable);
        List<FeedbackResponse> feedbackResponses = feedbacks.stream()
                .map(f-> feedBackMapper.toFeedbackResponse(f,user.getId()))
                .toList();
        return new PageResponse<>(
                feedbackResponses,
                feedbacks.getNumber(),
                feedbacks.getSize(),
                feedbacks.getTotalElements(),
                feedbacks.getTotalPages(),
                feedbacks.isFirst(),
                feedbacks.isLast()
        );
    }
}
