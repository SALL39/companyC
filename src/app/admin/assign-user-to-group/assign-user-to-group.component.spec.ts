import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignUserToGroupComponent } from './assign-user-to-group.component';

describe('AssignUserToGroupComponent', () => {
  let component: AssignUserToGroupComponent;
  let fixture: ComponentFixture<AssignUserToGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignUserToGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignUserToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
