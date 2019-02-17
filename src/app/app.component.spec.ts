import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                AppComponent,
                SideNavComponent
            ],
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it(`should have as title 'ArchaicQuestII'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('ArchaicQuestII');
    }));

});
