import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { chartAreaDemo } from '../chartAreaDemo';
import { chartPieDemo } from '../chartPieDemo';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    chartAreaDemo();
    chartPieDemo();
  }

  gotoColor(type:number, query:string){
    this.router.navigate([`utilities/color/${type}`],{
      queryParams:{
        name: query
      }
    })
  }

  gotoColorURL(type:number, query:string){
    this.router.navigateByUrl(`/utilities/color/${type}?name=${query}`);
  }

}
