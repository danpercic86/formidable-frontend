import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormBuilderModule } from '@builder/core';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { GlobalSharedModule } from '@formidable/shared';
import { CoreModule } from '@formidable/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { autoAuthenticate } from './auth/utils/functions';
import { LoggerModule, NGXLogger, NgxLoggerLevel } from 'ngx-logger';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth/services/auth.service';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { defaultDataServiceConfig, entityConfig } from './entity-metadata';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent],
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
    LoggerModule.forRoot({ level: NgxLoggerLevel.DEBUG }),
    MatButtonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig)
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
    },
    {
      provide: DefaultDataServiceConfig,
      useValue: defaultDataServiceConfig
    }
  ]
})
export class AppModule
{
}
