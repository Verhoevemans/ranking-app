import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAddPlayersComponent } from './view-add-players.component';

describe('ViewAddPlayersComponent', () => {
  let component: ViewAddPlayersComponent;
  let fixture: ComponentFixture<ViewAddPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAddPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAddPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
