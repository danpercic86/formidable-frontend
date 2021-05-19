import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SectionComponent } from './section/section.component';
import { FormBuilderModule } from './form-builder/form-builder.module';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { GlobalSharedModule } from '@formidable/shared';
import { CoreModule } from '@formidable/core';

@NgModule({
  declarations: [AppComponent, SectionComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'formidableServer' }),
    BrowserTransferStateModule,
    TransferHttpCacheModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GlobalSharedModule,
    CoreModule,
    FormBuilderModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule
{
}
