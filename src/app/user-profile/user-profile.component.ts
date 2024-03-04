import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

data:any;
  ngOnInit() {
    this.http.get('http://localhost:3000/profiles').subscribe(res=>{
      this.data=res;
    })
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
  profileForm!: FormGroup;
  mainid:any;
  editprofile(id: string) {
    this.http.get(`http://localhost:3000/profiles/${id}`).subscribe((userData: any) => {
      this.profileForm.patchValue({
        firstName: userData.firstName,
        lastName: userData.lastName,
        addressType: userData.addressType,
        age: userData.age,
        about: userData.about,
        interest: userData.interest,
        // Fill other form fields similarly
      });
    });
this.mainid=id;
  }
  
  
  submitForm() {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
      console.log(formData);
      // Perform form submission logic here
      this.http.put(`http://localhost:3000/profiles/${this.mainid}`, formData).subscribe(res => {
        alert('Data updated successfully');
        location.reload();
        // Navigate to profile page with form data
        this.router.navigate(['/profile'], { state: { formData: formData } });
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
