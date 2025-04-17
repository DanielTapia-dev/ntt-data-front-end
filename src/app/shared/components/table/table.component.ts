import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '../../interfaces/table-column';
import { GlobalTypes } from '@shared/constants';

interface TableRow {
  showMenu?: boolean;
  [key: string]: any;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent<T extends TableRow> {
  @Input() tableColumns: TableColumn[] = [];
  @Input() data: T[] = [];

  @Output() onEdit = new EventEmitter<T>();
  @Output() onDelete = new EventEmitter<T>();

  itemsPerPage = 5;
  isLoading = true;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  get totalResults() {
    return Math.min(this.data.length, this.itemsPerPage);
  }

  toggleMenu(item: T): void {
    this.data.forEach((i) => {
      i.showMenu = i === item ? !i.showMenu : false;
    });
  }

  edit(item: T) {
    this.onEdit.emit(item);
  }

  delete(item: T) {
    this.onDelete.emit(item);
  }

  isDate(value: string): boolean {
    const isValidFormat =
      /\d{4}-\d{2}-\d{2}/.test(value) || /\d{2}\/\d{2}\/\d{4}/.test(value);

    if (!isValidFormat) return false;

    const date = new Date(value);
    return !isNaN(date.getTime());
  }

  isLogo(field: string): boolean {
    return field === GlobalTypes.Logo;
  }

  setDefaultImage(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/img/user.png';
  }
}
