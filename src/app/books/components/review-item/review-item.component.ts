import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from '../../model/review';

@Component({
  selector: 'bs-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ReviewItemComponent {
  @Input() review!: Review;
}