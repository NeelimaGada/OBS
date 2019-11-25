import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';

@Injectable({
  providedIn: 'root'
})
export class HrmsService {

  getPassportCenter(arg0: any): any {
    throw new Error("Method not implemented.");
  }

  host_url:any;

  constructor(private http:HttpClient) { 
    this.host_url = `${environment.host_url}`
  }

  //  host_url:any="http://192.168.1.48:";
//ankamma rao services


//Sub Business Unit

setSubbusinessunit(requestObject) {
  return this.http.post(this.host_url+"/master/subbusinessunit/set",requestObject);
}

getSubbusinessUnit(requestObject){
  return this.http.post(this.host_url+"/master/subbusinessunit/get ",requestObject);
}
getSubbusinessinfo(requestObject1){
  return this.http.post(this.host_url+"/master/subbusinessunit/get ",requestObject1);
}
updateSubbusinessUnit(updateReqObj){
  return this.http.post(this.host_url+"/master/subbusinessunit/set ",updateReqObj);
}
deleteSubbusinessUnit(deleteReqObj){
  return this.http.post(this.host_url+"/master/ojas-obs-online/service/subbusinessunit/set",deleteReqObj);
}

// Cost Center 

setCostcenter(costcenterReqObj) {
  return this.http.post(this.host_url+"/master/costcenterservice/set",costcenterReqObj);
}

getCostcenter(costcenterReqObj) {
  return this.http.post(this.host_url+"/master/costcenterservice/get",costcenterReqObj);
}
updateCostCenter(updatedData){
  return this.http.post(this.host_url+"/master/costcenterservice/set",updatedData);
}

deleteCostCenter(deleteData){
  return this.http.post(this.host_url+"/master/ojas-obs-online/costcenter/set",deleteData);
}

// Business Unit

setBusinessunit(busiessunitReqObj){
  return this.http.post(this.host_url+"/master/businessUnit/set",busiessunitReqObj);
}

getBusinesinfo(busiessunitReqObj){
  return this.http.post(this.host_url+"/master/businessUnit/get",busiessunitReqObj);
}
updateBusinessunit(buupdateReqObj){
  return this.http.post(this.host_url+"/master/businessUnit/set",buupdateReqObj);
}
deleteBusiness(buDeleteReqObj){
  return this.http.post(this.host_url+"/master/ojas-obs-online/businessUnit/service/set",buDeleteReqObj);
}
//ankamma rao services ends

// nagaraj services 

//Employee Designation

setEmployeeDesignation(EmpDesignationReqObj){
  return this.http.post(this.host_url+"/master/designation/set",EmpDesignationReqObj);
}

getEmployeeDesignation(EmpDesignationReqObj){
  return this.http.post(this.host_url+"/master/designation/get",EmpDesignationReqObj);
}

updateEmpolyeeDesignation(updatedData){
  return this.http.post(this.host_url+"/master/designation/set",updatedData);
}

deleteEmpolyeeDesignation(deleteData){
  return this.http.post(this.host_url+"/master/designation/set",deleteData);
}
//Employee Designation Ends

// Passport Center

setPassportCeneter(PassportReqObj){
  return this.http.post(this.host_url+"/master/passportService/set",PassportReqObj);
}

getPassportCeneter(PassportReqObj){
  return this.http.post(this.host_url+"/master/passportService/get",PassportReqObj);
}
updatePassportCenter(PassportupdateObj){
  return this.http.post(this.host_url+"/master/passportService/set",PassportupdateObj);
}
deletepassportCenter(PassportdeleteObj){
  return this.http.post(this.host_url+"/master/passportService/set",PassportdeleteObj);
}

// Passport center Ends

//skill starts

setSkillMaster(skillmasterReqObj){
  return this.http.post(this.host_url+"/master/skill/set",skillmasterReqObj)
}
getSkillmaster(getskillmasterReqObj){
  return this.http.post(this.host_url+"/master/skill/get",getskillmasterReqObj)
}
updateSkillMaster(updateskillmasterReqObj){
  return this.http.post(this.host_url+"/master/skill/set",updateskillmasterReqObj)
}
deleteSkillMaster(deleteskillmasterReqObj){
  return this.http.post(this.host_url+"/master/skill/set",deleteskillmasterReqObj)
}
//skill ends

// role management

setRoleManagement(RoleReqObj){
  return this.http.post(this.host_url+"/master/RoleManagement/set",RoleReqObj);
}
getRoleManagement(RoleGetReqObj){
  return this.http.post(this.host_url+"/master/RoleManagement/get",RoleGetReqObj);
}
updateRoleManagement(RoleUpdate){
  return this.http.post(this.host_url+"/master/RoleManagement/set",RoleUpdate);
}
dleteRoleManagement(RoleDelete){
  return this.http.post(this.host_url+"/master/RoleManagement/set",RoleDelete);
}

//role management


//skill starts
setSkill(skillReqObj){
  return this.http.post(this.host_url+"/obs/employeeskillsdetails/set",skillReqObj)
}
getSkill(getskillReqObj){
  return this.http.post(this.host_url+"/obs/employeeskillsdetails/get",getskillReqObj)
}
updateSkill(updateskillReqObj){
  return this.http.post(this.host_url+"/obs/employeeskillsdetails/set",updateskillReqObj)
}
deleteSkill(deleteskillReqObj){
  return this.http.post(this.host_url+"/obs/employeeskillsdetails/set",deleteskillReqObj)
}
getSkilbyId(editskillReg){
  return this.http.post(this.host_url+"/obs/employeeskillsdetails/get",editskillReg)
}

//skill ends

//certification strats
setCertification(certificationReqObj){
  return this.http.post(this.host_url+"/obs/certifications/setCertificationDetails",certificationReqObj)
}
getCertification(getcertificationReqObj){
  return this.http.post(this.host_url+"/obs/certifications/getCertificationDetails",getcertificationReqObj)
}
updateCertification(updatecertificationReqObj){
  return this.http.post(this.host_url+"/obs/certifications/setCertificationDetails",updatecertificationReqObj)
}
deleteCertification(deletecertificationReqObj){
  return this.http.post(this.host_url+"/obs/certifications/setCertificationDetails",deletecertificationReqObj)
}
getCertificationbyId(editcertificationReg){
  return this.http.post(this.host_url+"/obs/certifications/getCertificationDetails",editcertificationReg)
}
//certification ends



//contact starts
 setContactInfo(contactReqObj){
  return this.http.post(this.host_url+"/obs/employeecontactinfo/set",contactReqObj)
}
getContactInfo(getConReqObj){
  return this.http.post(this.host_url+"/obs/employeecontactinfo/get",getConReqObj)
}
updateContactInfo(updateConReqObj){
  return this.http.post(this.host_url+"/obs/employeecontactinfo/set",updateConReqObj)
}
deleteContactInfo(deleteConReqObj){
  return this.http.post(this.host_url+"/obs/employeecontactinfo/set",deleteConReqObj)
}
getcontactbyId(editConReg){
  return this.http.post(this.host_url+"/obs/employeecontactinfo/get",editConReg)
}
//contact ends


//nagaraj Api's end 


