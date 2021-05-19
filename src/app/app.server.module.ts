import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { TransferHttpCacheModule } from '@nguniversal/common';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    TransferHttpCacheModule,
    ServerTransferStateModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule
{
}
