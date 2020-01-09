import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '@/_models';
import {AlertService, UserService, AuthenticationService } from '@/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
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
        this.loadAllUsers();
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            EmpID: ['', Validators.required],
            Project: ['', Validators.required],
            rate: ['', Validators.required],
            Comments: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Information added successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
                //let users = JSON.parse(localStorage.getItem('users')) || [];
                // console.log("users",users);

            
               localStorage.setItem('users', JSON.stringify(this.registerForm.value));
               let users = JSON.parse(localStorage.getItem('users')) || [];
                console.log("users",users);
                this.alertService.clear();
    }
    
}