import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PsaService } from '../psa.service';
import { HrmsService } from '../../services/hrms.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import swal from 'sweetalert';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-contact-psa',
  templateUrl: './contact-psa.component.html',
  styleUrls: ['./contact-psa.component.scss']
})
export class ContactPSAComponent implements OnInit {

  StateList: any;

  constructor(private fb: FormBuilder, private ser: PsaService, private hrms: HrmsService, private toaster: ToastrManager) { 
    this.getDesignation()
    this.getStateListData()
  }

  ngOnInit() {
   
    this.getAllCustomerContactInfos()
    this.getAllCustomerData();
   
  }

  //boolean variables
  createBtn: any = true
  //variables
  empDesignationlist: any;

  customerId: any
  contactId: any
  data: any=[];
  cid: any;
  status = false;
  private pageSize: number = 5;
  table_heading:any;
  customersdata:any;
  customersAllData :any;
  

  contactForm = this.fb.group({

    contactName: ['', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z ]*$')])],
    contactPersonalEmail: ['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    contactOfficialEmail: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(ojas-it)\.com$')]],
    contactDesignation: ['', Validators.required],
    contactDepartment: ['', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z ]*$')])],
    contactMobileNo: ['', Validators.compose([Validators.required,Validators.pattern('[6-9]\\d{9}')])],
    alternateMobileNo: ['',Validators.compose([Validators.required,Validators.pattern('[6-9]\\d{9}')])],
    dob: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]{1,2}/[0-9]{1,2}$')])],
    anniversary: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]{1,2}/[0-9]{1,2}$')])],
    bdm: ['', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z ]*$')])],
    address1: ['', Validators.required],
    address2: ['', Validators.required],
    address3: ['', Validators.required],
    pincode: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]],
    state: ['', Validators.required]
  })




  getAllCustomerContactInfos() {
    this.data = []
    var getallReq = {
      "customerContactInfo": [{

      }],
      "transactionType": "getall"
    }
    let response
    let con
    this.ser.getCustomerContactInfo(getallReq).subscribe(res => {
      console.log("getAll", res)
      response = res
      con = response.customerContactInfoList
      console.log("con", con)
      for (let i in con) {
        if (con[i].status == true) {
          var state=this.StateList.find(s=> s.id==con[i].state)
          con[i].state=state.stateName
          var des=this.empDesignationlist.find(d=>d.id==con[i].designation)
          con[i].designation=des.designation
          this.data.push(con[i])
          console.log("pushed")
        }
      }
     
    })
  }



  saveCustomerContactInfo(contactInfo) {
    console.log("contactInfo", contactInfo)

    var contactReqObj =
    {
      "customerContactInfo": [{
        "customerId": this.customerId,
        "contactName": contactInfo.contactName,
        "designation": contactInfo.contactDesignation,
        "department": contactInfo.contactDepartment,
        "permanentMobileNumber": contactInfo.contactMobileNo,
        "alternateMobileNumber": contactInfo.alternateMobileNo,
        "personalEmail": contactInfo.contactPersonalEmail,
        "officialEmail": contactInfo.contactOfficialEmail,
        "dob": contactInfo.dob,
        "doa": contactInfo.anniversary,
        "bdm": contactInfo.bdm,
        "state": contactInfo.state,
        "pincode": contactInfo.pincode,
        "address1": contactInfo.address1,
        "address2": contactInfo.address2,
        "address3": contactInfo.address3,
        "status": true

      }],
      "transactionType": "save"
    }


    console.log("contactReqObj", contactReqObj);
    let msg
    this.ser.saveCustomerContactInfo(contactReqObj).subscribe(res => {
      console.log(res)
      msg = res
      this.toaster.successToastr(msg.message, 'success', {
        showCloseButton: true,
        animate: 'slideFromRight'
      })
      this.getAllCustomerContactInfos();
    })
  }


  selectedCustomer(e) {
    console.log(e)
    this.customerId = e
    this.createBtn = false
    this.status = true
  }

  getDesignation() {
    var request = {
      "designation": [

      ],
      "sessionId": "3121",
      "transactionType": "getall"
    }
    let empDesignationDetails
    this.hrms.getEmployeeDesignation(request).subscribe(res => {
      empDesignationDetails = res;
      this.empDesignationlist = empDesignationDetails.listDesignation;
      console.log("emp designatoin", this.empDesignationlist);
    })

  }

  getStateListData() {
    var request = {

      "states":
        [],

      "sessionId": "1234",
      "transactionType": "getAll"

    }
    var StateDetails
    this.hrms.getStateListMaster(request).subscribe(res => {
      StateDetails = res;
      console.log("ststelistgetAllsdff", StateDetails);
      this.StateList = StateDetails.statesList;
      console.log("ststelistgetAll", this.StateList);
    })
  }

    // Customer Details
    getAllCustomerData() {

      var getcustomerreq = {
        "customerList": {
  
        },
  
        "transactionType": "getAll"
      }
  
      this.ser.getAllCustomerId(getcustomerreq).subscribe(res => {
        this.customersdata = res;
        this.customersAllData = this.customersdata.customerList;
        console.log("customers data", this.customersdata);
  
      })
  
    }




  selectedId(id) {
    console.log(id)

    this.contactId = id;
    var editByid = {
      "customerContactInfo": [{

        "contactId": id


      }],
      "transactionType": "getbyid"
    }

    let contactData
    this.ser.editCustomerContactInfoById(editByid).subscribe(res=>{
      console.log(res)
      contactData=res
      this.contactForm.controls.contactName.setValue(contactData.customerContactInfoList[0].contactName)
      this.contactForm.controls.contactPersonalEmail.setValue(contactData.customerContactInfoList[0].personalEmail)
      this.contactForm.controls.contactOfficialEmail.setValue(contactData.customerContactInfoList[0].officialEmail)
      this.contactForm.controls.contactDesignation.setValue(contactData.customerContactInfoList[0].designation)
      this.contactForm.controls.contactDepartment.setValue(contactData.customerContactInfoList[0].department)
      this.contactForm.controls.contactMobileNo.setValue(contactData.customerContactInfoList[0].permanentMobileNumber)
      this.contactForm.controls.alternateMobileNo.setValue(contactData.customerContactInfoList[0].alternateMobileNumber)
      this.contactForm.controls.dob.setValue(contactData.customerContactInfoList[0].dob)
      this.contactForm.controls.anniversary.setValue(contactData.customerContactInfoList[0].doa)
      this.contactForm.controls.bdm.setValue(contactData.customerContactInfoList[0].bdm)
      this.contactForm.controls.state.setValue(contactData.customerContactInfoList[0].state)
      this.contactForm.controls.pincode.setValue(contactData.customerContactInfoList[0].pincode)
      this.contactForm.controls.address1.setValue(contactData.customerContactInfoList[0].address1)
      this.contactForm.controls.address2.setValue(contactData.customerContactInfoList[0].address2)
      this.contactForm.controls.address3.setValue(contactData.customerContactInfoList[0].address3)
      this.cid = contactData.customerContactInfoList[0].customerId
    })
  }

  updateCustomerContactInfo(e) {

    var updatecontact = {

      "customerContactInfo": [{

        "contactId": this.contactId,
        "customerId": this.cid,
        "contactName": e.contactName,
        "designation": e.contactDesignation,
        "department": e.contactDepartment,
        "permanentMobileNumber": e.contactMobileNo,
        "alternateMobileNumber": e.alternateMobileNo,
        "personalEmail": e.contactPersonalEmail,
        "officialEmail": e.contactOfficialEmail,
        "bdm": e.bdm,
        "dob": e.dob,
        "doa": e.anniversary,
        "state": e.state,
        "pincode": e.pincode,
        "address1": e.address1,
        "address2": e.address2,
        "address3": e.address3,
        "status": true



      }],
      "transactionType": "update"
    }
    let msg
    this.ser.updateCustomerContactInfo(updatecontact).subscribe(res => {
      console.log(res)
      msg = res
      this.toaster.successToastr(msg.message, 'success', {
        showCloseButton: true,
        animate: 'slideFromRight'
      })
      this.contactForm.reset()
      this.getAllCustomerContactInfos();
    })

  }


  deleteContactInfo(e) {
    console.log('id',e)
    var deleteContact = {
      "customerContactInfo": [{

        "contactId": e.contactId,


        "status": false


      }],
      "transactionType": "delete"
    }
    let msg
    console.log("deleteContact",deleteContact);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this activity!",
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.ser.deleteContactInfo(deleteContact).subscribe(res => {
            console.log(res)
            msg = res
            this.toaster.successToastr(msg.message, 'success', {
              showCloseButton: true,
              animate: 'slideFromRight'
            })
            this.getAllCustomerContactInfos();
      
      
          }, err => {
            console.log(err)
            msg = err
            this.toaster.infoToastr(msg.error.error, 'info', {
              showCloseButton: true,
              animate: 'slideFromRight'
            })
          })
        }
      });
   
  }


  number($event) {
    console.log($event)
    var key = $event.keyCode
    if (key >= 48 && key <= 57) {
      return true
    } else
      return false
  }


  download_pdf() {
    const doc = new jsPDF();
    doc.autoTable({
      head: [this.table_heading],
    })

    doc.autoTable({
      html: '#my_table',
      body: [{ halign: 'center' }],
    });
    doc.save('table.pdf');
  }
}