  // setSubbusinessunit(requestObject) {
  //   return this.http.post("http://192.168.1.95:8080/ojas-obs-online/service/subbusinessunit/set",requestObject);
  // }

  // getSubbusinessUnit(requestObject){
  //   return this.http.post("http://192.168.1.95:8080/ojas-obs-online/service/subbusinessunit/get",requestObject);
  // }
  // updateSubbusinessUnit(updateReqObj){
  //   return this.http.post("http://192.168.1.95:8080/ojas-obs-online/service/subbusinessunit/set",updateReqObj);
  // }
  // deleteSubbusinessUnit(deleteReqObj){
  //   return this.http.post("http://192.168.1.95:8080/ojas-obs-online/service/subbusinessunit/set",deleteReqObj);
  // }

  // setCostcenter(costcenterReqObj) {
  //   return this.http.post("http://192.168.1.95:8080/ojas-obs-online/costcenter/set",costcenterReqObj);
  // }

  // getCostcenter(costcenterReqObj) {
  //   return this.http.post("http://192.168.1.95:8080/ojas-obs-online/costcenter/get",costcenterReqObj);
  // }
  // updateCostCenter(updatedData){
  //   return this.http.post("http://192.168.1.95:8080/ojas-obs-online/costcenter/set",updatedData);
  // }

