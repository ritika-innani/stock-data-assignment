import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {HttpService} from "../../services/http.service";
const MONTH_NAMES = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html'
})
export class BarChartComponent implements OnInit {
  private data = [
    {"Month": "April_2020", "ClosingPrice": 166443} //adding dummy data initially
  ];
  private svg;
  private margin = 65;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.httpService.get({limit: 0, skip: 0}).subscribe((stockData: any) => {
        if (stockData) {
          this.getBarData(stockData);
        }
        this.createSvg();
        this.drawBars(this.data);
      },
      (err) => {
        console.log("An error occurred while fetching records", err);
      });
  }

  private getBarData(stockData) {
    let barData = {};
    stockData.forEach(item => {
      let date = new Date(item.Date);
      let key = MONTH_NAMES[date.getMonth()] + "_" + date.getFullYear();
      if (barData.hasOwnProperty(key)) {
        barData[key].count++;
        barData[key].value = Number((barData[key].value + item.Close).toFixed(2))
      } else {
        barData[key] = {
          count: 1,
          value: item.Close
        }
      }
    });
    this.createBarData(barData);
  }

  private createBarData(barData) {
    let keys = Object.keys(barData);
    this.data = [];
    for (let index = 0; index < keys.length; index++) {
      this.data.push({"Month": keys[index], "ClosingPrice": barData[keys[index]].value / barData[keys[index]].count})
    }
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.Month))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([8000, 14000])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d.Month))
      .attr("y", d => y(d.ClosingPrice))
      .attr("width", x.bandwidth())
      .attr("height", (d) => this.height - y(d.ClosingPrice))
      .attr("fill", "#687897");
  }

}
