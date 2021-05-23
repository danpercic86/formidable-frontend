import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SectionComponent } from './section/section.component';
import { FormBuilderModule } from './form-builder';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GlobalSharedModule } from '@formidable/shared';
import { CoreModule } from '@formidable/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { autoAuthenticate } from './auth/utils/functions';
import { LoggerModule, NGXLogger, NgxLoggerLevel } from 'ngx-logger';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth/services/auth.service';

@NgModule({
  declarations: [AppComponent, SectionComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'formidableServer' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GlobalSharedModule,
    CoreModule,
    FormBuilderModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    LoggerModule.forRoot({ level: NgxLoggerLevel.DEBUG, enableSourceMaps: true }),
    MatButtonModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: autoAuthenticate,
      deps: [AuthService, NGXLogger],
      multi: true
    }
  ]
})
export class AppModule
{
}
