import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  profileForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,public http:HttpClient, private  router:Router) {}

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      addressType: ['home'],
      interest: [''],
      interests: [[]],
      address1: [''],
      address2: [''],
      companyAddress1: [''],
      companyAddress2: [''],
      age: [0], // Assuming the age range starts from 0
      about: [''] // Assuming the age range starts from 0

    });
  }

  submitForm() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      // You can perform form submission logic here
      this.http.post('http://localhost:3000/profiles', this.profileForm.value).subscribe(res => {
        alert('Data posted successfully');
        // Navigate to profile page with form data
        this.router.navigate(['/profile'], { state: { formData: this.profileForm.value } });
      });
    }
  }


  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profileImage', file);

      // Merge the formData with the existing form data
      const existingFormData = this.profileForm.get('profileImage')?.value;
      if (existingFormData) {
        Object.keys(existingFormData).forEach(key => {
          formData.append(key, existingFormData[key]);
        });
      }

      // Update the profileForm with the merged formData
      this.profileForm.patchValue({
        profileImage: formData
      });
    }
  }


  removeInterest(tag: string) {
    // Remove interest logic here
  }



}

