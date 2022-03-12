import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { IQuest, KillQuest } from '../quest.interface';
import { QuestService } from '../quest.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Option } from '../../shared/interfaces/option.interface';
import { Item } from '../../items/interfaces/item.interface';
import { Shared } from '../../shared/shared';
import { Mob } from '../../mobs/interfaces/mob.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './edit-quest.component.html',
    styleUrls: ['./edit-quest.component.scss']
})
export class EditQuestComponent implements OnInit {

    public questForm: FormGroup;
    public areaList: string[];
    public questTypes: Option[];
    public items: Item[] = [];
    public mobs: Mob[] = [];
    public mobsToKill: KillQuest[] = [];
    public itemsToFind: KillQuest[] = [];
    @ViewChild('autosize') autosize: CdkTextareaAutosize;


    constructor(private service: QuestService, private formBuilder: FormBuilder, private toast: ToastrService, private helpers: Shared, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.questForm = this.formBuilder.group({
            title: "",
            type: "",
            description: "",
            area: "",
            rewards: "",
            expGain: "",
            goldGain: "",
            itemGain: "",
            mobCount: "",
            mobToKill: "",
            itemToFind: "",
            itemToFindCount: ""
        });

        this.service.getAreaName().pipe(take(1)).subscribe(data => {
            this.areaList = data;
        })

        this.questTypes = this.service.questTypes();
        setTimeout(() => {
            this.service.LoadQuest(this.route.snapshot.params['id'])
                .pipe(take(1))
                .subscribe(q => {
                    this.questForm.get('title').setValue(q.title);
                    this.questForm.get('type').setValue(q.type);
                    this.questForm.get('description').setValue(q.description);
                    this.questForm.get('area').setValue(q.area);
                    this.questForm.get('expGain').setValue(q.expGain);
                    this.questForm.get('goldGain').setValue(q.goldGain);

                    this.items = q.itemGain;
                    this.mobsToKill = q.mobsToKill;
                    this.itemsToFind = q.itemsToGet;
                });

        });

    }

    addQuestItem() {
        var mobKill: KillQuest = {
            name: this.questForm.get('itemToFind').value,
            count: this.questForm.get('itemToFindCount').value
        }

        this.itemsToFind = this.itemsToFind.concat(mobKill);

    }


    addItem(item: Item) {
        // console.log(item)
        this.items.push(item);


    }

    addMob() {

        //   debugger;
        var mobKill: KillQuest = {
            name: this.questForm.get('mobToKill').value,
            count: this.questForm.get('mobCount').value
        }

        this.mobsToKill = this.mobsToKill.concat(mobKill);

    }

    removeQuestItem(index: number) {
        // var areaToDelete = (this.helpers.removeItem(this.items, index) as Item[]);
        // this.items = [...this.items];

        (this.helpers.removeItem(this.itemsToFind, index) as KillQuest[]);
        this.itemsToFind = [...this.itemsToFind];

    }

    removeItem(index: number) {
        var areaToDelete = (this.helpers.removeItem(this.items, index) as Item[]);
        this.items = [...this.items];


    }

    removeMob(index: number) {
        (this.helpers.removeItem(this.mobsToKill, index) as KillQuest[]);
        this.mobsToKill = [...this.mobsToKill];

    }

    addQuest() {


        var questObj: IQuest = {
            title: this.questForm.get('title').value,
            id: this.route.snapshot.params['id'],
            area: this.questForm.get('area').value,
            description: this.questForm.get('description').value,
            type: this.questForm.get('type').value,
            expGain: this.questForm.get('expGain').value,
            goldGain: this.questForm.get('goldGain').value,
            itemGain: this.items,
            mobsToKill: this.mobsToKill,
            itemsToGet: this.itemsToFind

        }

        this.service.AddQuest(questObj).pipe(take(1)).subscribe(response => {
            this.toast.success(`quest added successfully.`);
        },
            err => console.log(err));



    }


}
