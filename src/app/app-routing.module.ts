import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: './items/item.module#ItemModule'
    },
    {
        path: '',
        loadChildren: './mobs/mob.module#MobModule'
    },
    {
        path: '',
        loadChildren: './World/world.module#WorldModule'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
