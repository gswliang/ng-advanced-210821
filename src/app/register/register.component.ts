import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormGroupDirective, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaiwanSsidDirective } from './taiwan-ssid.directive';
// import {
//   isGuiNumberValid, // 統一編號
//   isNationalIdentificationNumberValid, // 身分證字號
//   isResidentCertificateNumberValid, // 居留證編號
//   isNewResidentCertificateNumberValid, // 新式居留證編號
//   isOriginalResidentCertificateNumberValid, // 舊式居留證編號
//   isCitizenDigitalCertificateNumberValid, // 自然人憑證
//   isEInvoiceCellPhoneBarcodeValid, // 手機條碼
//   isEInvoiceDonateCodeValid // 捐贈碼
// } from 'taiwan-id-validator';

// function ValidateSSID(control: AbstractControl): ValidationErrors {
//   let ctrl = control as FormControl;
//   if (isNationalIdentificationNumberValid(ctrl.value)) {
//     return null;
//   } else {
//     return {
//       ssid: true
//     };
//   }
// }

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  origBodyClassName: string;

  data: any[] = [
    {
      ssid: 'A123456789',
      mima: '12311aaad2G3123',
    },
    {
      ssid: 'A555555555',
      mima: '12311ddd2G3123',
    },
    {
      ssid: 'A987654321',
      mima: '123',
    }
  ];

  form: FormGroup;

  constructor(@Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder,
    private ssid: TaiwanSsidDirective,
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
    this.a('users').push(this.createUser());
  }

  createUser() {
    let group = this.fb.group({
      ssid: this.fb.control('', { updateOn: 'change' }),
      mima: this.fb.control('', { updateOn: 'change' }),
    });

    group.get('ssid').setValidators([
      Validators.required, Validators.minLength(3), Validators.maxLength(100),
      this.ssid.validate
    ]);

    group.get('mima').setValidators([
      Validators.required, Validators.minLength(6), Validators.maxLength(32),
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,32}$/)
    ]);

    return group;
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
