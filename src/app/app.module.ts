import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalSharedModule } from '@shared/global-shared.module';
import { CoreModule } from '@core/core.module';
import { SectionComponent } from './section/section.component';
import { FormBuilderModule } from './form-builder/form-builder.module';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [AppComponent, SectionComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'formidableServer' }),
        AppRoutingModule,
        GlobalSharedModule,
        CoreModule,
        FormBuilderModule,
        MatCardModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatProgressSpinnerModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
