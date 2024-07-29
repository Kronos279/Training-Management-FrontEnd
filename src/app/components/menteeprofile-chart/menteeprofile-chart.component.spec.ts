import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeprofileChartComponent } from './menteeprofile-chart.component';

describe('MenteeprofileChartComponent', () => {
  let component: MenteeprofileChartComponent;
  let fixture: ComponentFixture<MenteeprofileChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenteeprofileChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenteeprofileChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
