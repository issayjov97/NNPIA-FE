import { LoginService } from './../../login/login.service';
import { SettingsService } from './settings.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInfoUpdateRequest } from './settings';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers:[ SettingsService]
})
export class SettingsComponent implements OnInit {

  postFormGroup: FormGroup;

  constructor(
    private settingsService: SettingsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();

  }
  initForm() {
    this.postFormGroup = this.formBuilder.group({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      image: new FormControl('', [Validators.required, Validators.minLength(2)]),
      location: new FormControl('', [Validators.required,])
    });
  }

  onSubmit() {
    let updateUserInfoRequest = new UserInfoUpdateRequest()
    updateUserInfoRequest.firstname = this.postFormGroup.get('firstname').value;
    updateUserInfoRequest.lastname = this.postFormGroup.get('lastname').value;
    updateUserInfoRequest.image = this.postFormGroup.get('image').value;
    updateUserInfoRequest.location = this.postFormGroup.get('location').value;
    this.settingsService.updateUser(updateUserInfoRequest).subscribe(
      (data) => { console.log(data) },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
