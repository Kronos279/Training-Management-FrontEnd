import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcoursesDialogComponent } from './subcourses-dialog.component';

describe('SubcoursesDialogComponent', () => {
  let component: SubcoursesDialogComponent;
  let fixture: ComponentFixture<SubcoursesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcoursesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubcoursesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
