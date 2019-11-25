import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';

import { ContractComponent } from './contract/contract.component';
import { PsaComponent } from './psa.component';
import { RouterModule } from '@angular/router';
import { ContactPSAComponent } from './contact-psa/contact-psa.component';
import { ProjectPSAComponent } from './project-psa/project-psa.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DeliverylocationComponent } from './deliverylocation/deliverylocation.component';
import { ActionComponent } from './action/action.component';
import { ProjecttechstackComponent } from './projecttechstack/projecttechstack.component';
import { RatetypeComponent } from './ratetype/ratetype.component';
import { C2HComponent } from './c2-h/c2-h.component';
import { SezlocationComponent } from './sezlocation/sezlocation.component';
import { SarstatusComponent } from './sarstatus/sarstatus.component';
import { InterviewresultComponent } from './interviewresult/interviewresult.component';
import { PermstatusComponent } from './permstatus/permstatus.component';
import { ProjecttaskComponent } from './projecttask/projecttask.component';
import { ActiontypeComponent } from './actiontype/actiontype.component';
import { GstlocationComponent } from './gstlocation/gstlocation.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { DocumentStageComponent } from './document-stage/document-stage.component';
import { ContractcompanyComponent } from './contractcompany/contractcompany.component';
import { CountryComponent } from './country/country.component';
import { GeoComponent } from './geo/geo.component';

@NgModule({
  declarations: [CustomerComponent, ContractComponent, PsaComponent, ContactPSAComponent, ProjectPSAComponent, DeliverylocationComponent, ActionComponent, ProjecttechstackComponent, RatetypeComponent, C2HComponent, SezlocationComponent, SarstatusComponent, InterviewresultComponent, PermstatusComponent, ProjecttaskComponent, ActiontypeComponent, GstlocationComponent, DocumentTypeComponent, DocumentStageComponent, ContractcompanyComponent, CountryComponent, GeoComponent],
  imports: [
    CommonModule,RouterModule,FormsModule,ReactiveFormsModule,BrowserAnimationsModule,MatSelectModule,MatFormFieldModule
  ]
})
export class PsaModule { }
