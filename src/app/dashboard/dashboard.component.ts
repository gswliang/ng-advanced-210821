import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlTree } from '@angular/router';
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

  gotoUtilitiesColor1(type: number, name: string) {
    this.router.navigate(['/utilities/color/', type], {
      fragment: 'CustomFontSizeUtilities',
      queryParams: {
        name: name
      }
    });
  }

  gotoUtilitiesColor2(type: number, name: string) {
    this.router.navigateByUrl(`/utilities/color/${type}?name=${name}`);

    // var tree: UrlTree = this.router.parseUrl(`/utilities/color/${type}?name=${name}`);
    // this.router.navigateByUrl(tree);
  }

}
