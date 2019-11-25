import { NgModule } from '@angular/core';
import { HelpComponent } from './help/help.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { AuthGuard } from '../gaurds/auth.guard';
import { CostcenterComponent } from './costcenter/costcenter.component';
import { BusinessunitComponent } from './businessunit/businessunit.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { SubbusinessunitComponent } from './subbusinessunit/subbusinessunit.component';
import { EmployeeeducationComponent } from './employeeeducation/employeeeducation.component';
import { MaritalstatusComponent } from './maritalstatus/maritalstatus.component';
import { StatelistComponent } from './statelist/statelist.component';
import { UserlistComponent } from './userlist/userlist.component';
import { GpaComponent } from './gpa/gpa.component';
import { ResoucetypeComponent } from './resoucetype/resoucetype.component';
import { EmployeestatusComponent } from './employeestatus/employeestatus.component';
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
import { PersonaldetailComponent } from './personaldetail/personaldetail.component';
import { LeaveComponent } from './leave/leave.component';
import { OrgStructureComponent } from './org-structure/org-structure.component';
import { EmpreportsComponent } from './/empreports/empreports.component';
import { ResignationComponent } from './employee/employeeedit/resignation/resignation.component';
import { UserleavecomponentComponent } from './userleavecomponent/userleavecomponent.component';
import { UcarrersComponent } from './ucarrers/ucarrers.component';
import { TimeSheetManagementComponent } from './timesheetmanagement/timesheetmanagement.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { PsaComponent } from './psa/psa.component';
import { CustomerComponent } from './psa/customer/customer.component';
import { ContractComponent } from './psa/contract/contract.component';
import { ContactPSAComponent } from './psa/contact-psa/contact-psa.component';
import { ProjectPSAComponent } from './psa/project-psa/project-psa.component';
import { ServicetypeComponent } from './psa/servicetype/servicetype.component';
import { InterviewmodeComponent } from './psa/interviewmode/interviewmode.component';
import { BudgetlistComponent } from './psa/budgetlist/budgetlist.component';
import { LocationtypeComponent } from './psa/locationtype/locationtype.component';
import { ServiceCategoryComponent } from './psa/service-category/service-category.component';
import { DeliverylocationComponent } from './psa/deliverylocation/deliverylocation.component';
import { BillingtypeComponent } from './psa/billingtype/billingtype.component';
import { ActionComponent } from './psa/action/action.component';
import { ProjecttechstackComponent } from './psa/projecttechstack/projecttechstack.component';
import { RatetypeComponent } from './psa/ratetype/ratetype.component';
import { C2HComponent } from './psa/c2-h/c2-h.component';
import { SezlocationComponent } from './psa/sezlocation/sezlocation.component';
import { SarstatusComponent } from './psa/sarstatus/sarstatus.component';
import { InterviewresultComponent } from './psa/interviewresult/interviewresult.component';
import { PermstatusComponent } from './psa/permstatus/permstatus.component';
import { ProjecttaskComponent } from './psa/projecttask/projecttask.component';
import { ActiontypeComponent } from './psa/actiontype/actiontype.component';
import { GstlocationComponent } from './psa/gstlocation/gstlocation.component';
import { DocumentTypeComponent } from './psa/document-type/document-type.component';
import { DocumentStageComponent } from './psa/document-stage/document-stage.component';
import { ContractcompanyComponent } from './psa/contractcompany/contractcompany.component';
import { CountryComponent } from './psa/country/country.component';
import { GeoComponent } from './psa/geo/geo.component';




