import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { Table, TableModule } from 'primeng/table';

import { ButtonModule } from 'primeng/button';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        IconFieldModule,
        InputTextModule,
        InputIconModule,
        ToolbarModule,
        ButtonModule,
    ],
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent {
    @Output() edited = new EventEmitter<string>();
    @Output() deleted = new EventEmitter<string>();
    @Output() created = new EventEmitter();
    @Input() records!: any[];
    @Input() filter!: string[];
    @Input() columns: { field: string; header: string; template?: TemplateRef<any> }[] = [];

    onSearch(table: Table, event: Event) {
        const target = event.target as HTMLInputElement;
        const value = target.value;
        table.filterGlobal(value, 'contains');
    }

    resolveField(rowData: any, field: string) {
        return field.split('.').reduce((prev, curr) => prev && prev[curr], rowData);
    }

    onEdit(id: string) {
        this.edited.emit(id);
    }

    onDelete(id: string) {
        this.deleted.emit(id);
    }

    onClick() {
        this.created.emit();
    }
}
