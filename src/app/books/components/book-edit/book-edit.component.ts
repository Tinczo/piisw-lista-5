import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Book } from '../../model/book';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'bs-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class BookEditComponent implements OnInit {
  bookForm!: FormGroup;
  originalBook!: Book;
  
  constructor(
    private readonly fb: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly booksService: BooksService,
    private readonly router: Router
  ) {
    this.originalBook = this.activatedRoute.snapshot.data['book'];
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {

    this.bookForm = this.fb.group({
      id: [this.originalBook.id],
      title: [this.originalBook.title, [Validators.required, Validators.maxLength(50)]],
      author: [this.originalBook.author, [Validators.required, Validators.maxLength(50)]],
      year: [this.originalBook.year, [
        Validators.required, 
        Validators.min(1000), 
        Validators.max(2023)
      ]],
      description: [this.originalBook.description, [Validators.maxLength(1000)]]
    });
  }

  get isFormDirty(): boolean {
    return this.bookForm.dirty;
  }

  get isFormValid(): boolean {
    return this.bookForm.valid;
  }

  get isSaveButtonEnabled(): boolean {
    return this.isFormValid && this.isFormDirty;
  }

  onSave(): void {
    if (this.isFormValid && this.isFormDirty) {
      const updatedBook: Book = this.bookForm.value;
      this.booksService.saveBook(updatedBook).subscribe({
        next: () => {
          this.router.navigate(['/books']);
        },
        error: (err) => {
          console.error('Error saving book:', err);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/books']);
  }
}