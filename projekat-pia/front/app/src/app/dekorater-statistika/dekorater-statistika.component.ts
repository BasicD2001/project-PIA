import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Dekorater from '../models/dekorater';

@Component({
  selector: 'app-dekorater-statistika',
  templateUrl: './dekorater-statistika.component.html',
  styleUrls: ['./dekorater-statistika.component.css']
})
export class DekoraterStatistikaComponent implements OnInit {
  public jobsPerMonth: number[] = [10, 15, 5, 20, 12, 18, 9, 15, 10, 8, 14, 16];
  public dekorateriData: { dekorater: string; poslovi: number }[] = [
    { dekorater: 'Dejan', poslovi: 25 },
    { dekorater: 'Maja', poslovi: 30 },
    { dekorater: 'Marko', poslovi: 15 },
    { dekorater: 'Ana', poslovi: 20 }
  ];
  public averageJobsPerDay: number[] = [5, 8, 10, 7, 6, 4, 3]; 

  constructor(private servis: UserService, private ruter: Router) { }

  dekorater: Dekorater = new Dekorater()

  ngOnInit(): void {

    let naziv = localStorage.getItem('ulogovan')
    naziv = naziv == null ? '' : naziv
    this.servis.getDekorater(naziv).subscribe(
      d => {
        this.dekorater = d
        if (naziv) {
          this.servis.brojPoslovaPoMesecima(naziv).subscribe(
            b => {
              this.jobsPerMonth = b
              this.servis.posloviMedjuDekoratorima(this.dekorater.firma).subscribe(
                p => {
                  this.dekorateriData = p
                  this.servis.prosecnoPoDanima(this.dekorater.firma).subscribe(
                    n => {
                      let prosecniBrojevi = n.map(broj => broj / 3);
                      this.averageJobsPerDay = prosecniBrojevi
                      Chart.register(...registerables);
                      this.createBarChart();
                      this.createPieChart();
                      this.createHistogram();
                    }
                  )
                }
              )
            }
          )
        }

      }
    )


  }

  createBarChart() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ],
          datasets: [{
            label: 'Broj poslova',
            data: this.jobsPerMonth,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Failed to get canvas context.');
    }
  }

  createPieChart() {
    const canvas = document.getElementById('myPieChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.dekorateriData.map(item => item.dekorater),
          datasets: [{
            label: 'Raspodela poslova',
            data: this.dekorateriData.map(item => item.poslovi),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true
        }
      });
    } else {
      console.error('Failed to get pie chart context.');
    }
  }

  createHistogram() {
    const canvas = document.getElementById('myHistogram') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['PON', 'UTO', 'SRE', 'ČET', 'PET', 'SUB', 'NED'],
          datasets: [{
            label: 'Prosečan broj poslova po danu',
            data: this.averageJobsPerDay,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Failed to get histogram context.');
    }
  }
}
