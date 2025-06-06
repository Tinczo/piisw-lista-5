

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../model/review';

const reviewsApiPrefix = '/api/reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private readonly http: HttpClient) { }

  getReviewsForBook(bookId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${reviewsApiPrefix}?forBook=${bookId}`);
  }

  saveReview(review: Omit<Review, 'id'>): Observable<Review> {
    return this.http.post<Review>(reviewsApiPrefix, review);
  }
} 