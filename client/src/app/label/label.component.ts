import { Component, OnInit } from '@angular/core';
import { LabelService } from '../services/label.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private labelService: LabelService, private toastr: ToastrService){}

  labels: Label[] = [];
  errorMessage: string = '';
  successMessage: string = '';


  ngOnInit() {
    this.getAllLabels();
  }

  getAllLabels() {
    this.labelService.getAllLabels().subscribe(
      (data: { labels: Label[] }) => {
        this.labels = data.labels;
        this.successMessage = '';
        this.errorMessage = '';
      },
      (error: any) => {
        this.labels = [];
        this.errorMessage = 'An error occurred while retrieving labels.';
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
        this.getAllLabels();
        this.successMessage = 'Label created successfully.';
        this.errorMessage = '';
      },
      (error: any) => {
        this.errorMessage = 'An error occurred while creating the label.';
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
        this.getAllLabels();
        this.successMessage = 'Label updated successfully.';
        this.errorMessage = '';
      },
      (error: any) => {
        this.errorMessage = 'An error occurred while updating the label.';
        console.error(error);
      }
    );
  }

  deleteLabel(label: Label) {
    this.labelService.deleteLabel(label.id).subscribe(
      (response: { message: string }) => {
        this.getAllLabels();
        this.successMessage = 'Label deleted successfully.';
        this.errorMessage = '';
      },
      (error: any) => {
        this.errorMessage = 'An error occurred while deleting the label.';
        console.error(error);
      }
    );
  }
}
