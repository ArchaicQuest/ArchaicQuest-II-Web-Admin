import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemComponent } from './add-item.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { itemRoutes } from '../item.routes';
import { addItemReducer } from '../state/add-item.reducer';
import { StoreModule } from '@ngrx/store';
import { AddItemEffects } from '../state/add-item.effects';
import { EffectsModule } from '@ngrx/effects';
import { MatSelectModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatTableModule, MatButtonModule, MatPaginatorModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemComponent ],
      imports: [
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        EffectsModule.forRoot([]),
        StoreModule.forRoot({}),
        StoreModule.forFeature('item', addItemReducer),
        EffectsModule.forFeature([AddItemEffects]),
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should have as title 'ArchaicQuestII'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ArchaicQuestII');
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

});
