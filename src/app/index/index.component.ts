import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  return = '';
  password = '';
  email = '';

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // Get the query params
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/events');
  }

  login() {
    if (this.email && this.password) {
      const data = {
        email: this.email,
        password: this.password
      };
      this.api.login(data).subscribe(user => {
        this.api.setUser(user);
      });
      this.router.navigateByUrl(this.return);
    }
  }

  register() {
    if (this.email && this.password) {
      const data = {
        email: this.email,
        password: this.password
      };
      this.api.register(data).subscribe(user => {
        this.api.setUser(user);
      });
      this.router.navigateByUrl(this.return);
    }
  }

}
