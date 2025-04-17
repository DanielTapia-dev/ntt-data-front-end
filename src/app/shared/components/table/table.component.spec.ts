import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { TableColumn } from '../../interfaces/table-column';

describe('TableComponent', () => {
  let component: TableComponent<any>;
  let fixture: ComponentFixture<TableComponent<any>>;

  const mockTableColumns: TableColumn[] = [
    { header: 'ID', field: 'id', type: 'string' },
    { header: 'Name', field: 'name', type: 'string' },
  ];

  const mockData = [
    { id: 1, name: 'Product 1', showMenu: true },
    { id: 2, name: 'Product 2', showMenu: true },
    { id: 3, name: 'Product 3', showMenu: true },
    { id: 4, name: 'Product 4', showMenu: true },
    { id: 5, name: 'Product 5', showMenu: true },
    { id: 6, name: 'Product 6', showMenu: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.tableColumns = mockTableColumns;
    component.data = mockData;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onEdit when edit method is called', () => {
    jest.spyOn(component.onEdit, 'emit');
    const product = mockData[0];

    component.edit(product);

    expect(component.onEdit.emit).toHaveBeenCalledWith(product);
  });

  it('should emit onDelete when delete method is called', () => {
    jest.spyOn(component.onDelete, 'emit');
    const product = mockData[0];

    component.delete(product);

    expect(component.onDelete.emit).toHaveBeenCalledWith(product);
  });

  it('should toggle menu visibility for an item', () => {
    const product = mockData[0];

    component.toggleMenu(product);

    expect(product.showMenu).toBe(false);

    component.toggleMenu(product);
    expect(product.showMenu).toBe(true);

    const anotherProduct = mockData[1];
    component.toggleMenu(anotherProduct);
    expect(product.showMenu).toBe(false);
    expect(anotherProduct.showMenu).toBe(true);
  });

  it('should return true if value is a valid date', () => {
    expect(component.isDate('2025-04-01')).toBe(true);
    expect(component.isDate('01/04/2025')).toBe(true);
    expect(component.isDate('invalid-date')).toBe(false);
  });

  it('should return true if field is Logo', () => {
    expect(component.isLogo('logo')).toBe(true);
    expect(component.isLogo('id')).toBe(false);
  });

  it('should set default image when setDefaultImage is called', () => {
    const event = { target: { src: 'some-image.png' } } as any;
    const imgElement = event.target as HTMLImageElement;

    component.setDefaultImage(event);

    expect(imgElement.src).toContain('assets/img/user.png');
  });
});
