import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart, { ChartConfiguration } from 'chart.js/auto';
@Component({
  selector: 'app-menteeprofile-chart',
  standalone: true,
  imports: [],
  templateUrl: './menteeprofile-chart.component.html',
  styleUrl: './menteeprofile-chart.component.scss'
})
export class MenteeprofileChartComponent {

  @ViewChild('doughnutChart') private doughnutChartRef!: ElementRef<HTMLCanvasElement>;
  private doughnutChart?: Chart<'doughnut', number[], unknown>;

  ngAfterViewInit(): void {
    this.createDoughnutChart();
  }

  createDoughnutChart(): void {
    const data = {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4
      }]
    };

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: true,
          },
          legend: {
            position: 'top',
          }
        }
      }
    };

    const ctx = this.doughnutChartRef.nativeElement.getContext('2d');
    if (ctx) {
      this.doughnutChart = new Chart<'doughnut', number[], unknown>(ctx, config);
    }
  }

}
