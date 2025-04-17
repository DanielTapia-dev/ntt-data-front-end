import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Product } from 'src/app/shared/interfaces/product';
import { environment } from 'src/environments/environment';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiUrl}/products`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all products', () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description of Product 1',
        logo: 'http://example.com/product1.png',
        date_release: new Date(),
        date_revision: new Date(),
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description of Product 2',
        logo: 'http://example.com/product2.png',
        date_release: new Date(),
        date_revision: new Date(),
      },
    ];

    service.getAll().subscribe((response) => {
      expect(response.data.length).toBe(2);
      expect(response.data).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockProducts });
  });

  it('should retrieve a product by id', () => {
    const mockProduct: Product = {
      id: '1',
      name: 'Product 1',
      description: 'Description of Product 1',
      logo: 'http://example.com/product1.png',
      date_release: new Date(),
      date_revision: new Date(),
    };

    service.getById('1').subscribe((response) => {
      expect(response).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should verify if an ID is taken', () => {
    const id = '1';
    const mockResponse = true;

    service.verifyId(id).subscribe((response) => {
      expect(response).toBe(true);
    });

    const req = httpMock.expectOne(`${apiUrl}/verification/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should create a product', () => {
    const newProduct: Product = {
      id: '3',
      name: 'New Product',
      description: 'New product description',
      logo: 'http://example.com/new-product.png',
      date_release: new Date(),
      date_revision: new Date(),
    };

    service.create(newProduct).subscribe((response) => {
      expect(response).toEqual(newProduct);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newProduct);
  });

  it('should update a product', () => {
    const updatedProduct: Product = {
      id: '1',
      name: 'Updated Product',
      description: 'Updated description',
      logo: 'http://example.com/updated-product.png',
      date_release: new Date(),
      date_revision: new Date(),
    };

    service.update('1', updatedProduct).subscribe((response) => {
      expect(response).toEqual(updatedProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedProduct);
  });

  it('should delete a product', () => {
    const productId = '1';

    service.delete(productId).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
