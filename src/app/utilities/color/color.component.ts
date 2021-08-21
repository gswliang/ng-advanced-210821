import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  type: number = 0;
  name: string = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // this.type = this.route.snapshot.params['type'];

    this.type = parseInt(this.route.snapshot.paramMap.get('type'));

    // this.route.params.subscribe(params => {
    //   this.type = params['type'];
    // });

    // this.route.paramMap.subscribe(params => {
    //   this.type = +params.get('type');
    // });

    this.route.queryParamMap.subscribe(params => {
      this.name = params.get('name');
    });
  }

}
