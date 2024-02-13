import { Component, OnInit } from '@angular/core';
import { GetService } from './get.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
lat: any;
lon: any;
  ngOnInit(): void {
   this.getCurrentLocation();

   this.currentTime = new Date();
    this.currentDate = new Date();


  }
  constructor(private matIconRegistry: MatIconRegistry,private service:GetService, private domSanitizer: DomSanitizer,private spinner: NgxSpinnerService){
    this.matIconRegistry.addSvgIcon(
     'humidity',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/humidity.svg')
    ); 
    this.matIconRegistry.addSvgIcon(
      'airp',
       this.domSanitizer.bypassSecurityTrustResourceUrl('assets/airp.svg')
     ); 
     this.matIconRegistry.addSvgIcon(
      'cloud',
       this.domSanitizer.bypassSecurityTrustResourceUrl('assets/cloud.svg')
     ); 
     this.matIconRegistry.addSvgIcon(
      'sunrise',
       this.domSanitizer.bypassSecurityTrustResourceUrl('assets/sunrise.svg')
     ); 
     this.matIconRegistry.addSvgIcon(
      'sunset',
       this.domSanitizer.bypassSecurityTrustResourceUrl('assets/sunset.svg')
     ); 
     this.matIconRegistry.addSvgIcon(
      'pressure',
       this.domSanitizer.bypassSecurityTrustResourceUrl('assets/pressure.svg')
     ); 
     this.matIconRegistry.addSvgIcon(
      'visibility',
       this.domSanitizer.bypassSecurityTrustResourceUrl('assets/visibility.svg')
     );
     this.matIconRegistry.addSvgIcon(
      'min_temp',
       this.domSanitizer.bypassSecurityTrustResourceUrl('assets/min_temp.svg')
     );
     this.matIconRegistry.addSvgIcon(
      'temp',
       this.domSanitizer.bypassSecurityTrustResourceUrl('assets/temp.svg')
     );
  }
  title = 'weather-app';
  currLat: any;
  currLng: any;
  weatherData:any;
  dailyWeather:any;
  currentTime: Date | undefined;
  currentDate: Date | undefined;

  getCurrentLocation() {
    this.spinner.show();
    if (navigator.geolocation) {
   
      console.log(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(position => {


        this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
        this.getWeatherForToday();
      },error=>{
        alert("Allow permission for the location")
      });
    }
    else {
      this.spinner.hide();
      alert("Geolocation is not supported by this browser.");
    }
  }
  getWeatherForToday(){
    this.spinner.show();
    this.service.getWeather(this.currLat,this.currLng).subscribe((response)=>{
      this.spinner.hide();
      this.weatherData = JSON.parse(JSON.stringify(response));
      console.log(JSON.parse(JSON.stringify(response)));
    },error=>{
      this.spinner.hide();
      alert("Error While Fetching API!!" +error.message)
    })
  }
  kelvinToCelsius(kelvin: number): number {
    return kelvin - 273.15;
  }
  getWeatherForTodayManually(lat:any,lon:any){

    this.spinner.show();
    this.service.getWeather(lat,lon).subscribe((response)=>{
      this.spinner.hide();
      this.currLat=lat;
      this.currLng=lon;
      this.weatherData = JSON.parse(JSON.stringify(response));
      console.log(JSON.parse(JSON.stringify(response)));
    },error=>{
      this.spinner.hide();
      alert("Error While Fetching API!!" +error.message)
    })
  }

}
