import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Option } from '../shared/interfaces/option.interface';
import { Item } from '../items/interfaces/item.interface';
import { Shared } from '../shared/shared';
import { Mob } from '../mobs/interfaces/mob.interface';
import { CraftingMaterials, ICraftingRecipes } from './crafting-recipes.interface';
import { KillQuest, IQuest } from '../quests/quest.interface';
import { CraftingRecipesService } from './crafting-recipes.service';

@Component({
    templateUrl: './crafting-recipes.component.html',
    styleUrls: ['./crafting-recipes.component.scss']
})
export class CraftingRecipesComponent implements OnInit {

    public form: FormGroup;
    public materials: FormArray
    public item: Item = null;
    @ViewChild('autosize') autosize: CdkTextareaAutosize;


    constructor(private service: CraftingRecipesService, private formBuilder: FormBuilder, private toast: ToastrService, private helpers: Shared) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: "",
            description: "",
            createdItem: '',
            createdItemDropsInRoom: '',
            materials: this.formBuilder.array([this.initMaterial()]),
        });


    }

    addItem(item: Item) {
        console.log(item)
        this.item = item;
    }

    removeItem() {

        this.item = null;
    }

    addMaterial() {
        this.materials = this.form.get('materials') as FormArray;
        this.materials.push(this.initMaterial())
    }

    get getMaterialControl(): FormArray {
        return this.form.get('materials')['controls'];
    }

    removeMaterial(i: number) {
        this.materials.removeAt(i);
    }

    initMaterial() {
        return this.formBuilder.group({
            material: '',
            quantity: '1',
            presentInRoom: false
        });
    }


    getMaterials(): CraftingMaterials[] {
        let materials = [];

        (this.form.get('materials') as FormArray)['controls'].forEach(x => {
            materials.push(
                {
                    material: x.get('material').value,
                    quantity: x.get('quantity').value
                }
            )
        })

        return materials;
    }



    addCraftingRecipes() {


        var obj: ICraftingRecipes = {
            title: this.form.get('title').value,
            id: -1,
            description: this.form.get('description').value,
            createdItemDropsInRoom: this.form.get('description').value,
            craftingMaterials: this.getMaterials(),
            createdItem: this.item,
        }

        this.service.AddCraftingRecipe(obj).pipe(take(1)).subscribe(response => {
            this.toast.success(`Crafting recipe added successfully.`);
        },
            err => console.log(err));



    }


}
