import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionComponent } from './section/section.component';

const routes: Routes = [
    {
        path: 'sections/:id',
        component: SectionComponent,
    },
    {
        path: '',
        loadChildren: () => import('./landing-page/landing-page.module').then((m) => m.LandingPageModule),
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            initialNavigation: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
