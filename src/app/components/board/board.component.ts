import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input()
  public set lanes(value: string[]) {
    this.board = [...value, 'default'].reduce((acc, lane) => ({
      ...acc,
      [lane]: this.board[lane] ?? []
    }), {})
  }

  public board: Record<string, string[]> = {
    default: [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep'
    ]
  };

  public get lanes() {
    return Object.keys(this.board);
  }

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
