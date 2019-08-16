import { Component, OnInit } from '@angular/core';
import { TranslateService } from './translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Event Manager';

  constructor(private translateService: TranslateService) { }

  ngOnInit() {

  }

  setLang(lang: string) {
    this.translateService.use(lang);
  }

}