  // deleteCostCenter(deleteData){
  //   return this.http.post("http://192.168.1.95:8080/ojas-obs-online/costcenter/set",deleteData);
  // }

  // setBusinessunit(busiessunitReqObj){
  //   return this.http.post("http://192.168.1.95:8080/ojas-obs-online/businessUnit/service/set",busiessunitReqObj);
  // }

  //getBusinessunit(busiessunitReqObj){
    //return this.http.post("http://192.168.1.95:8080/ojas-obs-online/businessUnit/service/get",busiessunitReqObj);
  //}
  // updateBusinessunit(buupdateReqObj){
  //   return this.http.post("http://192.168.1.95:8080/ojas-obs-online/businessUnit/service/set",buupdateReqObj);
  // }
  // deleteBusiness(buDeleteReqObj){
  //   return this.http.post("http://192.168.1.95:8080/ojas-obs-online/businessUnit/service/set",buDeleteReqObj);
  // }
  // setEmployeeStatus(EmpStatusReqObj){
  //   return this.http.post("http://192.168.1.95:8080/ojas-obs-online/obs/emplyoeestatus/set",EmpStatusReqObj);
  // }
   

// bu starts services-----
getBusinessunit(businesinfo){
  return this.http.post(this.host_url+"/obs/employeebu/get",businesinfo);
}
savebusinesunit(savebusines){
  return this.http.post(this.host_url+"/obs/employeebu/set",savebusines);
}
deletebusinessunit(deleteBusinessUnitObj){
  return this.http.post(this.host_url+"/obs/employeebu/set",deleteBusinessUnitObj);
}
updatebusinesunit(updatebusinesobj){
  return this.http.post(this.host_url+"/obs/employeebu/set",updatebusinesobj);
}
getbyIdbusines(updatebusinesobj){

  return this.http.post(this.host_url+"/obs/emplyeebu/get",updatebusinesobj);


}
// bu ends-----------

// Profile pic updaton
updateProfilepic(basicempinfo){
  return this.http.post(this.host_url+"/obs/employeeInfo/set",basicempinfo);
}




  getEmployeeStatus(EmpStatusReqObj){
    return this.http.post(this.host_url+"/master/ojas-obs-online/obs/emplyoeestatus/get",EmpStatusReqObj);
  }
  updateEmployeeStatus(updateEmpStatus){
    return this.http.post(this.host_url+"/master/ojas-obs-online/obs/emplyoeestatus/set",updateEmpStatus);
  }
  deleteEmployeeStatus(deleteEmpStatus){
    return this.http.post(this.host_url+"/master/ojas-obs-online/obs/emplyoeestatus/set",deleteEmpStatus);
  }
  setEmployeeStatus(EmpStatusReqObj){
    return this.http.post(this.host_url+"/master/ojas-obs-online/obs/emplyoeestatus/set",EmpStatusReqObj);
  }

  // setEmployeeDesignation(EmpDesignationReqObj){
  //   return this.http.post("http://192.168.1.95:8080/ojas-obs-online/designation/service/set",EmpDesignationReqObj);
  // }

  // getEmployeeDesignation(EmpDesignationReqObj){
  //   return this.http.post("http://192.168.1.95:8080/ojas-obs-online/designation/service/get",EmpDesignationReqObj);
  // }

  // updateEmpolyeeDesignation(updatedData){
  //   return this.http.post("http://192.168.1.95:8080/ojas-obs-online/designation/service/set",updatedData);
  // }

  // deleteEmpolyeeDesignation(deleteData){
  //   return this.http.post("http://192.168.1.95:8080/ojas-obs-online/designation/service/set",deleteData);
  // }
  // setPassportCeneter(PassportReqObj){
  //   return this.http.post("http://192.168.1.95:8080/ojas-obs-online/passport/set",PassportReqObj);
  // }

