import { Component, OnInit } from '@angular/core';
import { LabelService } from '../services/label.service';

interface Label {
  id: number;
  description: string;
  texture: string;
  color: string;
  size: string;
  price: number;
  brand: string;
}

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css'],
  providers: [LabelService]
})
export class LabelComponent implements OnInit {
  labels: Label[] = [];

  constructor(private labelService: LabelService) {}

  ngOnInit() {
    this.getAllLabels();
  }

  getAllLabels() {
    this.labelService.getAllLabels().subscribe(
      (data: { labels: Label[] }) => {
        this.labels = data.labels;
        console.log(this.labels);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  createLabel() {
    const newLabel: Label = {
      id: 0,
      description: 'Example Description',
      texture: 'Example Texture',
      color: 'Example Color',
      size: 'Example Size',
      price: 0,
      brand: 'Example Brand'
    };

    this.labelService.createLabel(newLabel).subscribe(
      (response: { label: Label }) => {
        console.log('Label created successfully!', response.label);
        this.getAllLabels();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  updateLabel(label: Label) {
    const updatedLabel: Label = {
      id: label.id,
      description: 'Updated Description',
      texture: 'Updated Texture',
      color: 'Updated Color',
      size: 'Updated Size',
      price: label.price,
      brand: 'Updated Brand'
    };

    this.labelService.updateLabel(updatedLabel.id, updatedLabel).subscribe(
      (response: { message: string }) => {
        console.log('Label updated successfully!', response.message);
        this.getAllLabels();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  deleteLabel(label: Label) {
    this.labelService.deleteLabel(label.id).subscribe(
      (response: { message: string }) => {
        console.log('Label deleted successfully!', response.message);
        this.getAllLabels();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
