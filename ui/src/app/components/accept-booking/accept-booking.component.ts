import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CarService } from 'src/app/services/car.service';
import { UserService } from '../../services/user.service';
import { Booking } from '../../models/booking.model';
import { DriverBookingModel} from '../../models/booking.model';

import { DriverCarModel } from '../../models/car.model';

@Component({
  selector: 'app-accept-booking',
  templateUrl: './accept-booking.component.html',
  styleUrls: ['./accept-booking.component.scss']
})
export class AcceptBookingComponent implements OnInit {
  displayedColumns: string[];
  dataSource;
  userType: string;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  pageSize = 10;
  constructor(private userService: UserService, private router: Router, private carService: CarService) { 
    if (this.userService.isLoggedIn) {
      this.userType = this.userService.userType;
      this.carService.getAllBookings().subscribe(data => {
          const bookings: Booking[] = data;
          console.log(data);
          this.displayedColumns = ['bookingId', 'carId', 'customerId', 'dealerId','source', 'destination','startDate', 'endDate','action'];
          this.dataSource = new MatTableDataSource(bookings);

          setTimeout(() => {
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
          });
      });
  } else {
      this.router.navigateByUrl('/');
  }

  }

  acceptnow(row: DriverCarModel){

    const bookingData = new DriverBookingModel();
    bookingData.bookingId = 0;
    bookingData.driverId=this.userService.userName;
    bookingData.carId = row.carId;
    bookingData.customerId = row.customerId;
    bookingData.source=row.source;
    bookingData.destination=row.destination;
    bookingData.dealerId=row.dealerId;
    bookingData.startDate=row.startDate;
    bookingData.endDate=row.endDate;

    console.log('Booking: ' + JSON.stringify(row));
    console.log(bookingData);

    this.carService.acceptbooking(bookingData).subscribe((res) => {
      console.log('booknow resp: ' + JSON.stringify(res));
      /*
      this.carService.getAllCars().subscribe(resp => {
        console.log('latest resp after update: ' + JSON.stringify(resp));
        const cars: Car[] = resp;
        this.dataSource.data = cars;
      });
      */
      this.router.navigateByUrl('/booking');
    });
    
  }

  ngOnInit() {
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
