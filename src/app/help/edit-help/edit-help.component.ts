import { Component, OnInit, ViewChild, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { OnDestroyMixin } from '@w11k/ngx-componentdestroyed';

import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { Help } from '../interfaces/help.interface';
import { HelpService } from '../add-help/add-help.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';


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
        private ngZone: NgZone,
        private toast: ToastrService,
        private route: ActivatedRoute,
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

        this.service.getHelp(this.route.snapshot.params['id']).pipe(take(1)).subscribe(help => {
            this.form.get('description').setValue(help.description)
            this.form.get('relatedHelpFiles').setValue(help.relatedHelpFiles)
            this.form.get('briefDescription').setValue(help.briefDescription)
            this.form.get('keywords').setValue(help.keywords)
            this.form.get('title').setValue(help.title)
            this.form.get('id').setValue(help.id)
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
            id: this.form.get('id').value
        };

        this.service.add(help).pipe(take(1)).subscribe((x) => {
            this.toast.success(x.toast);
        })

    }
}
