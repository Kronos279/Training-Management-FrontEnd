import { Component } from '@angular/core';
import { EmployeeServiceService } from '../../employee-service.service';
import { Employee } from '../../types/Employee';
import Chart, { ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [],
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss'
})
export class DoughnutChartComponent {

  mentees: Employee[] = [];
  chart: any;

  constructor(private employeeService: EmployeeServiceService) {

  }

  data: any;
  MapData: any = new Map();
  Chartlables: string[] = [];
  Chartdata: number[] = [];

  ngOnInit() {
    this.employeeService.getCourseCompletionPercentage("BULT-01").subscribe(res => {
      this.data = res
      console.log(res);
      this.MapData = this.jsonToMap(res);
      this.setdata();
      this.createChart();
    });
  }


  ngAfterViewInit() {
    if (this.data) {
      this.createChart();
    }
  }

  jsonToMap(json: any): Map<string, any> {
    return new Map(Object.entries(json));
  }


  setdata(){
    this.MapData.forEach((value:number, key:string) => {
      console.log(`${key}: ${value}`);
      this.Chartlables.push(key);
      this.Chartdata.push(value);
  });
  }

  createChart(): void {
    const data = {
      labels: this.Chartlables,
      datasets: [{
        label: '% completed',
        data: this.Chartdata,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };

    const config :ChartConfiguration<'bar'> = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    };

    const myChart = new Chart(
      document.getElementById('myChart') as HTMLCanvasElement,
      config
    );
  }

}
