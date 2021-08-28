import { Directive, Injectable } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms';
import {
  isGuiNumberValid, // 統一編號
  isNationalIdentificationNumberValid, // 身分證字號
  isResidentCertificateNumberValid, // 居留證編號
  isNewResidentCertificateNumberValid, // 新式居留證編號
  isOriginalResidentCertificateNumberValid, // 舊式居留證編號
  isCitizenDigitalCertificateNumberValid, // 自然人憑證
  isEInvoiceCellPhoneBarcodeValid, // 手機條碼
  isEInvoiceDonateCodeValid // 捐贈碼
} from 'taiwan-id-validator';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ssid][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: TaiwanSsidDirective, multi: true }
  ]
})
@Injectable({
  providedIn: 'root'
})
export class TaiwanSsidDirective implements Validator {
  validate(control: FormControl): { [key: string]: any } {
    let ctrl = control as FormControl;
    if (isNationalIdentificationNumberValid(ctrl.value)) {
      return null;
    } else {
      return {
        ssid: true
      };
    }
  }
}