  // getPassportCeneter(PassportReqObj){
  //   return this.http.post("http://192.168.1.95:8080/ojas-obs-online/passport/get",PassportReqObj);
  // }
  // updatePassportCenter(PassportupdateObj){
  //   return this.http.post("http://192.168.1.95:8080/ojas-obs-online/passport/set",PassportupdateObj);
  // }
  // deletepassportCenter(PassportdeleteObj){
  //   return this.http.post("http://192.168.1.95:8080/ojas-obs-online/passport/set",PassportdeleteObj);
  // }

  //state List

setStateList(StateReqObj){
  return this.http.post(this.host_url+"/master/states/set",StateReqObj);
}
 getStatusList(StategetReqObj){
   return this.http.post(this.host_url+"/master/states/get",StategetReqObj);
 }
 updateStateList(updatestateData){
   return this.http.post(this.host_url+"/master/states/set",updatestateData);
 }
 deleteStateList(deleteStateData){
   return this.http.post(this.host_url+"/master/states/set",deleteStateData);
 }

 //StateList


 setGpaData(GpaReqObj){
  return this.http.post(this.host_url+"/master/gpa/set",GpaReqObj);
}
 getGpaData(GpagetReqObj){
   return this.http.post(this.host_url+"/master/gpa/get",GpagetReqObj);
 }
 updateGpaData(GpaupdateReqObj){
   return this.http.post(this.host_url+"/master/gpa/set",GpaupdateReqObj);
 }
 deleteGpaData(GpadeleteData){
   return this.http.post(this.host_url+"/master/gpa/set",GpadeleteData);
 }
 setEmployeeEducation(EmpSaveData){
   return this.http.post(this.host_url+"/master/ojas-obs-online/education/set",EmpSaveData);
 }
 getEmployeeEducation(EmpEduGetData){
   return this.http.post(this.host_url+"/master/ojas-obs-online/education/get",EmpEduGetData);
 }
 updatedEmployeeEducation(EmpEduUpdateData){
   return this.http.post(this.host_url+"/master/ojas-obs-online/education/set",EmpEduUpdateData);
 }
 deleteEmployeeEducation(EmpEduDeleteData){
   return this.http.post(this.host_url+"/master/ojas-obs-online/education/set",EmpEduDeleteData);
 }
//  setRoleManagement(RoleReqObj){
//    return this.http.post("http://192.168.1.95:8080/ojas-obs-online/role/set",RoleReqObj);
//  }
//  getRoleManagement(RoleGetReqObj){
//    return this.http.post("http://192.168.1.95:8080/ojas-obs-online/role/get",RoleGetReqObj);
//  }
//  updateRoleManagement(RoleUpdate){
//    return this.http.post("http://192.168.1.95:8080/ojas-obs-online/role/set",RoleUpdate);
//  }
//  dleteRoleManagement(RoleDelete){
//    return this.http.post("http://192.168.1.95:8080/ojas-obs-online/role/set",RoleDelete);
//  }



//skill starts

//  setSkillMaster(skillmasterReqObj){
//   return this.http.post("http://192.168.6.186:/obs/skill/set",skillmasterReqObj)
// }
// getSkillmaster(getskillmasterReqObj){
//   return this.http.post("http://192.168.6.186:/obs/skill/get",getskillmasterReqObj)
// }
// updateSkillMaster(updateskillmasterReqObj){
//   return this.http.post("http://192.168.6.186:/obs/skill/set",updateskillmasterReqObj)
// }
// deleteSkillMaster(deleteskillmasterReqObj){
//   return this.http.post("http://192.168.6.186:/obs/skill/set",deleteskillmasterReqObj)
// }


//skill ends


//  //contact starts
//  setContactInfo(contactReqObj){
//   return this.http.post("http://192.168.6.186:/obs/employeecontactinfo/set",contactReqObj)
// }
// getContactInfo(getConReqObj){
//   return this.http.post("http://192.168.6.186:/obs/employeecontactinfo/get",getConReqObj)
// }
// updateContactInfo(updateConReqObj){
//   return this.http.post("http://192.168.6.186:/obs/employeecontactinfo/set",updateConReqObj)
// }
// deleteContactInfo(deleteConReqObj){
//   return this.http.post("http://192.168.6.186:/obs/employeecontactinfo/set",deleteConReqObj)
// }
// getcontactbyId(editConReg){
//   return this.http.post("http://192.168.6.186:/obs/employeecontactinfo/get",editConReg)
// }
// //contact ends



// //certification starts
// setCertification(certificationReqObj){
//   return this.http.post("http://192.168.6.186:/obs/certifications/setCertificationDetails",certificationReqObj)
// }
// getCertification(getcertificationReqObj){
//   return this.http.post("http://192.168.6.186:/obs/certifications/getCertificationDetails",getcertificationReqObj)
// }
// updateCertification(updatecertificationReqObj){
//   return this.http.post("http://192.168.6.186:/obs/certifications/setCertificationDetails",updatecertificationReqObj)
// }
// deleteCertification(deletecertificationReqObj){
//   return this.http.post("http://192.168.6.186:/obs/certifications/setCertificationDetails",deletecertificationReqObj)
// }
// getCertificationbyId(editcertificationReg){
//   return this.http.post("http://192.168.6.186:/obs/certifications/getCertificationDetails",editcertificationReg)
// }
// //certification ends

//skill starts
// setSkill(skillReqObj){
//   return this.http.post("http://192.168.6.186:/obs/employeeskilldetails/set",skillReqObj)
// }
// getSkill(getskillReqObj){
//   return this.http.post("http://192.168.6.186:/obs/employeeskilldetails/get",getskillReqObj)
// }
// updateSkill(updateskillReqObj){
//   return this.http.post("http://192.168.6.186:/obs/employeeskilldetails/set",updateskillReqObj)
// }
// deleteSkill(deleteskillReqObj){
//   return this.http.post("http://192.168.6.186:/obs/employeeskilldetails/set",deleteskillReqObj)
// }
// getSkilbyId(editskillReg){
//   return this.http.post("http://192.168.6.186:/obs/employeeskilldetails/get",editskillReg)
// }

//skill ends






// emp basic--------

getempinfo(basicempinfo){
  return this.http.post(this.host_url+"/obs/employeeInfo/get",basicempinfo);
}
saveempinfo(saveempobj){
  return this.http.post(this.host_url+"/obs/employeeInfo/set",saveempobj);
}
deleteempinfo(deleteempobj){
  return this.http.post(this.host_url+"/obs/employeeInfo/set",deleteempobj)
}
getbyIdempinfo(updateempobj){
  return this.http.post(this.host_url+"/obs/employeeInfo/get",updateempobj);
}
updateempinfo(updateempinfoobj){
  return this.http.post(this.host_url+"/obs/employeeInfo/set",updateempinfoobj);
}
getempstatus(statusempobj){
  return this.http.post(this.host_url+"/obs/EmployeeStatus/get",statusempobj);
}
getGenderinfo(getgenderobj){
  return this.http.post(this.host_url+"/master/genders/get",getgenderobj);
}
// emp basic ends ---------//


//----Employee Experience Details ------------http://192.168.6.186:
getEmployeeExperienceDetails(getEmpExperienceObj)
{
  
  return this.http.post(this.host_url+"/obs/EmployeeExperienceDetails/get",getEmpExperienceObj);
}

saveEmployeeExperienceDetails(setEmpExperienceObj)
{
  return this.http.post(this.host_url+"/obs/EmployeeExperienceDetails/set",setEmpExperienceObj);
}

editEmpExpDetails(editEmpExpobj)
{
  return this.http.post(this.host_url+"/obs/EmployeeExperienceDetails/get",editEmpExpobj);
}

updateEmployeeExperienceDetails(updateEmpExperienceObj)
{
  return this.http.post(this.host_url+"/obs/EmployeeExperienceDetails/set",updateEmpExperienceObj);
}

deleteEmployeeExperienceDetails(deleteEmpExperienceObj)
{
  return this.http.post(this.host_url+"/obs/EmployeeExperienceDetails/set",deleteEmpExperienceObj);
}

//----Employee Experience ends--------------



//----Employee KYE Details  Starts-----------

getEmployeeKyeDetails(getEmpkyeObj)
{
  return this.http.post(this.host_url+"/obs/kye/get",getEmpkyeObj);
}

saveEmployeeKyeDetails(saveEmpKyeObj)
{
  return this.http.post(this.host_url+"/obs/kye/set",saveEmpKyeObj);
}

editEmployeeKyeDetails(editkyeobj)
{
  return this.http.post(this.host_url+"/obs/kye/get",editkyeobj);
}

updateEmployeeKyeDetails(updatekyeobj)
{
  return this.http.post(this.host_url+"/obs/kye/set",updatekyeobj);
}

deleteEmployeeKyeDetails(deleteEmpKyeObj)
{
  return this.http.post(this.host_url+"/obs/kye/set",deleteEmpKyeObj);
}

