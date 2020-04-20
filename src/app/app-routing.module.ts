import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
        path: '',
        loadChildren: './items/item.module#ItemModule'
    },
    {
        path: '',
        loadChildren: './mobs/mob.module#MobModule'
    },
    {
        path: 'world',
        loadChildren: './World/world.module#WorldModule'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'top'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
