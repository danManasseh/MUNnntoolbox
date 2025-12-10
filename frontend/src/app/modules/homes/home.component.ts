import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStoreService } from 'src/app/api-services/auths/auth.store.service';
/**
 * Home Component to show basic test and api service call
 */
@Component({
  selector: 'nn-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  selectedTab = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authStoreSErvice: AuthStoreService) { }

  ngOnInit(): void {
    const tab = this.route.snapshot.queryParamMap.get('tab');
    if (tab == "architecture") {
      this.selectedTab = 1;
    }
  }

  logout() {
    this.authStoreSErvice.invalidateSession();
    this.router.navigate(['/auths/login']);
  }
}