export const HomeRoutes: Routes = [



  {
    path: '', component: HomeComponent, canActivate: [AuthGuard],

    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboard/personaldetails', component: PersonaldetailComponent },

      { path: 'admin', component: AdminRoleComponent },
      { path: 'hr', component: HrRoleComponent },
      { path: 'hr_reports', component: HrReportsComponent },
      { path: 'employee_role', component: EmployeeRoleComponent },
      { path: 'career', component: CareerComponent },
      { path: 'dashboard/career', component: CareerComponent },
      { path: 'dashboard/leave', component: LeaveComponent },
      { path: 'job', component: JobDescriptionComponent },
      { path: 'report', component: ReportComponent },
      { path: 'costcenter', component: CostcenterComponent },
      {path:'ServiceType',component:ServicetypeComponent},
      {path:'interviewmode',component:InterviewmodeComponent},
      {path:'budgetlist',component:BudgetlistComponent},
      {path:'locationtype',component:LocationtypeComponent},
      {path:'billingtype',component:BillingtypeComponent},
      {path:'serviceCategory',component:ServiceCategoryComponent},
      {path:'deliveryLocation',component:DeliverylocationComponent},
      {path:'action',component:ActionComponent},
      {path:'techstack',component:ProjecttechstackComponent},
      {path:'rateType',component:RatetypeComponent},
      {path:'c2h',component:C2HComponent},
      {path:'SezLoc',component:SezlocationComponent},
      {path:'sarstatus',component:SarstatusComponent},
      {path:'interviewresult',component:InterviewresultComponent},
      {path:'permstatus',component:PermstatusComponent},
      {path:'projecttask',component:ProjecttaskComponent},
      {path:'actiontype',component:ActiontypeComponent},
      {path:'gstloc',component:GstlocationComponent},
      {path:'geoloc',component:GeoComponent},
      {path:'country',component:CountryComponent},
      {path:'doctype',component:DocumentTypeComponent},
      {path:'docstage',component:DocumentStageComponent},
      {path:'contractcompany',component:ContractcompanyComponent},
      { path: 'businessunit', component: BusinessunitComponent },
      { path: 'subbusinessunit', component: SubbusinessunitComponent },
      { path: 'employeeeducation', component: EmployeeeducationComponent },
      { path: 'maritalstatus', component: MaritalstatusComponent },
      { path: 'statelist', component: StatelistComponent },
      { path: 'userlist', component: UserlistComponent },
      { path: 'insurance', component: InsuranceComponent },
      { path: 'resoucetype', component: ResoucetypeComponent },
      { path: 'employeestatus', component: EmployeestatusComponent },
      { path: 'changepassword', component: ChangepasswordComponent },
      { path: 'employee', component: EmployeeComponent },
      {
        path: 'employee/employeeedit/:employee_Id', component: EmployeeeditComponent,

        children:
          [

            { path: '', redirectTo: 'basicInfo', pathMatch: 'full' },
            { path: 'kye', component: KyeComponent, pathMatch: 'full' },
            { path: 'title', component: EmployeeTitleComponent },
            { path: 'experience', component: ExperienceComponent, pathMatch: 'full' },
            { path: 'bankdetails', component: BankComponent },
            { path: 'projectdetails', component: ProjectComponent },
            { path: 'dependentdetails', component: DependentComponent },
            { path: 'resignation', component: ResignationComponent },
            { path: 'basicInfo', component: BasicInfoComponent, pathMatch: 'full' },
            { path: 'businessunit', component: BusinessUnitComponent },
            { path: 'education', component: EducationComponent, pathMatch: 'full' },
            { path: 'skill', component: SkillComponent },
            { path: 'certification', component: CertificationComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'onboardingdetails', component: OnBoardingComponent },
            { path: 'insurance', component: InsuranceDetailsComponent }
          ]


      },
      { path: 'employeedesignation', component: EmployeedesignationComponent },
      { path: 'separationtype', component: SeparationtypeComponent },
      { path: 'passportcenter', component: PassportcenterComponent },
      { path: 'gpa', component: GpaComponent },
      { path: 'role', component: RoleComponent },
      { path: 'system', component: SystemComponent },
      { path: 'Empskill', component: SkillMasterComponent },
      { path: 'help', component: HelpComponent },

      { path: 'leave', component: LeaveComponent },
      { path: 'dashboard/userleave', component: UserleavecomponentComponent },
      { path: 'dashboard/ucarrers', component: UcarrersComponent },
      { path: 'orgstructure', component: OrgStructureComponent },
      { path: 'employeeReport', component: EmpreportsComponent },
      { path: 'timesheetmanagement', component: TimeSheetManagementComponent },
      {
        path: 'psa', component: PsaComponent,

        children:
          [
            { path: '', redirectTo: 'customer', pathMatch: 'full' },
            { path: 'customer', component: CustomerComponent },
            { path: 'contact', component: ContactPSAComponent },
            { path: 'contract', component: ContractComponent },
            { path: 'project', component: ProjectPSAComponent }
          ]
      },
      {
        path: 'employeeedit/:employee_Id', component: EmployeeeditComponent,

        children:
          [

            { path: '', redirectTo: 'basicInfo', pathMatch: 'full' },
            { path: 'kye', component: KyeComponent, pathMatch: 'full' },
            { path: 'title', component: EmployeeTitleComponent },
            { path: 'experience', component: ExperienceComponent, pathMatch: 'full' },
            { path: 'bankdetails', component: BankComponent },
            { path: 'projectdetails', component: ProjectComponent },
            { path: 'dependentdetails', component: DependentComponent },
            { path: 'resignation', component: ResignationComponent },
            { path: 'basicInfo', component: BasicInfoComponent, pathMatch: 'full' },
            { path: 'businessunit', component: BusinessUnitComponent },
            { path: 'education', component: EducationComponent, pathMatch: 'full' },
            { path: 'skill', component: SkillComponent },
            { path: 'certification', component: CertificationComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'onboardingdetails', component: OnBoardingComponent },
            { path: 'insurance', component: InsuranceDetailsComponent }
          ]

      }
    ]

  }]
  @NgModule({
    imports: [RouterModule.forChild(HomeRoutes)],
    exports: [RouterModule]
  })
  export class homeRoutingModule { }
