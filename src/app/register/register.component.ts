import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormGroupDirective, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  origBodyClassName: string;

  data: any[] = [
    {
      email: '1@yam.com',
      mima: '12311aaad2G3123',
    },
    {
      email: '2@yam.com',
      mima: '12311ddd2G3123',
    },
    {
      email: '3@yam.com',
      mima: '123',
    }
  ];

  form: FormGroup;

  constructor(@Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.origBodyClassName = this.document.body.className;
    this.document.body.className = 'bg-gradient-primary';

    this.resetForm(this.data);

  }

  resetForm(data: any[]) {

    this.form = this.fb.group({
      users: this.fb.array([])
    });

    this.data.forEach(() => {
      this.addNewUser();
    });

    this.form.reset({
      users: data
    });
  }

  addNewUser() {
    (this.form.get('users') as FormArray).push(this.createLoginItem());
  }

  createLoginItem() {
    return this.fb.group({
      email: this.fb.control('', {
        updateOn: 'change',
        validators: [
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      }),
      mima: this.fb.control('', {
        updateOn: 'change',
        validators: [
          Validators.required,
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,32}$/),
          Validators.minLength(6),
          Validators.maxLength(32)
        ]
      })
    });
  }

  f(name: string) {
    return this.form.get(name) as FormControl;
  }
  a(name: string) {
    return this.form.get(name) as FormArray;
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
