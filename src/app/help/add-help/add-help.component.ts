import { Component, OnInit, ViewChild, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';

import { componentDestroyed, OnDestroyMixin } from '@w11k/ngx-componentdestroyed';
import { HelpService } from './add-help.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { Help } from '../interfaces/help.interface';
import { ToastrService } from 'ngx-toastr';


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
        private toast: ToastrService,
        private service: HelpService) { super(); }
    @ViewChild('autosize')
    autosize: CdkTextareaAutosize;

    ngOnInit() {

        this.form = this.formBuilder.group({
            id: [''],
            title: ['', Validators.required],
            keywords: ['', Validators.required],
            briefDescription: ['', Validators.required],
            description: ['', Validators.required],
            relatedHelpFiles: [''],

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
            description: this.form.get('description').value,
            relatedHelpFiles: this.form.get('relatedHelpFiles').value,
            briefDescription: this.form.get('briefDescription').value,
            keywords: this.form.get('keywords').value,
            title: this.form.get('title').value,
            id: -1
        };

        this.service.add(help).pipe(take(1)).subscribe((x) => {
            this.toast.success(x.toast);
        })

    }
}
