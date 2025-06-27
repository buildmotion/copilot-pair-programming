import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { accountUiRoutes } from './lib.routes';
import { CreateAccountComponent } from './create-account.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(accountUiRoutes)],
  declarations: [CreateAccountComponent],
  exports: [CreateAccountComponent],
})
export class AccountUiModule {}
