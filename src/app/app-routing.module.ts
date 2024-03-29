import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',

        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
    },
    {
        path: '',
        loadChildren: () => import('./items/item.module').then(m => m.ItemModule)
    },
    {
        path: '',
        loadChildren: () => import('./mobs/mob.module').then(m => m.MobModule)
    },
    {
        path: 'player',
        loadChildren: () => import('./players/player.module').then(m => m.PlayersModule)
    },
    {
        path: 'world',
        loadChildren: () => import('./World/world.module').then(m => m.WorldModule)
    },
    {
        path: 'skills-spells',
        loadChildren: () => import('./skills-spells/skills-spells.module').then(m => m.SkillsSpellsModule)
    },
    {
        path: 'class',
        loadChildren: () => import('./class/class.module').then(m => m.ClassModule)
    },
    {
        path: 'socials',
        loadChildren: () => import('./socials/socials.module').then(m => m.SocialsModule)
    },
    {
        path: 'quests',
        loadChildren: () => import('./quests/quest.module').then(m => m.QuestModule)
    },
    {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.LoginModule)
    },
    {
        path: 'help',
        loadChildren: () => import('./help/help.module').then(m => m.HelpModule)
    },
    {
        path: 'crafting-recipes',
        loadChildren: () => import('./crafting-recipes/crafting-recipes.module').then(m => m.CraftingRecipesModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
