import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeDialogboxComponent } from './mentee-dialogbox.component';

describe('MenteeDialogboxComponent', () => {
  let component: MenteeDialogboxComponent;
  let fixture: ComponentFixture<MenteeDialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenteeDialogboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenteeDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
