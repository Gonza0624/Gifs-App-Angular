import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'app-gifs-card',
  templateUrl: './gifs-card.component.html',
  styleUrls: ['./gifs-card.component.scss'],
})
export class GifsCardComponent {
  @Input()
  public gifs!: Gif;
}
