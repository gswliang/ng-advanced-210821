import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  origBodyClassName: string;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.origBodyClassName = this.document.body.className;
    this.document.body.className = 'bg-gradient-primary';
  }

  ngOnDestroy(): void {
    this.document.body.className = this.origBodyClassName;
  }
}
