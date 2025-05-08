import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Review } from '../../model/review';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'bs-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ReviewFormComponent implements OnInit {
  @Input() bookId!: number;
  @Output() reviewAdded = new EventEmitter<Review>();
  
  reviewForm!: FormGroup;
  submitting = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly reviewsService: ReviewsService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.reviewForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      rate: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      forBook: [this.bookId]
    });
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      this.submitting = true;
      
      const newReview = this.reviewForm.value;
      
      this.reviewsService.saveReview(newReview).subscribe({
        next: (savedReview) => {
          this.reviewAdded.emit(savedReview);
          this.resetForm();
          this.submitting = false;
        },
        error: (err) => {
          console.error('Error saving review:', err);
          this.submitting = false;
        }
      });
    }
  }

  private resetForm(): void {
    this.reviewForm.reset({
      title: '',
      description: '',
      rate: 5,
      forBook: this.bookId
    });
  }
}