import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module#DashboardModule').then(m => m.LazyModule)
    },
    {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module#SettingsModule').then(m => m.LazyModule)
    },
    {
        path: '',
        loadChildren: () => import('./items/item.module#ItemModule').then(m => m.LazyModule)
    },
    {
        path: '',
        loadChildren: () => import('./mobs/mob.module#MobModule').then(m => m.LazyModule)
    },
    {
        path: 'world',
        loadChildren: () => import('./World/world.module#WorldModule').then(m => m.LazyModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
