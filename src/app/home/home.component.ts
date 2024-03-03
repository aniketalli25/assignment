import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
declare var bootstrap: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
   isTransparent = true;
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 100) {
      this.isTransparent = false;
      this.isScrolled = true;
    } else {
      this.isTransparent = true;
      this.isScrolled = false;
    }
  }

}
