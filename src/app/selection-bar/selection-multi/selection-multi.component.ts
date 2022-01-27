
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {IDropdownSettings} from "ng-multiselect-dropdown";


@Component({
  selector: 'app-selection-multi',
  templateUrl: './selection-multi.component.html',
  styleUrls: ['./selection-multi.component.css']
})
export class SelectionMultiComponent implements OnInit {

  @Input() name: string = 'Wybierz';
  @Input() items!: string[];
  @Input() disabled: boolean = false;
  @Output() onSelectedChange = new EventEmitter<string[]>();

  selectedChange(){
    console.log(this);
    this.onSelectedChange.emit(this.selectedItems);
  }

  selectedItems: any;

  isCollapsed: boolean = true;

  dropdownSettings:IDropdownSettings={
    idField: 'item_id',
    textField: 'item_text',};

  constructor() { }



  ngOnInit() {
  }


}
