import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthorisedComponent } from './un-authorised.component';

describe('UnAuthorisedComponent', () => {
  let component: UnAuthorisedComponent;
  let fixture: ComponentFixture<UnAuthorisedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnAuthorisedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnAuthorisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
