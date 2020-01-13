import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '@/_models';
import {AlertService, UserService, AuthenticationService } from '@/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ templateUrl: 'managerView.component.html' })
export class ManagerViewComponent implements OnInit {

    currentUser: User;
    users = [];
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        console.log("innn");
        this.loadAllUsers();
    }


    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    
    
}