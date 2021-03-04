import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';
import { Option } from '../shared/interfaces/option.interface';
import { ICraftingRecipes } from './crafting-recipes.interface';

@Injectable({
    providedIn: 'root'
})
export class CraftingRecipesService {

    private host = environment.hostAPI;
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    constructor(private http: HttpClient) { }

    getCraftingRecipe() {
        return this.http.get<ICraftingRecipes[]>(`${this.host}Crafting/GetCrafting`);
    }

    LoadCraftingRecipe(id: number) {
        return this.http.get<ICraftingRecipes>(`${this.host}Crafting/?id=${id}`);
    }


    AddCraftingRecipe(data: ICraftingRecipes) {
        console.log("CraftingRecipe", JSON.stringify(data))
        return this.http.post(`${this.host}Crafting`, JSON.stringify(data), { headers: this.headers });

    }
    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.host}Crafting/delete/${id}`);
    }

}

