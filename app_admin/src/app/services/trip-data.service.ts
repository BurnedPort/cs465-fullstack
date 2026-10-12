
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiUrl = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

  // GET all trips
  public getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  // GET one trip
  public getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(
      `${this.apiUrl}/${encodeURIComponent(tripCode)}`
    );
  }

  // POST new trip
  public addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl, trip);
  }

  // PUT updated trip
  public updateTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.apiUrl}/${encodeURIComponent(trip.code)}`,
      trip
    );
  }

  // DELETE trip
  public deleteTrip(tripCode: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${encodeURIComponent(tripCode)}`
    );
  }
}
