import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {

  origBodyClassName: string;

  data: any = {
    email: '',
    mima: '1231123123',
    isRememberMe: true
  };

  constructor(@Inject(DOCUMENT) private document: Document,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.origBodyClassName = this.document.body.className;
    this.document.body.className = 'bg-gradient-primary';
  }

  doLogin(form: NgForm) {

    if (form.valid) {
        // 假設登入驗證成功，寫入 Token 到 localStorage 中
        localStorage.setItem('token', '123');
        var url = this.route.snapshot.queryParamMap.get('returnUrl');
        if (!!url) {
          this.router.navigateByUrl(url);
        } else {
          this.router.navigateByUrl('/');
        }
    }

    if (form.invalid) {
      let errMsg = '';
      for (const fieldName of Object.keys(form.controls)) {
        let ctrl = form.controls[fieldName] as FormControl;
        if (ctrl.invalid) {
          let fieldValue = ctrl.value;
          errMsg += `欄位 ${fieldName} 發生錯誤: ${fieldValue}\r\n`;
        }
      }
      alert('表單驗證失敗，請正確填寫後再送出一次！\r\n' + errMsg);
    }

  }

  ngOnDestroy(): void {
    this.document.body.className = this.origBodyClassName;
  }
}
