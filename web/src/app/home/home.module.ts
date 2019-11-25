import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';
import { RouterModule } from "@angular/router";
import { HelpComponent } from './help/help.component';
import { CostcenterComponent } from './costcenter/costcenter.component';
import { BusinessunitComponent } from './businessunit/businessunit.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { InsuranceComponent } from './insurance/insurance.component';
import { SubbusinessunitComponent } from './subbusinessunit/subbusinessunit.component';
import { EmployeeeducationComponent } from './employeeeducation/employeeeducation.component';
import { MaritalstatusComponent } from './maritalstatus/maritalstatus.component';
import { StatelistComponent } from './statelist/statelist.component';
import { UserlistComponent } from './userlist/userlist.component';
import { GpaComponent } from './gpa/gpa.component';
import { EmployeestatusComponent } from './employeestatus/employeestatus.component';
import { ResoucetypeComponent } from './resoucetype/resoucetype.component';
import { SeparationtypeComponent } from './separationtype/separationtype.component';
import { RoleComponent } from './role/role.component';
import { SystemComponent } from './system/system.component';
import { EmployeedesignationComponent } from './employeedesignation/employeedesignation.component';
import { EmployeeComponent } from './employee/employee.component';
import { PassportcenterComponent } from './passportcenter/passportcenter.component';
import { EmployeeeditComponent } from './employee/employeeedit/employeeedit.component';
import { BasicInfoComponent } from './employee/employeeedit/basic-info/basic-info.component';
import { OnBoardingComponent } from './employee/employeeedit/on-boarding/on-boarding.component';
import { EducationComponent } from './employee/employeeedit/education/education.component';
import { ExperienceComponent } from './employee/employeeedit/experience/experience.component';
import { SkillComponent } from './employee/employeeedit/skill/skill.component';
import { CertificationComponent } from './employee/employeeedit/certification/certification.component';
import { InsuranceDetailsComponent } from './employee/employeeedit/insurance-details/insurance-details.component';
import { BankComponent } from './employee/employeeedit/bank/bank.component';
import { ContactComponent } from './employee/employeeedit/contact/contact.component';
import { KyeComponent } from './employee/employeeedit/kye/kye.component';
import { BusinessUnitComponent } from './employee/employeeedit/business-unit/business-unit.component';
import { EmployeeTitleComponent } from './employee/employeeedit/employee-title/employee-title.component';
import { ProjectComponent } from './employee/employeeedit/project/project.component';
import { DependentComponent } from './employee/employeeedit/dependent/dependent.component';
import { SkillMasterComponent } from './skill-master/skill-master.component';
import { HrReportsComponent } from './hr-reports/hr-reports.component';
import { AdminRoleComponent } from './admin-role/admin-role.component';
import { HrRoleComponent } from './hr-role/hr-role.component';
import { EmployeeRoleComponent } from './employee-role/employee-role.component';
import { CareerComponent } from './career/career.component';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PersonaldetailComponent } from './personaldetail/personaldetail.component';
import { LeaveComponent } from './leave/leave.component';
import { OrgStructureComponent } from './org-structure/org-structure.component';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ResignationComponent } from './employee/employeeedit/resignation/resignation.component';
import { EmpreportsComponent } from './/empreports/empreports.component';

import { UserleavecomponentComponent } from './userleavecomponent/userleavecomponent.component';
import { EcComponent } from './ec/ec.component';
import { UcarrersComponent } from './ucarrers/ucarrers.component';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

import { TimeSheetManagementComponent } from './timesheetmanagement/timesheetmanagement.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material';
import { ToastrModule } from 'ng6-toastr-notifications';

//import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
//import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReplacePipe } from './replace.pipe';
import { SearchPipe } from '../search.pipe';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

