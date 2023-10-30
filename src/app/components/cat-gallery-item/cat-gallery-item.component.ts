import { Component, Input, OnInit } from '@angular/core';
import { CatImage } from 'src/app/interfaces/cat.interface';

@Component({
  selector: 'app-cat-gallery-item',
  templateUrl: './cat-gallery-item.component.html',
  styleUrls: ['./cat-gallery-item.component.css'],
})
export class CatGalleryItemComponent implements OnInit {
  @Input()
  image!: CatImage;

  constructor() {}

  ngOnInit() {}
}