 //----Employee KYE Ends------------


 
// //----Employee Title Details Starts----------

// getEmpTitleDetails(getEmptitleObj)
// {
//   return this.http.post("http://192.168.6.186:/obs/employeetitle/get",getEmptitleObj);
// }

// saveEmpTitleDetails(saveEmpTiltle)
// {
//   return this.http.post("http://192.168.6.186:/obs/employeetitle/set",saveEmpTiltle);
// }

// editEmpTitleDetails(editTitlebj)
// {
//   return this.http.post("http://192.168.6.186:/obs/employeetitle/get",editTitlebj);
// }

// updateEmpTitleDetails(updateTitleobj)
// {
//   return this.http.post("http://192.168.6.186:/obs/employeetitle/set",updateTitleobj);
// }

// deleteEmpTitleDetails(deleteEmpTitleObj)
// {
//   return this.http.post("http://192.168.6.186:/obs/employeetitle/set",deleteEmpTitleObj);
// }

//  //----Employee Title Ends------------



//  //----Employee Education starts------------

// getEmpEduDetails(getEmpEduObj)
// {
//   return this.http.post("http://192.168.6.186:/obs/employeeEducationDetails/get",getEmpEduObj);
// }

// saveEmpEduDetails(saveEmpEdu)
// {
//   return this.http.post("http://192.168.6.186:/obs/employeeEducationDetails/set",saveEmpEdu);
// }

// editEmpEduDetails(editEduobj)
// {
//   return this.http.post("http://192.168.6.186:/obs/employeeEducationDetails/get",editEduobj);
// }

// updateEmpEduDetails(updateEduobj)
// {
//   return this.http.post("http://192.168.6.186:/obs/employeeEducationDetails/set",updateEduobj);
// }

// deleteEmpEduDetails(deleteEmpEduObj)
// {
//   return this.http.post("http://192.168.6.186:/obs/employeeEducationDetails/set",deleteEmpEduObj);
// }

//  //----Employee Education Ends------------
 
