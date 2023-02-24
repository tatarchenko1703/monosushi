import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousesComponent } from './souses.component';

describe('SousesComponent', () => {
  let component: SousesComponent;
  let fixture: ComponentFixture<SousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SousesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
