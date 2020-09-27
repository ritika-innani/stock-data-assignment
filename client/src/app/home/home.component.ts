import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../services/http.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {AddRecordComponent} from "../popups/add-record/add-record.component";
import {MatSort} from "@angular/material/sort";
import {BarChartComponent} from "../popups/bar-chart/bar-chart.component";

export interface StockData {
  Date: string;
  Open: number;
  Close: number;
}

const ELEMENT_DATA: StockData[] = [
  {Date: "3-January-2018", Open: 101.4, Close: 1.0079}
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Date', 'Open', 'Close'];
  dataSource = new MatTableDataSource<StockData>(ELEMENT_DATA);
  limit = 30;
  skip = 0;
  currentPage = this.skip / 30 + 1;
  newData: any;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private httpService: HttpService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchData(1);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  openBarDialog() {
    const dialogRef = this.dialog.open(BarChartComponent, {});
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddRecordComponent, {
      width: '300px',
      height: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.newData = result;
        this.newData.Date = new Date().toISOString();
        this.addData(this.newData)
      }
    });
  }

  next() {
    this.skip += this.limit;
    this.currentPage = this.skip / 30 + 1;
    this.fetchData(1);
  }

  previous() {
    if(this.skip > 0) {
      this.skip -= this.limit;
      this.currentPage = this.skip / 30 + 1;
      this.fetchData(1);
    }
  }

  private fetchData(page: number) {
    return this.httpService.get({limit: this.limit, skip: this.skip}).subscribe((data: any) => {
      if (data.length) {
        data.forEach(item => {
          item.Date = new Date(item.Date);
        });
        this.dataSource.data = data;
      } else {
        this.skip -= this.limit;
        this.currentPage = this.skip / 30 + 1;
      }
    },
      (err) => {
      console.log("An error occurred while fetching records", err);
    });
  }

  private addData(request) {
    this.httpService.post(request).subscribe(() => {
      this.skip = 0;
      this.newData = {};
      this.fetchData(1);
    },
    (err) => {
      console.log("An error occurred while adding records", err);
    })
  }

}
