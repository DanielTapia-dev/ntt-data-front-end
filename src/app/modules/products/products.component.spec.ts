import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsService } from './services/products.service';
import { AlertService } from '@shared/services/alert.service';
import { of, throwError } from 'rxjs';
import { Product } from '@shared/interfaces/product';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let mockProductService: any;
  let mockAlertService: any;
  let mockRouter: any;

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Test Product',
      description: 'desc',
      logo: '',
      date_release: new Date(),
      date_revision: new Date(),
    },
  ];

  beforeEach(async () => {
    mockProductService = {
      getAll: jest.fn().mockReturnValue(of({ data: mockProducts })),
      delete: jest.fn().mockReturnValue(of(undefined)),
    };

    mockAlertService = {
      success: jest.fn(),
      error: jest.fn(),
    };

    mockRouter = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ProductsService, useValue: mockProductService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(component.products.length).toBeGreaterThan(0);
    expect(mockProductService.getAll).toHaveBeenCalled();
  });

  it('should call deleteProduct and reload on success', () => {
    component.deleteProduct('1');
    expect(mockProductService.delete).toHaveBeenCalledWith('1');
    expect(mockAlertService.success).toHaveBeenCalled();
    expect(mockProductService.getAll).toHaveBeenCalledTimes(2);
  });

  it('should show error when delete fails', () => {
    mockProductService.delete.mockReturnValueOnce(
      throwError({ error: { message: 'Error al eliminar' } })
    );
    component.deleteProduct('1');
    expect(mockAlertService.error).toHaveBeenCalledWith(
      'Error: Error al eliminar'
    );
  });

  it('should navigate to create', () => {
    component.createProduct();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['products/create']);
  });

  it('should navigate to edit', () => {
    const product = mockProducts[0];
    component.editProduct(product);
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      'products/edit',
      product.id,
    ]);
  });

  it('should apply filter by text', () => {
    component.applyFilter('Test');
    expect(component.filteredProducts.length).toBeGreaterThan(0);
  });

  it('should apply filter by date', () => {
    const formatted = formatDate(
      mockProducts[0].date_release,
      'dd/MM/yyyy',
      'en-US'
    );
    component.applyFilter(formatted);
    expect(component.filteredProducts.length).toBeGreaterThan(0);
  });

  it('should detect valid dates', () => {
    expect(component.isDate('2025-01-01')).toBe(true);
    expect(component.isDate(new Date())).toBe(true);
    expect(component.isDate('not-a-date')).toBe(false);
  });

  it('should open and close confirmation modal', () => {
    component.openDeleteModal(mockProducts[0]);
    expect(component.selectedProduct).toEqual(mockProducts[0]);
    expect(component.showConfirmModal).toBe(true);

    component.cancelDelete();
    expect(component.showConfirmModal).toBe(false);
  });

  it('should confirm and delete product', () => {
    component.openDeleteModal(mockProducts[0]);
    component.confirmDelete();
    expect(mockProductService.delete).toHaveBeenCalledWith('1');
    expect(component.showConfirmModal).toBe(false);
  });

  it('should return default deleteMessage if no product is selected', () => {
    component.selectedProduct = undefined as any;
    expect(component.deleteMessage).toBe(
      '¿Estás seguro que deseas eliminar este registro?'
    );
  });

  it('should skip filtering if product value is falsy', () => {
    component.products = [{ ...mockProducts[0], description: null! }];
    component.filteredProducts = [];
    component.applyFilter('desc');
    expect(component.filteredProducts.length).toBe(0);
  });

  it('should skip date formatting if value is not a string/date', () => {
    const invalidProduct: any = {
      ...mockProducts[0],
      description: true,
    };
    component.products = [invalidProduct];
    component.applyFilter('true');
    expect(component.filteredProducts.length).toBe(1);
  });
});
