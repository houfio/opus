import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detail', [
      state('true', style({
        marginBottom: '1rem'
      })),
      state('false', style({
        display: 'none',
        height: '0',
        opacity: '0',
        transform: 'scale(.95)'
      })),
      transition('* <=> *', [
        style({ display: 'block' }),
        animate('.25s ease')
      ])
    ])
  ]
})
export class TableComponent {
  @Input()
  public data!: unknown[];
  @Input()
  public detail!: TemplateRef<any>;
  @Input()
  public columns!: Column[];

  public expanded?: unknown;

  public get columnKeys() {
    return this.columns.map(({ key }) => key);
  }

  public setExpanded(row: unknown) {
    this.expanded = this.expanded === row ? undefined : row;
  }

  public getColumnSize(column: Column) {
    return {
      flexGrow: column.width ? 0 : 1,
      flexBasis: column.width ?? 'auto'
    };
  }
}

type Column = {
  key: string,
  title: string,
  width?: string,
  template?: TemplateRef<any>
}
