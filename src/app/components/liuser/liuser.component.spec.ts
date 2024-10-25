import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiuserComponent } from './liuser.component';

describe('LiuserComponent', () => {
  let component: LiuserComponent;
  let fixture: ComponentFixture<LiuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
