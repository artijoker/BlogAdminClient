import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-category-modal-window',
    templateUrl: './category-modal-window.component.html',
    styleUrls: ['./category-modal-window.component.css']
})
export class CategoryModalWindowComponent implements OnInit {
    @Input() currentName = "";
    name: string = "";

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
        this.name = this.currentName;
    }

    save(){
        if (this.name !== "")
            this.activeModal.close(this.name);
        else
            alert("Введите название категории");
    }

}
