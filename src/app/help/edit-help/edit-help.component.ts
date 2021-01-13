import { Component, OnInit, ViewChild, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { OnDestroyMixin } from '@w11k/ngx-componentdestroyed';

import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { Help } from '../interfaces/help.interface';
import { HelpService } from '../add-help/add-help.service';


@Component({
    templateUrl: './edit-help.component.html',
    styleUrls: ['./edit-help.component.scss'],
})
export class EditHelpComponent extends OnDestroyMixin implements OnDestroy, OnInit {
    componentActive = true;
    form: FormGroup;


    constructor(
        private changeDetector: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private ngZone: NgZone) { super(); }
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


    }
}
