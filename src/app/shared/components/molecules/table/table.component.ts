import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, TemplateRef, type OnInit } from '@angular/core';
import { InputTextModule } from "primeng/inputtext";
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    IconFieldModule, InputTextModule, InputIconModule, ToolbarModule, ButtonModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Output() edited = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() created = new EventEmitter();
  @Input() records!: any[];
  @Input() filter!: string[];
  @Input() columns: { field: string; header: string; template?: TemplateRef<any> }[] = [];
  ngOnInit(): void { }

  onSearch(table: Table, event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    table.filterGlobal(value, 'contains');
  }

  onEdit(){
    this.edited.emit();
  }

  onDelete(){
    this.deleted.emit();
  }

  onClick(){
    this.created.emit();
  }

}