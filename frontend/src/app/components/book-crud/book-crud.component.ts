import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book-crud',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HttpClientJsonpModule],
  templateUrl: './book-crud.component.html',
  styleUrl: './book-crud.component.css'
})


export class BookCrudComponent {
  books: any[] = [];
  bookForm: FormGroup;
  selectedBookId: number | null = null;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      bookname: '',
      author: '',
      price: ''
    });   
    this.loadBooks();
  }

  // Fetch all books
  // loadBooks() {
  //   this.http.get<any>('/api/books').subscribe((res) => {
  //     this.books = res.data;
  //   });
  // }
  loadBooks() {
    this.http.get<any>('http://localhost:8088/api/books').subscribe(
      (res) => {
        console.log('Books fetched:', res); // Log the fetched books
        this.books = res.data;
      },
      (error) => {
        console.error('Error fetching books:', error); // Log any error
      }
    );
  }
  
  

  // Create or Update a book
  saveBook() {
    if (this.selectedBookId) {
      this.http.put(`http://localhost:8088/api/books/update/${this.selectedBookId}`, this.bookForm.value).subscribe(() => {
        this.loadBooks();
        this.resetForm();
      });
    } else {
      this.http.post('http://localhost:8088/api/books/add', this.bookForm.value).subscribe(() => {
        this.loadBooks();
        this.resetForm();
      });
    }
  }

  // Edit book details
  editBook(book: any) {
    this.selectedBookId = book.id;
    this.bookForm.patchValue(book);
  }

  // Delete book
  deleteBook(id: number) {
    this.http.delete(`http://localhost:8088/api/books/delete/${id}`).subscribe(() => {
      this.loadBooks();
    });
  }

  resetForm() {
    this.bookForm.reset();
    this.selectedBookId = null;
  }
}
