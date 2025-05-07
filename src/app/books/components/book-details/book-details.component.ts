import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../../model/book';
import { CommonModule } from '@angular/common';
import { Review } from '../../model/review';
import { ReviewItemComponent } from '../review-item/review-item.component';

@Component({
  selector: 'bs-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, ReviewItemComponent]
})
export class BookDetailsComponent {
  readonly book: Book;
  readonly reviews: Review[];

  constructor(private readonly activatedRoute: ActivatedRoute) {
    this.book = this.activatedRoute.snapshot.data['book'];
    this.reviews = this.activatedRoute.snapshot.data['reviews'];
  }
}