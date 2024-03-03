import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
constructor(private http:HttpClient , private route: ActivatedRoute){
  this.route.paramMap.subscribe(params => {
    if (window.history.state.formData) {
      this.formData = window.history.state.formData;
    }
  });
}
data:any;
formData: any;
userData: any; // This will hold the user's registration data

ngOnInit(){
  this.http.get('http://localhost:3000/profiles').subscribe(res=>{
this.data=res;
      //  location.reload();


  })
}
editPhoto() {
  // Implement logic to handle photo editing
  console.log('Editing photo...');
}

editProfile() {
  // Implement logic to navigate to the edit profile page or show an edit form
  console.log('Editing profile...');
}
}
