import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  latitude: any;
  longitude: any;
  constructor(private router: Router, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) { }

  ngOnInit() {
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log(this.latitude + "" + this.longitude);
      this.getTheCountryName(this.latitude, this.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    this.router.navigate(['/notification']);
  }
  notnowbtn() {
    this.router.navigate(['/notification']);
  }

  getTheCountryName(lat, lon) {
    this.nativeGeocoder.reverseGeocode(lat, lon )
  .then((result: NativeGeocoderReverseResult[]) => console.log(JSON.stringify(result[0])))
  .catch((error: any) => console.log(error));
    console.log(lat + "" + lon);
  }

}
