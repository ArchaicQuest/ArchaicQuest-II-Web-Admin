import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { IQuest } from './quest.interface';
import { QuestService } from './quest.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Option } from '../shared/interfaces/option.interface';
import { Item } from '../items/interfaces/item.interface';
import { Shared } from '../shared/shared';

@Component({
    templateUrl: './quest.component.html',
    styleUrls: ['./quest.component.scss']
})
export class QuestComponent implements OnInit {

    public questForm: FormGroup;
    public areaList: string[];
    public questTypes: Option[];
    public items: Item[] = [];
    @ViewChild('autosize') autosize: CdkTextareaAutosize;


    constructor(private service: QuestService, private formBuilder: FormBuilder, private toast: ToastrService, private helpers: Shared) {
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
            itemGain: ""
        });

        this.service.getAreaName().pipe(take(1)).subscribe(data => {
            this.areaList = data;
        })

        this.questTypes = this.service.questTypes();


    }

    addItem(item: Item) {
        console.log(item)
        this.items.push(item);

    }

    removeItem(index: number) {
        var areaToDelete = (this.helpers.removeItem(this.items, index) as Item[]);
        this.items = [...this.items];

        this.service.delete(areaToDelete[0].id);
    }


}
