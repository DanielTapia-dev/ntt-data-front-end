import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Observable, of } from 'rxjs';
import { map, catchError, debounceTime, switchMap } from 'rxjs/operators';
import { AlertService } from '@shared/services/alert.service';
import { GlobalMessages } from '@shared/constants';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private alertService: AlertService
  ) {
    this.form = this.fb.group({
      id: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
        [this.idValidator()],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required, this.releaseDateValidator()]],
      date_revision: [{ value: '', disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productService.getById(id).subscribe((product) => {
        this.form.patchValue(product);
        this.updateRevisionDate(product.date_release);
      });
    }

    this.form.get('date_release')?.valueChanges.subscribe((value) => {
      this.updateRevisionDate(value);
    });
  }

  updateRevisionDate(releaseDate: Date) {
    const release = new Date(releaseDate);
    if (isNaN(release.getTime())) return;
    const revision = new Date(release);
    revision.setFullYear(revision.getFullYear() + 1);
    this.form
      .get('date_revision')
      ?.setValue(revision.toISOString().substring(0, 10));
  }

  releaseDateValidator(): (
    control: AbstractControl
  ) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const today = new Date();
      const [year, month, day] = control.value.split('-').map(Number);
      const inputDate = new Date(year, month - 1, day);
      return inputDate >=
        new Date(today.getFullYear(), today.getMonth(), today.getDate())
        ? null
        : { invalidReleaseDate: true };
    };
  }

  idValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (this.isEditMode) {
        return of(null);
      }

      return this.productService.verifyId(control.value).pipe(
        debounceTime(300),
        switchMap((exists) => of(exists ? { idTaken: true } : null)),
        catchError(() => of(null))
      );
    };
  }

  submitForm(): void {
    if (this.form.invalid) return;

    const product = this.form.getRawValue();

    if (this.isEditMode) {
      this.productService.update(product.id, product).subscribe(
        () => {
          this.alertService.success('Se ha editado el producto: ' + product.id);
          this.router.navigate(['/products']);
        },
        (err) => {
          this.alertService.error(GlobalMessages.errorOccurred);
        }
      );
    } else {
      this.productService.create(product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

  resetForm(): void {
    this.form.reset();
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  get f() {
    return this.form.controls;
  }
}
