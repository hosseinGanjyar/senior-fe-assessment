import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAssignedComponent } from './un-assigned.component';

describe('UnAssignedComponent', () => {
  let component: UnAssignedComponent;
  let fixture: ComponentFixture<UnAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnAssignedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
