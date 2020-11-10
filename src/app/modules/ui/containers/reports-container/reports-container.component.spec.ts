import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportsContainerComponent } from './reports-container.component';

describe('ReportsContainerComponent', () => {
  let component: ReportsContainerComponent;
  let fixture: ComponentFixture<ReportsContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
