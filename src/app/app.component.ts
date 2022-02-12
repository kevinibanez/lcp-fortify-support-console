import { Component} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lcp.Fortify.SupportConsole';
  imgloaded = false;
  Opened = false;
  jsonCheck = true;
  jsonResult: any;

  currentYearLong(): number {
    return new Date().getFullYear();
  }
  
  constructor(
    private router: Router
  ) {
    this.title = 'Lcp.Fortify.SupportConsole';
  }
}

  // ---------------------------------------------------------------------------
  // -----------------------   UX Experience   ---------------------------------
  // ---------------------------------------------------------------------------



