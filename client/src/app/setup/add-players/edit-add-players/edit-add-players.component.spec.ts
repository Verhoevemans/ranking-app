import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddPlayersComponent } from './edit-add-players.component';

describe('EditAddPlayersComponent', () => {
  let component: EditAddPlayersComponent;
  let fixture: ComponentFixture<EditAddPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
