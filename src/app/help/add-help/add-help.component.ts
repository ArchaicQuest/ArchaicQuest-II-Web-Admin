import { Component, OnInit, ViewChild, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';

import { componentDestroyed, OnDestroyMixin } from '@w11k/ngx-componentdestroyed';
import { HelpService } from './add-help.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { Help } from '../interfaces/help.interface';


@Component({
    templateUrl: './add-help.component.html',
    styleUrls: ['./add-help.component.scss'],
})
export class AddHelpComponent extends OnDestroyMixin implements OnDestroy, OnInit {
    componentActive = true;
    form: FormGroup;


    constructor(
        private changeDetector: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private ngZone: NgZone,
        private service: HelpService) { super(); }
    @ViewChild('autosize')
    autosize: CdkTextareaAutosize;

    ngOnInit() {

        this.form = this.formBuilder.group({
            id: [''],
            title: ['', Validators.required],
            keywords: ['', Validators.required],
            briefDescription: ['', Validators.required],
            Description: ['', Validators.required],
            RelatedHelpFiles: ['', Validators.required],
            DateCreated: ['', Validators.required],
            DateUpdated: ['', Validators.required],
        });
    }



    ngOnDestroy(): void {
        this.componentActive = false;
        this.changeDetector.detach();
        this.form = null;
    }

    triggerResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this.ngZone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }


    addHelp() {

        const help: Help = {
            Description: '',
            RelatedHelpFiles: '',
            briefDescription: '',
            keywords: '',
            title: '',
        };

    }
}
