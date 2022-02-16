import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GetRecoveryToken } from './components/support/RecoveryCode/get-recovery-code.component';
import { FilterUserManager } from './components/support/UserManager/user-manager-component';

const routes: Routes = [
  { path: 'UserManager', component: FilterUserManager },
  { path: 'RecoveryCode', component: GetRecoveryToken },
  { path: '**', component: FilterUserManager}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
