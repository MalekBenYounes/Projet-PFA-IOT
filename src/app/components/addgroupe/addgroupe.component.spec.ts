import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgroupeComponent } from './addgroupe.component';

describe('AddgroupeComponent', () => {
  let component: AddgroupeComponent;
  let fixture: ComponentFixture<AddgroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddgroupeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddgroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
