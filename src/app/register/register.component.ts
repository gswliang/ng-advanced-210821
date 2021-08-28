import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  origBodyClassName: string;

  data: any = {
    email: '',
    mima: '1231123123',
    isRememberMe: true
  };

  form: FormGroup;

  constructor(@Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.origBodyClassName = this.document.body.className;
    this.document.body.className = 'bg-gradient-primary';

    this.form = this.fb.group({
      email: this.fb.control('', {
        updateOn: 'change',
        validators: [
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      }),
      mima: this.fb.control('1231123123', {
        updateOn: 'change',
        validators: [
          Validators.required,
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,32}$/),
          Validators.minLength(6),
          Validators.maxLength(32)
        ]
      }),
      isRememberMe: true
    });

  }

  f(name: string) {
    return this.form.get(name) as FormControl;
  }

  doLogin(ngForm: FormGroupDirective) {

    if (this.form.valid) {
        // 假設登入驗證成功，寫入 Token 到 localStorage 中
        localStorage.setItem('token', '123');
        var url = this.route.snapshot.queryParamMap.get('returnUrl');
        if (!!url) {
          this.router.navigateByUrl(url);
        } else {
          this.router.navigateByUrl('/');
        }
    }

    if (this.form.invalid) {
      let errMsg = '';
      for (const fieldName of Object.keys(this.form.controls)) {
        let ctrl = this.form.controls[fieldName] as FormControl;
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
