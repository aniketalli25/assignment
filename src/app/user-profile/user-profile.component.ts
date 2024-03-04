import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public router: Router
  ) {}

  formData: any;
  profileForm!: FormGroup;

  ngOnInit() {
    // Initialize profileForm
    this.profileForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      addressType: [''],
      interest: [''],
      address1: [''],
      address2: [''],
      companyAddress1: [''],
      companyAddress2: [''],
      age: [''],
      profileImage: ['']
    });

    this.route.paramMap.subscribe(params => {
      if (window.history.state.formData) {
        this.formData = window.history.state.formData;
        // Populate form fields with data
        this.populateForm(this.formData);
      }
    });
  }

  populateForm(data: any) {
    this.profileForm.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      addressType: data.addressType,
      interest: data.interest,
      address1: data.address1,
      address2: data.address2,
      companyAddress1: data.companyAddress1,
      companyAddress2: data.companyAddress2,
      age: data.age,
      profileImage: data.profileImage
    });
  }

  editPhoto() {
    // Implement logic to handle photo editing
    console.log('Editing photo...');
  }

  editProfile(id: any) {
    this.http.get(`http://localhost:3000/profiles/${id}`).subscribe((res: any) => {
      this.populateForm(res);
    });
  }

  submitForm() {
    if (this.profileForm.valid) {
      // Send HTTP PUT request to update profile data
      this.http.put(`http://localhost:3000/profiles/${this.formData.id}`, this.profileForm.value).subscribe(
        (res) => {
          // Upon successful update, show alert and navigate back to profile page with updated data
          alert('Data updated successfully');
          this.router.navigate(['/profile'], { state: { formData: this.profileForm.value } });
        },
        (error) => {
          // Handle error if the server responds with an error
          console.error('Error updating profile:', error);
          // You could show an error message to the user here
        }
      );
    }
  }

  handleFileInput(event: any) {
    // File handling logic
  }

  removeInterest(tag: string) {
    // Remove interest logic here
  }
}
