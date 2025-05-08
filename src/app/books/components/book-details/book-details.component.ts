import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../../model/book';
import { CommonModule } from '@angular/common';
import { Review } from '../../model/review';
import { ReviewItemComponent } from '../review-item/review-item.component';
import { ReviewFormComponent } from '../review-form/review-form.component';

@Component({
  selector: 'bs-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, ReviewItemComponent, ReviewFormComponent]
})
export class BookDetailsComponent {
  readonly book: Book;
  reviews: Review[];

  constructor(private readonly activatedRoute: ActivatedRoute) {
    this.book = this.activatedRoute.snapshot.data['book'];
    this.reviews = this.activatedRoute.snapshot.data['reviews'];
  }

  onReviewAdded(newReview: Review): void {
    this.reviews = [newReview, ...this.reviews];
  }
}