import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskflowChartComponent } from './taskflow-chart.component';

describe('TaskflowChartComponent', () => {
  let component: TaskflowChartComponent;
  let fixture: ComponentFixture<TaskflowChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskflowChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskflowChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
