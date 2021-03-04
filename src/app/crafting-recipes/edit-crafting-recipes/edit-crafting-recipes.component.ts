import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Item } from 'src/app/items/interfaces/item.interface';
import { Shared } from 'src/app/shared/shared';
import { CraftingMaterials, ICraftingRecipes } from '../crafting-recipes.interface';
import { CraftingRecipesService } from '../crafting-recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './edit-crafting-recipes.component.html',
    styleUrls: ['./edit-crafting-recipes.component.scss']
})
export class EditCraftingRecipesComponent implements OnInit {

    public form: FormGroup;
    public materials: FormArray
    public item: Item = null;
    @ViewChild('autosize') autosize: CdkTextareaAutosize;


    constructor(private service: CraftingRecipesService, private formBuilder: FormBuilder, private toast: ToastrService, private helpers: Shared, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: "",
            description: "",
            createdItem: '',
            materials: this.formBuilder.array([]),
        });

        setTimeout(() => {
            this.service.LoadCraftingRecipe(this.route.snapshot.params['id'])
                .pipe(take(1))
                .subscribe(q => {
                    this.form.get('title').setValue(q.title);
                    this.form.get('description').setValue(q.description);
                    this.form.get('createdItem').setValue(q.createdItem);

                    console.log("i", q.createdItem)
                    this.addItem(q.createdItem);

                    if (q.craftingMaterials.length) {
                        // this is a hack to remove the first object section as
                        // it's added by this.roomServices.addRoomForm;
                        // so what happens is you have a blank object
                        // followed by the other objects with data
                        // so just removed the first instance, quickest solution
                        // this.getMaterialControl.removeAt(0);
                        for (let index = 0; index < q.craftingMaterials.length; index++) {
                            if (q.craftingMaterials[index] != null) {
                                this.addMaterial(q.craftingMaterials[index]);
                            }

                        }

                    }

                });

        });



    }



    addItem(item: Item) {
        console.log(item)
        this.item = item;
    }

    removeItem() {

        this.item = null;
    }

    addMaterial(data: CraftingMaterials) {
        this.materials = this.form.get('materials') as FormArray;
        this.materials.push(this.initMaterial(data))
    }

    get getMaterialControl(): FormArray {
        return this.form.get('materials')['controls'];
    }

    removeMaterial(i: number) {
        this.materials.removeAt(i);
    }

    initMaterial(data: CraftingMaterials) {

        if (data == null) {
            return this.formBuilder.group({
                material: '',
                quantity: '1'
            });
        }
        return this.formBuilder.group({
            material: data.material,
            quantity: data.quantity
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
            id: this.route.snapshot.params['id'],
            description: this.form.get('description').value,
            craftingMaterials: this.getMaterials(),
            createdItem: this.item,
        }

        this.service.AddCraftingRecipe(obj).pipe(take(1)).subscribe(response => {
            this.toast.success(`Crafting recipe updated successfully.`);
        },
            err => console.log(err));



    }


}

