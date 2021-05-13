import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input()
  public data!: unknown[];
  @Input()
  public columns!: [string, string, TemplateRef<any>?][];

  public get columnKeys() {
    return this.columns.map(([key]) => key);
  }
}
