import { Component, OnInit } from '@angular/core';
import {NbDialogRef, NbDialogService, NbToastrService, NbWindowRef, NbWindowState} from '@nebular/theme';
import {WorkItem} from "../../models/work-item.model";
import {FirebaseService} from "../../services/firebase/firebase.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-work-item-create',
  templateUrl: './work-item-create.component.html',
  styleUrls: ['./work-item-create.component.scss']
})
export class WorkItemCreateComponent implements OnInit {
  title;
  new;
  workItem: WorkItem = {
    title: '',
    details: '',
    size: '',
    priority: '',
    position: '',
  };

  formValid = {
    title: true,
    details: true,
    size: true,
    priority: true,
    position: true,
  };

  constructor(private nbWindowRef: NbWindowRef, private fbService: FirebaseService, private toastrService: NbToastrService) { }

  ngOnInit(): void {
  }


  save() {
    if (this.validateForm()) {
      const id = this.workItem.id || `_${Math.random().toString(36).substr(2, 9)}`;
      this.fbService.createWorkItem({ ...this.workItem, id});
      this.nbWindowRef.close();
    } else {
      const missingFeilds = Object.keys(this.formValid).filter(x => !this.formValid[x]);
      const message = `${missingFeilds.join(', ')} ${missingFeilds.length > 1 ? 'are' : 'is'} required`;
      this.toastrService.show(
        message,
        'warning',
        { preventDuplicates: false, status: 'danger', icon: 'alert-circle-outline' });
    }

  }

  close() {
    this.nbWindowRef.close();
  }

  validateForm(): boolean {
    let valid = true;
    Object.keys(this.workItem).forEach(k => {
      if (!this.workItem[k] || this.workItem[k] === '') {
        this.formValid[k] = false;
        valid = false;
      } else {
        this.formValid[k] = true;
      }
    })
    return valid;
  }
}
