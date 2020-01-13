import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '@/_models';
import {AlertService, UserService, AuthenticationService } from '@/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ templateUrl: 'gridView.component.html' })
export class GridViewComponent implements OnInit {

    currentUser: User;
    users = [];
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    domains = [];
    isVisible : boolean = false;
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        this.domains = [
            {
              "_id" : "12323vdfvd234",
              "name" : "demo1",
              "reg_date" : "**",
              "editable": false
            },
            {
              "_id" : "12323vdfvd234",
              "name" : "demo2",
              "reg_date" : "***",
              "editable": false
            }
          ]
          
          console.log(this.domains);
    }
    

editDomain(domain: any){
    domain.editable = !domain.editable;
  }

    ngOnInit() {

    }

   
    
}