import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  public message: string;
  public statusCode: string;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params)=>{
      this.message = params.get("message") || "Page not found";
      this.statusCode = params.get("statusCode");
    })
  }

  ngOnInit(): void {
  }

}
