import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsService } from '../services/products.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@shared/services/alert.service';

describe('ProductFormComponent (simple)', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let mockProductService: any;
  let mockAlertService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
    };

    mockProductService = {
      create: jest.fn().mockReturnValue(of(undefined)),
      update: jest.fn().mockReturnValue(of(undefined)),
      getById: jest.fn(),
      verifyId: jest.fn().mockReturnValue(of(false)),
    };

    mockAlertService = {
      success: jest.fn(),
      error: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: ProductsService, useValue: mockProductService },
        { provide: AlertService, useValue: mockAlertService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => null } },
          },
        },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call create when form is valid and not in edit mode', () => {
    component.form.setValue({
      id: 'prod01',
      name: 'Producto Test',
      description: 'Descripción válida del producto',
      logo: 'http://logo.png',
      date_release: '2025-05-01',
      date_revision: '2026-05-01',
    });

    component.submitForm();

    expect(mockProductService.create).toHaveBeenCalledWith(
      component.form.getRawValue()
    );
  });

  it('should return error for past release date', () => {
    const validatorFn = component.releaseDateValidator();
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 1);

    const result = validatorFn({
      value: pastDate.toISOString().substring(0, 10),
    } as any);
    expect(result).toEqual({ invalidReleaseDate: true });
  });

  it('should return null for empty release date', () => {
    const validatorFn = component.releaseDateValidator();
    const result = validatorFn({ value: '' } as any);
    expect(result).toBeNull();
  });

  it('should not call service if form is invalid', () => {
    component.form.get('name')?.setValue('');
    component.submitForm();

    expect(mockProductService.create).not.toHaveBeenCalled();
    expect(mockProductService.update).not.toHaveBeenCalled();
  });

  it('should call error alert if update fails', () => {
    component.isEditMode = true;
    component.form.setValue({
      id: 'prod01',
      name: 'Producto Test',
      description: 'Descripción válida del producto',
      logo: 'http://logo.png',
      date_release: '2025-05-01',
      date_revision: '2026-05-01',
    });

    mockProductService.update.mockReturnValueOnce(
      throwError(() => ({ error: { message: 'update failed' } }))
    );

    component.submitForm();

    expect(mockAlertService.error).toHaveBeenCalledWith(
      'Ha ocurrido un error inesperado.'
    );
  });

  it('should return early if release date is invalid', () => {
    const setValueSpy = jest.spyOn(
      component.form.get('date_revision')!,
      'setValue'
    );
    component.updateRevisionDate('not-a-date' as any);
    expect(setValueSpy).not.toHaveBeenCalled();
  });

  it('should navigate back to products on goBack()', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });
});
