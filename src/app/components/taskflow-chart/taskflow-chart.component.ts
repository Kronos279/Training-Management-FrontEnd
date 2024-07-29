import { Component } from '@angular/core';
import { Chart, ChartItem } from 'chart.js/auto';


@Component({
  selector: 'app-taskflow-chart',
  standalone: true,
  imports: [],
  templateUrl: './taskflow-chart.component.html',
  styleUrl: './taskflow-chart.component.scss'
})
export class TaskflowChartComponent {

  chart:any;

  constructor() { }

  ngOnInit(): void {
    const ctx = document.getElementById('taskFlowChart') as ChartItem;
    if(!ctx){return}
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'],
        datasets: [{
          label: 'Completed',
          data: [10, 20, 30, 40, 50],
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: '#007bff',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
