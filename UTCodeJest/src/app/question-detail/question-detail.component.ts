import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css'],
})
export class QuestionDetailComponent implements OnInit {

  userDetails: any;
  userImage: string = '';
  currPost: any;
  liked: boolean = false;
  userComment = '';
  comments: any;

  constructor(
    private postService: PostService,
    private http: HttpClient,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Get the user details from the service
    this.userDetails = this.userService.getUser();
    console.log('User Details:', this.userDetails);

    // Now that userDetails is set, get the user image
    if (this.userDetails && this.userDetails.profileImage) {
        this.userImage = this.userDetails.profileImage;
    }
    this.currPost = this.postService.getPost();
    this.comments = this.currPost.comment;
  }

  // Define the toggleLike method
  toggleLike(comment: any): void {
    // Assuming 'comment' has a 'liked' property which is a boolean
    // and a 'likes' property which is a number of likes
    comment.liked = !comment.liked; // Toggle the liked state of the comment

    if (comment.liked) {
      comment.likes += 1; // Increment likes if comment is liked
    } else {
      comment.likes -= 1; // Decrement likes if comment is unliked
    }
  }

  addComment(): void {
    const userDetails = this.userService.getUser();
    if (this.userComment.trim()) {
      // Create a new comment object with text and order number
      const newComment = {
        text: this.userComment,
        user: userDetails,
        name: userDetails?.name,
        postId: this.currPost._id,
        likes: 0
      };

      this.http
        .post(
          'https://nutritious-flax-squid.glitch.me/api/posts/comment',
          newComment
        )
        .subscribe(
          (response) => {
            console.log(response);

            this.comments = response;
            // Handle success - maybe navigate the user or display a success message
            // this.showSuccessModal();
          },
          (error) => {
            console.error(error);
            // Handle error - maybe display an error message to the user
          }
        );

      // Add the new comment to the beginning of the comments array

      this.userComment = '';
    }
  }

  getFileType(fileBase64: string): string {
    if (fileBase64.startsWith('data:image')) {
      return 'image';
    } else if (fileBase64.startsWith('data:application/pdf')) {
      return 'pdf';
    } else if (fileBase64.startsWith('data:text/plain')) {
      return 'text';
    }
    return 'unknown';
  }

}