 //start dependent details
getdependentdetails(dependentdetailsResobj){
  return this.http.post(this.host_url+"/obs/DependentDetailsService/get",dependentdetailsResobj);
}
savedependentdetails(saveddependentdetailsResObj){
  return this.http.post(this.host_url+"/obs/DependentDetailsService/set",saveddependentdetailsResObj);
}
deletedependentdetails(deletedependentdetailsResObj){
  return this.http.post(this.host_url+"/obs/DependentDetailsService/set",deletedependentdetailsResObj);
}
updatedependentdetails(updatedependentdetailsResObj){
  return this.http.post(this.host_url+"/obs/DependentDetailsService/set",updatedependentdetailsResObj);
}
//endsdependent details

//start bank deatils
getbankserverdetails(getbankdetailsResobj){
 return this.http.post(this.host_url+"/obs/BankDetails/get",getbankdetailsResobj);

}
savebankdetails(savebankdetailsResobj){
return this.http.post(this.host_url+"/obs/BankDetails/set",savebankdetailsResobj);


}
 deletebankdetails(deletebankdetailsResObj){
  return this.http.post(this.host_url+"/obs/BankDetails/set",deletebankdetailsResObj);
 }
 updatebankdetails(updatebankdetailsResObj){
   return this.http.post(this.host_url+"/obs/BankDetails/set",updatebankdetailsResObj);
 }
 //ends bank details
 //onboarding details stars
  getonboardingdetails(onboardingdetailsResObj){
  return this.http.post(this.host_url+"/obs/employmentDetails/get",onboardingdetailsResObj);
  }
  saveonboardingdetails(saveonboardingdetailsResObj){
  return this.http.post(this.host_url+"/obs/employmentDetails/set",saveonboardingdetailsResObj);
 }
 deleteOnboardingdetails(deleteOnboardingdetailsResObj){
   return this.http.post(this.host_url+"/obs/employmentDetails/set",deleteOnboardingdetailsResObj)
 }
 updateonboardingdetails( updateonboardingdetailsResObj){
   return this.http.post(this.host_url+"/obs/employmentDetails/set",updateonboardingdetailsResObj)
 }
 //onboarding details ends
 //project starts

getProjectDetails(projectReqObj){
  return this.http.post(this.host_url+"/obs/projectDetails/get",projectReqObj);
}
setProjectDetails(setProjectReqObj){
  return this.http.post(this.host_url+"/obs/projectDetails/set",setProjectReqObj);
}
getprojectbyId(projectbyid){
  return this.http.post(this.host_url+"/obs/projectDetails/get",projectbyid);
}
deleteproject(projdelete){
  return this.http.post(this.host_url+"/obs/projectDetails/set",projdelete);
}
updateproject(projupdate){
  return this.http.post(this.host_url+"/obs/projectDetails/set",projupdate);
} 
//project ends

//vishal services

//Employee Status Master API

getEmployeeStatusMaster(stateListReq){
  return this.http.post(this.host_url+"/master/EmployeeStatus/get",stateListReq);
}
updateEmployeeStatusMaster(updatestateListReq){
  return this.http.post(this.host_url+"/master/EmployeeStatus/set",updatestateListReq);
}

deleteEmployeeStatusMaster(deletetateListReq){
  return this.http.post(this.host_url+"/master/EmployeeStatus/set",deletetateListReq);
}

saveEmployeeStatusMaster(savestateListReq){
  return this.http.post(this.host_url+"/master/EmployeeStatus/set",savestateListReq);
}

//Employee Status Master API Ended



//Master API for StateList Started Working

getStateListMaster(stateListReq){
  return this.http.post(this.host_url+"/master/states/get",stateListReq);
}
updateStateListMaster(updatestateListReq){
  return this.http.post(this.host_url+"/master/states/set",updatestateListReq);
}

deleteStateListMaster(deletetateListReq){
  return this.http.post(this.host_url+"/master/states/set",deletetateListReq);
}

saveStateListMaster(savestateListReq){
  return this.http.post(this.host_url+"/master/states/set",savestateListReq);
}
//Master API for StateList Ended

 
//----Employee Title Details Starts----------

getEmpTitleDetails(getEmptitleObj)
{
  return this.http.post(this.host_url+"/obs/employeetitle/get",getEmptitleObj);
}

saveEmpTitleDetails(saveEmpTiltle)
{
  return this.http.post(this.host_url+"/obs/employeetitle/set",saveEmpTiltle);
}

editEmpTitleDetails(editTitlebj)
{
  return this.http.post(this.host_url+"/obs/employeetitle/get",editTitlebj);
}

updateEmpTitleDetails(updateTitleobj)
{
  return this.http.post(this.host_url+"/obs/employeetitle/set",updateTitleobj);
}

deleteEmpTitleDetails(deleteEmpTitleObj)
{
  return this.http.post(this.host_url+"/obs/employeetitle/set",deleteEmpTitleObj);
}

