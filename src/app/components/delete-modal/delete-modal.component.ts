import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.component.html',
    styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit{

    userName: string = '';

    constructor(@Inject(MAT_DIALOG_DATA) data: string,) {
        this.userName = data;
    }
    
    ngOnInit(): void {
    }
}
