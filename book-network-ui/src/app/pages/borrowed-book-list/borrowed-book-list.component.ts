import {Component, OnInit} from '@angular/core';
import {BorrowedBookResponse} from "../../services/models/borrowed-book-response";
import {PageResponseBorrowedBookResponse} from "../../services/models/page-response-borrowed-book-response";
import {returnBorrowBook} from "../../services/fn/book/return-borrow-book";
import {BookService} from "../../services/services/book.service";
import {FeedbackRequest} from "../../services/models/feedback-request";
import {FeedbackService} from "../../services/services/feedback.service";

@Component({
  selector: 'app-borrowed-book-list',
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss'
})
export class BorrowedBookListComponent implements OnInit{
  borrowedBooks: PageResponseBorrowedBookResponse = {};
  feedbackRequest: FeedbackRequest = {bookId: 0, comment: ""};
  page = 0;
  size = 5;
  selectedBook: BorrowedBookResponse| undefined=undefined;
  constructor(
    private bookService:BookService,
    private feedbackService: FeedbackService,
  ) {
  }
  returnBorrowBook(book:BorrowedBookResponse){
      this.selectedBook = book;
        this.feedbackRequest.bookId = book.id as number;
  }

  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }

  private findAllBorrowedBooks() {
    this.bookService.findAllBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp: PageResponseBorrowedBookResponse)=>{
        this.borrowedBooks = resp;
      }
    })
  }
  gotToFirstPage() {
    this.page = 0;
    this.findAllBorrowedBooks();
  }

  gotToPreviousPage() {
    this.page--;
    this.findAllBorrowedBooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBorrowedBooks();
  }

  gotToNextPage() {
    this.page++;
    this.findAllBorrowedBooks();
  }

  gotToLastPage() {
    this.page = this.borrowedBooks.totalPages as number - 1;
    this.findAllBorrowedBooks();
  }
  get isLastPage(): boolean{
    return  this.page == this.borrowedBooks.totalPages as number-1;
  }

  returnBook(withFeedback: boolean) {
      this.bookService.returnBorrowBook({
        'book-id': this.selectedBook?.id as number
      }).subscribe({
        next:()=>{
          if(withFeedback){
            this.giveFeedback();
          }
          this.selectedBook = undefined;
          this.findAllBorrowedBooks();
        }
      })
  }

  private giveFeedback() {
    this.feedbackService.saveFeedBack({
      body: this.feedbackRequest
    }).subscribe({
      next:()=>{
      }
    })
  }
}
