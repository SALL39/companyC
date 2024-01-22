import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkImportUserComponent } from './bulk-import-user.component';

describe('BulkImportUserComponent', () => {
  let component: BulkImportUserComponent;
  let fixture: ComponentFixture<BulkImportUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkImportUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkImportUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
