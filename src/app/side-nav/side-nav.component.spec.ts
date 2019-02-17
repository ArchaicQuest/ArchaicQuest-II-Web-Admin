import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';
import { RouterLink } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

describe('SideNavComponent', () => {
    let component: SideNavComponent;
    let fixture: ComponentFixture<SideNavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SideNavComponent],
            imports: [AppRoutingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SideNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
