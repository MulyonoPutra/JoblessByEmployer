import { CommonModule } from "@angular/common";
import { Component, type OnInit } from '@angular/core';
import { TableComponent } from "../../../../shared/components/molecules/table/table.component";

@Component({
  selector: 'app-manage-job-ads',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent
  ],
  templateUrl: './manage-job-ads.component.html',
  styleUrls: ['./manage-job-ads.component.scss'],
})
export class ManageJobAdsComponent implements OnInit {

  data = [
    { name: 'John', age: 25, email: 'john@example.com' },
    { name: 'Jane', age: 30, email: 'jane@example.com' },
    // Add more data here...
  ];

  columns !: any[];

  ngOnInit() {
    this.columns = [
      { field: 'age', header: 'Age' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' }
    ];
  }

  onCreate() {
    console.log('onCreate');

  }
  onEdit() {
    console.log('onEdit');
  }
  onDelete() {
    console.log('onDeleted');
  }

}