import { MustMatchDirective } from './_helpers/must-match.directive';
import { PsaComponent } from './psa/psa.component';
import { CustomerComponent } from './psa/customer/customer.component';
import { ContractComponent } from './psa/contract/contract.component';
import { ContactPSAComponent } from './psa/contact-psa/contact-psa.component';
import { ProjectPSAComponent } from './psa/project-psa/project-psa.component';
import { ServicetypeComponent } from './psa/servicetype/servicetype.component';
import { BudgetlistComponent } from './psa/budgetlist/budgetlist.component';
import { InterviewmodeComponent } from './psa/interviewmode/interviewmode.component';
import { LocationtypeComponent } from './psa/locationtype/locationtype.component';
import { ServiceCategoryComponent } from './psa/service-category/service-category.component';
import { DeliverylocationComponent } from './psa/deliverylocation/deliverylocation.component';
import { BillingtypeComponent } from './psa/billingtype/billingtype.component';
import { ActionComponent } from './psa/action/action.component';
import { C2HComponent } from './psa/c2-h/c2-h.component';
import { InterviewresultComponent } from './psa/interviewresult/interviewresult.component';
import { PermstatusComponent } from './psa/permstatus/permstatus.component';
import { ProjecttechstackComponent } from './psa/projecttechstack/projecttechstack.component';
import { RatetypeComponent } from './psa/ratetype/ratetype.component';
import { SarstatusComponent } from './psa/sarstatus/sarstatus.component';
import { SezlocationComponent } from './psa/sezlocation/sezlocation.component';
import { ProjecttaskComponent } from './psa/projecttask/projecttask.component';
import { ActiontypeComponent } from './psa/actiontype/actiontype.component';
import { GstlocationComponent } from './psa/gstlocation/gstlocation.component';
import { DocumentTypeComponent } from './psa/document-type/document-type.component';
import { DocumentStageComponent } from './psa/document-stage/document-stage.component';
import { ContractcompanyComponent } from './psa/contractcompany/contractcompany.component';
import { CountryComponent } from './psa/country/country.component';
import { GeoComponent } from './psa/geo/geo.component';






@NgModule({
  declarations: 
  [
    TimeSheetManagementComponent,
    PsaComponent,
    CustomerComponent,
    ContactPSAComponent,
    ContractComponent,
    ProjectPSAComponent,
    DashboardComponent, 
    ReportComponent, 
    HelpComponent, 
    CostcenterComponent, 
    BusinessunitComponent, 
    InsuranceComponent, 
    SubbusinessunitComponent, 
    EmployeeeducationComponent, 
    MaritalstatusComponent, 
    StatelistComponent, 
    UserlistComponent,  
    GpaComponent, 
    EmployeestatusComponent, 
    ResoucetypeComponent,  
    SeparationtypeComponent, 
    RoleComponent, 
    SystemComponent, 
    EmployeedesignationComponent, 
    EmployeeComponent, 
    PassportcenterComponent, 
    EmployeeeditComponent, 
    BasicInfoComponent, 
    OnBoardingComponent, 
    EducationComponent, 
    ExperienceComponent, 
    SkillComponent, 
    CertificationComponent, 
    InsuranceDetailsComponent, 
    BankComponent, 
    ContactComponent, 
    KyeComponent, 
    BusinessUnitComponent, 
    EmployeeTitleComponent, 
    ProjectComponent, 
    DependentComponent, 
    SkillMasterComponent, 
    HrReportsComponent,
    AdminRoleComponent,
    HrRoleComponent,
    EmployeeRoleComponent,
    CareerComponent,
    JobDescriptionComponent,
    PersonaldetailComponent,
    LeaveComponent, 
    OrgStructureComponent,
    ResignationComponent,
    EmpreportsComponent,

    UserleavecomponentComponent,

    EcComponent,

    UcarrersComponent,
    PdfViewerComponent,
    ReplacePipe,
     SearchPipe,
     ChangepasswordComponent,
     MustMatchDirective,
     ServicetypeComponent,
     BudgetlistComponent,
     InterviewmodeComponent,
     LocationtypeComponent,
     ServiceCategoryComponent,
     DeliverylocationComponent,
     BillingtypeComponent,
     ActionComponent,
     C2HComponent,
     InterviewresultComponent,
     PermstatusComponent,
     ProjecttechstackComponent,
     RatetypeComponent,
     SarstatusComponent,
     SezlocationComponent,
     ProjecttaskComponent,
     ActiontypeComponent,
     GstlocationComponent,
     DocumentTypeComponent,
     DocumentStageComponent,
     ContractcompanyComponent,CountryComponent,
     GeoComponent
     

  ],
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    FormsModule,
    OrderModule,
    ChartsModule,
    TreeViewModule,ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ToastrModule.forRoot(),

    BrowserAnimationsModule,
    TreeViewModule,ReactiveFormsModule,
    //AngularMultiSelectModule,
    MatSelectModule,
    //NgMultiSelectDropDownModule.forRoot()
  ]
})

export class HomeModule { }
