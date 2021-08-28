import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  origBodyClassName: string;

  data: any = {
    email: '',
    mima: '',
    isRememberMe: true
  };

  constructor(@Inject(DOCUMENT) private document: Document,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.origBodyClassName = this.document.body.className;
    this.document.body.className = 'bg-gradient-primary';
  }

  doLogin() {

    // 假設登入驗證成功，寫入 Token 到 localStorage 中
    localStorage.setItem('token', '123');

    var url = this.route.snapshot.queryParamMap.get('returnUrl');
    if (!!url) {
      this.router.navigateByUrl(url);
    }

  }

  ngOnDestroy(): void {
    this.document.body.className = this.origBodyClassName;
  }
}
