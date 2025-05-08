import { Component, OnInit } from '@angular/core';
import { Book } from '../../model/book';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'bs-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule]
})
export class BookListComponent implements OnInit {
  allBooks: Book[] = [];
  books: Book[] = [];
  searchControl = new FormControl('');
  
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly booksService: BooksService
  ) {
    this.allBooks = this.activatedRoute.snapshot.data['books'];
    this.books = [...this.allBooks];
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(query => !query || query.length >= 2),
      switchMap(query => {
        if (!query) {
          return Promise.resolve(this.allBooks);
        }
        return this.booksService.searchBooks(query);
      })
    ).subscribe({
      next: (results) => {
        this.books = results;
      },
      error: (err) => {
        console.error('Error during search:', err);
        this.books = this.allBooks;
      }
    });
  }
}