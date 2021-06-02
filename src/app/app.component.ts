import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import baseUrl from 'src/app/services/helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'virtualizeFrontend';

  footerVisible: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private router : Router) {
    console.log("baseUrl" + this.router.url);
  }

  ngOnInit(): void {
    // this.href = this.router.url;
    console.log("baseUrl" + this.router.url);
  }
}
