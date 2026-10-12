
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  public submitted = false;
  public errorMessage = '';
  private tripCode = '';

  constructor(
  private formBuilder: FormBuilder,
  private route: ActivatedRoute,
  public router: Router,
  private tripService: TripDataService
) {}

  ngOnInit(): void {
    this.tripCode = this.route.snapshot.paramMap.get('tripCode') || '';

    this.editForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.tripService.getTrip(this.tripCode).subscribe({
      next: (trips) => {
        if (trips.length > 0) {
          const trip = trips[0];

          this.editForm.patchValue({
            ...trip,
            start: trip.start?.substring(0, 10)
          });
        } else {
          this.errorMessage = 'Trip not found.';
        }
      },
      error: (error: any) => {
        console.error(error);
        this.errorMessage = 'Unable to load trip.';
      }
    });
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }

    // Keep the original trip code as the lookup identifier.
    this.tripService.updateTrip({
      ...this.editForm.value,
      code: this.tripCode
    }).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error: any) => {
        console.error(error);
        this.errorMessage = 'Unable to update trip.';
      }
    });
  }

  get f() {
    return this.editForm.controls;
  }
}
