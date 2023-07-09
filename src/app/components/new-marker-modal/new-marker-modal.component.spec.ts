import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMarkerModalComponent } from './new-marker-modal.component';

describe('NewMarkerModalComponent', () => {
  let component: NewMarkerModalComponent;
  let fixture: ComponentFixture<NewMarkerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMarkerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMarkerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
