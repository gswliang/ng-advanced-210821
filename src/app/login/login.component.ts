import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  orgiBodyName = this.document.body.className;

  constructor(@Inject(DOCUMENT) private document:Document,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.document.body.className = 'bg-gradient-primary';
}

 doLogin(){
  localStorage.setItem('Token',"123");
  const url = this.route.snapshot.queryParamMap.get("returnUrl");
  this.router.navigate([url]);

 }

  ngOnDestroy(): void {
    this.document.body.className = this.orgiBodyName;
  }
}
