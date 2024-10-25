import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FogpasswordComponent } from './fogpassword.component';

describe('FogpasswordComponent', () => {
  let component: FogpasswordComponent;
  let fixture: ComponentFixture<FogpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FogpasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FogpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
