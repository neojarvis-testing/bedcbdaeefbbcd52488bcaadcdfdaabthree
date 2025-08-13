import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conference-event-bookings-pie-chart',
  templateUrl: './conference-event-bookings-pie-chart.component.html',
  styleUrls: ['./conference-event-bookings-pie-chart.component.css']
})
export class ConferenceEventBookingsPieChartComponent implements OnInit {

  bookings: any[] = [];
  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef<HTMLCanvasElement>;

  constructor() { }

  ngOnInit() {
    // Retrieve stored bookings data
    const storedData = localStorage.getItem('bookingsData');
    this.bookings = storedData ? JSON.parse(storedData) : [];

    if (this.bookings.length === 0) {
      console.log('No data received');
      return;
    }
    this.drawPieChart();
  }

  drawPieChart() {
    if (!this.bookings || this.bookings.length === 0) {
      console.log("No bookings found for chart");
      return;
    }

    const eventCounts: { [key: string]: number } = {};
    this.bookings.forEach(booking => {
      eventCounts[booking.ConferenceEvent.EventName] = (eventCounts[booking.ConferenceEvent.EventName] || 0) + 1;
    });

    const data = Object.values(eventCounts);
    const labels = Object.keys(eventCounts);
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD', '#1ABC9C'];

    const canvas = this.pieCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const total = data.reduce((acc, value) => acc + value, 0);
    let startAngle = 0;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    data.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      startAngle += sliceAngle;
    });

    // Draw labels
    ctx.fillStyle = '#000';
    ctx.font = '14px Arial';
    const labelStartX = centerX + radius + 40;
    let labelY = centerY - (labels.length * 14);

    labels.forEach((label, index) => {
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(labelStartX, labelY, 15, 15);
      ctx.fillStyle = '#000';
      ctx.fillText(`${label}: ${data[index]}`, labelStartX + 25, labelY + 12);
      labelY += 30;
    });
  }

}
