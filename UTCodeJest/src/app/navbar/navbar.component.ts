import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  activeLink: string = '';
  profileSearchQuery: string = '';
  
  questionActive: boolean = false;  // Initialize with default value
  forumActive: boolean = false;     // Initialize with default value
  profileActive: boolean = false;   // Initialize with default value
  userImage: string = '';           // Initialize with an empty string
  userName: string = 'User Name';   // Initialize with default value
  isDropdownVisible: boolean = false;
  userDetails: any;  // Assuming you will set this in ngOnInit

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userDetails = this.userService.getUser();
    this.userImage = this.userDetails.profileImage;

    this.userName = this.userDetails.name;
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveState();
    });
  }

  updateActiveState() {
    const currentRoute = this.router.url;
    // this.questionActive = currentRoute.includes('/question');
    // this.forumActive = currentRoute.includes('/forum');
    this.profileActive = currentRoute.includes('/profile');
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  setActiveLink() {
    const currentRoute = this.router.url;
    // this.questionActive = currentRoute === '/question';
    // this.forumActive = currentRoute === '/forum';
    this.profileActive = currentRoute === '/profile';
  }
}
