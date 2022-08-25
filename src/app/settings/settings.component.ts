import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Settings } from './settings.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    public settingsForm: FormGroup;

    constructor(private service: SettingsService, private formBuilder: FormBuilder, private toast: ToastrService) {
    }

    ngOnInit() {
        this.settingsForm = this.formBuilder.group({
            doubleXp: [],
            doubleGains: [],
            doubleQp: [],
            pk: [],
            pt: [],
            startingRoom: [],
            recallRoom: [],
            postToDiscord: [],
            channelDiscordWebHookURL: [''],
            eventsDiscordWebHookURL: [''],
            errorDiscordWebHookURL: [''],
            postMarkKey: ['']
        });


        this.service.getSettings().pipe(take(1)).subscribe((val: Settings) => {
            this.settingsForm.get('doubleXp').setValue(val.doubleXp);
            this.settingsForm.get('doubleGains').setValue(val.doubleGains);
            this.settingsForm.get('doubleQp').setValue(val.doubleQuestPoints);
            this.settingsForm.get('pk').setValue(val.pkAllowed);
            this.settingsForm.get('pt').setValue(val.playerThievingAllowed);
            this.settingsForm.get('startingRoom').setValue(val.startingRoom);
            this.settingsForm.get('recallRoom').setValue(val.defaultRecallRoom);
            this.settingsForm.get('postToDiscord').setValue(val.postToDiscord);
            this.settingsForm.get('channelDiscordWebHookURL').setValue(val.channelDiscordWebHookURL);
            this.settingsForm.get('eventsDiscordWebHookURL').setValue(val.eventsDiscordWebHookURL);
            this.settingsForm.get('errorDiscordWebHookURL').setValue(val.errorDiscordWebHookURL);
            this.settingsForm.get('postMarkKey').setValue(val.postMarkKey);

        });

    }

    updateSettings() {
        const settings: Settings = {
            id: 1,
            doubleXp: this.settingsForm.get('doubleXp').value,
            doubleGains: this.settingsForm.get('doubleGains').value,
            doubleQuestPoints: this.settingsForm.get('doubleQp').value,
            pkAllowed: this.settingsForm.get('pk').value,
            playerThievingAllowed: this.settingsForm.get('pt').value,
            startingRoom: this.settingsForm.get('startingRoom').value,
            defaultRecallRoom: this.settingsForm.get('recallRoom').value,
            maxIdleTime: 300000,
            maxNpcCorpseTime: 5,
            maxPcCorpseTime: 10,
            minLevelCanShout: 3,
            playerTick: 500,
            updateTick: 1000,
            postToDiscord: this.settingsForm.get('postToDiscord').value,
            channelDiscordWebHookURL: this.settingsForm.get('channelDiscordWebHookURL').value,
            eventsDiscordWebHookURL: this.settingsForm.get('eventsDiscordWebHookURL').value,
            errorDiscordWebHookURL: this.settingsForm.get('errorDiscordWebHookURL').value,
            postMarkKey:this.settingsForm.get('postMarkKey').value,
        };

        this.service.updateSettings(settings).pipe(take(1)).subscribe(response => {
            this.toast.success(`Settings Updated Successfully.`);
        },
            err => console.log(err));

    }


}
