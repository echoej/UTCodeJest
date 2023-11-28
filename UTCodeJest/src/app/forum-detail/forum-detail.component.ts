import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.css']
})

export class ForumDetailComponent implements OnInit {
  userComment = ''; // For the new comment input by the user
  comments: { text: string, order: number }[] = []; // Initialize as an empty array or with your initial comments
  orderCounter = this.comments.length + 1; // Initialize the order counter to the highest value

  // Added new component for user image
  userDetails: any;  // Assuming you will set this in ngOnInit
  userImage: string = '';           // Initialize with an empty string

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userDetails = this.userService.getUser();
    if (this.userDetails && this.userDetails.profileImage) {
      this.userImage = this.userDetails.profileImage;
    }

  }
  
  
  addComment(): void {
    if (this.userComment.trim()) {  
      // Create a new comment object with text and order number
      const newComment = {
        text: this.userComment,
        order: this.orderCounter++
      };
      
      // Add the new comment to the beginning of the comments array
      this.comments.unshift(newComment);

      this.userComment = '';
    }
  }  

  // ... other methods ...
}