 //----Employee Title Ends------------



 //----Employee Education starts------------

getEmpEduDetails(getEmpEduObj)
{
  return this.http.post(this.host_url+"/obs/employeeEducationDetails/get",getEmpEduObj);
}

saveEmpEduDetails(saveEmpEdu)
{
  return this.http.post(this.host_url+"/obs/employeeEducationDetails/set",saveEmpEdu);
  //return this.http.post("http://localhost:8525/set",saveEmpEdu);
}

editEmpEduDetails(editEduobj)
{
  return this.http.post(this.host_url+"/obs/employeeEducationDetails/get",editEduobj);
}

updateEmpEduDetails(updateEduobj)
{
  return this.http.post(this.host_url+"/obs/employeeEducationDetails/set",updateEduobj);
}

deleteEmpEduDetails(deleteEmpEduObj)
{
  return this.http.post(this.host_url+"/obs/employeeEducationDetails/set",deleteEmpEduObj);
}
 //----Employee Education Ends------------

//Employee Education Master Data Start

getEmpEduQualification(getempQualification){
  return this.http.post(this.host_url+"/master/educationdetails/get",getempQualification);
}
saveEmpEducationalQualification(saveEmpQual){
  return this.http.post(this.host_url+"/master/educationdetails/set",saveEmpQual);
}
updateEmpEducationalQualification(updateEmpQual){
  return this.http.post(this.host_url+"/master/educationdetails/set",updateEmpQual);
}
deleteEmpEducationalQualification(deleteEmpQual){
  return this.http.post(this.host_url+"/master/educationdetails/set",deleteEmpQual);
}
//Employee Education Master Data End

//C:\Users\gphaneendra\Desktop\update_obs6\zuul-auth-ojas-parent\ui-parent\ui-web\src\main\web\src\app\home\businessunit

//Phani
 
