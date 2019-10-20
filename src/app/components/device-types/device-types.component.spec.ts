import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTypesComponent } from './device-types.component';

describe('DeviceTypesComponent', () => {
  let component: DeviceTypesComponent;
  let fixture: ComponentFixture<DeviceTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
