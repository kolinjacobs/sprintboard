import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemCreateComponent } from './work-item-create.component';

describe('WorkItemCreateComponent', () => {
  let component: WorkItemCreateComponent;
  let fixture: ComponentFixture<WorkItemCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkItemCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkItemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
