import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { SectionComponent } from './section/section.component';
import { FormBuilderModule } from './form-builder/form-builder.module';

@NgModule({
    declarations: [AppComponent, SectionComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'formidableServer' }),
        AppRoutingModule,
        SharedModule,
        CoreModule,
        FormBuilderModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
