package com.janath.book.common;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PageResponse<T> {

    private List<T> aontent;
    private int number;
    private int size;
    private Long totalElement;
    private int totalPages;
    private boolean first;
    private boolean last;

}