 //-----Separation Starts------------------
 getSeperationType(getSeperationResObj)
 {
   return this.http.post(this.host_url+"/master/separationType/get",getSeperationResObj);
 }

 updateSeperationType(updateSeperationResObj)
 {
   return this.http.post(this.host_url+"/master/separationType/set",updateSeperationResObj);
 }

 saveSeperationType(saveSeperationResObj)
 {
  return this.http.post(this.host_url+"/master/separationType/set",saveSeperationResObj);
 }

 deleteSeperationType(deleteSeperationResObj)
 {
   return this.http.post(this.host_url+"/master/ojas-obs-online/separationType/set",deleteSeperationResObj);
 }

//-----Separation Ends------------------

  //--Resource type starts--------------


  getResourceType(resgetReqObj)
  {
    return this.http.post(this.host_url+"/master/resourceType/get",resgetReqObj);
  }
  setResourceType(ressaveReqObj)
  {
    return this.http.post(this.host_url+"/master/resourceType/set",ressaveReqObj);
  }
  updateResourceType(resupdateObj)
  {
    return this.http.post(this.host_url+"/master/resourceType/set",resupdateObj);
  }

  //--Resource type ends--------------


//--Resignation  


  getResignation(resgetReqObj)
  {
    return this.http.post(this.host_url+"/obs/resignation/get",resgetReqObj);
  }

  saveResignation(resgetReqObj)
  {
    return this.http.post(this.host_url+"/obs/resignation/set",resgetReqObj);
  }

  updateResignation(resgetReqObj)
  {
    return this.http.post(this.host_url+"/obs/resignation/set",resgetReqObj);
  }

  getByIdResignation(resgetReqObj)
  {
    return this.http.post(this.host_url+"/obs/resignation/get",resgetReqObj);
  }
  
  getByEmpIdResignation(resgetReqObj)
  {
    return this.http.post(this.host_url+"/obs/resignation/get",resgetReqObj);
  }

  //EmpReports
  getReportById(reqReport){
  return this.http.post(this.host_url+"8100/obs/empreports/get",reqReport);
}

//excl....
getExcelData(exceldata){
  return this.http.post(this.host_url+"8101/obs/report",exceldata);
}
//pdf....
getPdfData(exceldata){
  return this.http.post(this.host_url+"8101/obs/pdfreport",exceldata);
}

getAllservices(ReportReqObj){
  return this.http.post(this.host_url+"/obs/services/get",ReportReqObj);
  }



  
}


