import {Component, OnInit} from '@angular/core';
import {BookRequest} from "../../../../services/models/book-request";
import {saveBook} from "../../../../services/fn/book/save-book";
import {BookService} from "../../../../services/services/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent implements OnInit{

  errorMsg: Array<String> = [];
  selectedBookCover: any;
  selectedPicture: string | undefined;
  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: ''
  };

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute : ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    if(bookId){
        this.bookService.findBookById({
          'book-id': bookId
        }).subscribe({
          next: (book: BookResponse)=>{
            this.bookRequest = {
              id: book.id,
              title: book.title as string,
              authorName: book.authorName as string,
              isbn: book.isbn as string,
              synopsis: book.synopsis as string,
              shareable: book.shareable
            }
            if(book.cover){
              this.selectedPicture = 'data:image/jpg;base64,' + book.cover;

            }
          }
        })
    }
  }


  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];
    console.log(this.selectedBookCover);
    if(this.selectedBookCover){
      const reader = new FileReader();
      reader.onloadend = () => {
        this.selectedPicture = reader.result as string;
      }
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  saveBook() {
    // Save the book details
    this.bookService.saveBook({ body: this.bookRequest }).subscribe({
      next: (bookId) => {
        // If a book cover is selected, upload the book cover picture
        if (this.selectedBookCover) {
          this.uploadBookCover(bookId);
        } else {
          // If no cover is selected, navigate directly to 'My Books' page
          this.navigateToMyBooks();
        }
      },
      error: (err) => {
        // Handle error and display validation errors if any
        console.log(err.error);
        this.errorMsg = err.error.validationErrors;
      }
    });
  }

  uploadBookCover(bookId: number) {
    // Upload the book cover picture
    this.bookService.uploadBookCoverPicture({
      'book-id': bookId,
      body: {
        file: this.selectedBookCover
      }
    }).subscribe({
      next: () => {
        // Navigate to 'My Books' page after successful upload
        this.navigateToMyBooks();
      },
      error: (err) => {
        // Handle error (optional: you can add specific error handling for the upload process)
        console.log(err.error);
        // Navigate to 'My Books' even if the upload fails
        this.navigateToMyBooks();
      }
    });
  }

  navigateToMyBooks() {
    // Navigate to 'My Books' page
    this.router.navigate(['/books/my-books']);
  }

}
