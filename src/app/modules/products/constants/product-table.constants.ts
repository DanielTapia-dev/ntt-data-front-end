import { TableColumn } from 'src/app/shared/interfaces/table-column';

export enum ProductTableFields {
  Id = 'id',
  Name = 'name',
  Description = 'description',
  Logo = 'logo',
  ReleaseDate = 'date_release',
  RevisionDate = 'date_revision',
}

export const ProductTableColumns: TableColumn[] = [
  {
    field: ProductTableFields.Logo,
    header: 'Logo',
    hasIcon: false,
    type: 'img',
  },
  {
    field: ProductTableFields.Name,
    header: 'Nombre del producto',
    hasIcon: false,
    type: 'string',
  },
  {
    field: ProductTableFields.Description,
    header: 'Descripción',
    hasIcon: true,
    type: 'string',
  },
  {
    field: ProductTableFields.ReleaseDate,
    header: 'Fecha de liberación',
    hasIcon: true,
    type: 'Date',
  },
  {
    field: ProductTableFields.RevisionDate,
    header: 'Fecha de reestructuración',
    hasIcon: true,
    type: 'Date',
  },
];
