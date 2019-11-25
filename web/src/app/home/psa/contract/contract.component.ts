import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PsaService } from '../psa.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import swal from 'sweetalert';
import { resolve } from 'q';



@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  hide = false;
  submitted = false;
  getAllcontractdata: any;
  contractAllDetails: any;
  savecontractdata: any;
  updatecontractdata: any;
  getbyidcontractdata: any;
  getbyidcontractres: any;
  getcontractId: any;
  updatecontractId: any;
  deletecontractId: any;
  deleteidcontractres: any;
  deleteidcontractdata: any;
  data: any[];
  customersdata: any;
  customersAllData: any;
  customerId: any
  createBtn: any = true
  servicetypelist: any;
  serviceTypeList: any;
  contractForm: FormGroup;
  pageSize = 5;
  deliveryLoclist: any;
  deleiveryData: any;
  cf: any;
  pick = true;
  files: any;
  filestring: string;
  status: any = false
  documenttype: any;
  documentstage: any;
  documenttypedata: any;
  contractcompanylist: any;
  documenttypelist1: any;
  contractcompanydata: any;
  cid: any;
  moreinfo = false;
  customerName: string;
  bdmconatctName: string;
  ServiceName: string;
  customerData: any;
  response: any;
  loggedUserName: any;
  comment: string = "Contract has been pending";
  approveResopnse: any;
  approveMessage: any;
  msg: any;
  role: boolean;
  roleEdit: boolean;
  roleStatus:boolean;
  constructor(private formBuilder: FormBuilder, private psa: PsaService, private toster: ToastrManager) {



    this.loggedUserName = localStorage.getItem("UserName");

    this.contractForm = this.formBuilder.group({
      selectCustomer: [''],
      contractName: ['', [Validators.required, Validators.pattern("[a-zA-Z]*")]],
      contractStartDate: ['', [Validators.required]],
      contractEndDate: ['', [Validators.required]],
      contractOwner: ['', [Validators.required, Validators.pattern("[a-zA-Z]*")]],
      contractValue: ['', [Validators.required, Validators.pattern("[0-9]*")]],
      serviceType: ['', [Validators.required]],
      deliveryLocation: ['', [Validators.required]],
      // createdBy: ['', [Validators.required, Validators.pattern("[a-zA-Z]*")]],
      contractCurrency: ['', [Validators.required, Validators.pattern("[0-9]*")]],
      executingCompany: ['', [Validators.required, Validators.pattern("[a-zA-Z]*")]],
      contractCompany: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      documentStage: ['', [Validators.required]],
      multilocationDelivery: ['', [Validators.required]],
      documentName: ['', [Validators.required]],
      contractDescription: ['']

    });

  }

  ngOnInit() {

    this.getContractAll();
    this.getAllCustomerData();
    this.getServiceTypeInfo();
    this.getdeliveryLocation();
    this.getDocument();
    this.getdocumenttype();
    this.getcomcontract();


    if (localStorage.getItem('Role') == "ROLE_BDM") {
      this.role = true;
    }
    if (localStorage.getItem('Role') == "ROLE_BDM" || localStorage.getItem('Role') == "ROLE_BUHEAD") {
      this.roleEdit = true;
    }
    if (localStorage.getItem('Role') == "ROLE_FINANCE") {
      this.roleStatus = true;
    }


  }
  customerid(customerid: any) {
    throw new Error("Method not implemented.");
  }
  private compareSelectValues(selectedValue, compareValue): boolean {
    return Number(selectedValue) === compareValue;
  }

  hidefunc() {
    this.status = true;
  }




  getContractAll() {
    this.data = []
    var contractdetails =
    {
      "customercontractdetailslist": [{

      }],
      "transactiontype": "getall"
    }

    this.psa.getAllContractdDetails(contractdetails).subscribe(res => {
      this.getAllcontractdata = res;
      this.contractAllDetails = this.getAllcontractdata.customercontractdetailslist;
      for (let i in this.contractAllDetails) {
        if (this.contractAllDetails[i].status == true) {
          this.data.push(this.contractAllDetails[i])
        }
      }
      console.log("contract get deatils ", this.contractAllDetails);
    })
  }

  // decimalFloating(v) {
  //   // debugger;
  //   var d = parseFloat(v);
  //   if (isNaN(d)) {
  //     v = '';
  //   } else {
  //     v = d.toFixed(2);

  //   }
  //   console.log(v);
  //   this.contractForm.controls['contractValue'].setValue(v);
  // }

  fileSelected(event) {
    this.files = event.target.files;
    var reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.files[0]);
  }
  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.filestring = btoa(binaryString);  // Converting binary string data.
    console.log("Contract File Data : ", this.filestring);

  }

  saveContract() {
    var date = new Date();

    var savereq =
    {
      "customercontractdetailslist": [{
        "customerid": this.contractForm.value.selectCustomer,
        "contractname": this.contractForm.value.contractName,
        "description": this.contractForm.value.contractDescription,
        "startdate": this.contractForm.value.contractStartDate,
        "enddate": this.contractForm.value.contractEndDate,
        "servicetype": this.contractForm.value.serviceType,
        "deliverylocation": this.contractForm.value.deliveryLocation,
        "createdby": this.loggedUserName,
        "contractvalue": this.contractForm.value.contractValue,
        "contractowner": this.contractForm.value.contractOwner,
        "status": true,
        "contractcurrency": this.contractForm.value.contractCurrency,
        "executingcompany": this.contractForm.value.executingCompany,
        "contractcompany": this.contractForm.value.contractCompany,
        "documenttype": this.contractForm.value.documentType,
        "documentstage": this.contractForm.value.documentStage,
        "multilocationdelivery": this.contractForm.value.multilocationDelivery,
        "document": this.filestring,
        "contractStatus": "pending",
        "updatedBy": this.loggedUserName,
        "createdDate": date,
        "updatedDate": date,
        "comment": this.comment

      }],
      "transactiontype": "save"
    }
    let msg: any;
    console.log("save request contract obj", savereq);
    this.psa.saveContractdDetails(savereq).subscribe(res => {
      this.savecontractdata = res;
      msg = this.savecontractdata;
      //console.log("msg",msg);

      this.toster.successToastr(msg.message, 'success', {
        showCloseButton: true,
        animate: 'slideFromRight'
      })



      // swal(this.savecontractdata.message, "", "success");
      this.getContractAll();
    },
      err => {
        console.log(err)
        msg = err
        this.toster.infoToastr(msg.error.error, 'info', {
          showCloseButton: true,
          animate: 'slideFromRight'
        })
      });
  }


  updateContract(id, formdata, custid) {

    console.log(id);
    console.log(formdata);
    var date = new Date();

    var updatereq =
    {
      "customercontractdetailslist": [{
        "customerid": custid,
        "contractid": id,
        "contractname": formdata.contractName,
        "description": formdata.contractDescription,
        "startdate": formdata.contractStartDate,
        "enddate": formdata.contractEndDate,
        "servicetype": formdata.serviceType,
        "deliverylocation": formdata.deliveryLocation,
        "createdby": this.loggedUserName,
        "contractvalue": formdata.contractValue,
        "contractowner": formdata.contractOwner,
        "status": true,
        "contractcurrency": formdata.contractCurrency,
        "executingcompany": formdata.executingCompany,
        "contractcompany": formdata.contractCompany,
        "documenttype": formdata.documentType,
        "documentstage": formdata.documentStage,
        "multilocationdelivery": formdata.multilocationDelivery,
        "document": this.filestring,
        "contractStatus": "pending",
        "updatedBy": this.loggedUserName,
        "createdDate": date,
        "updatedDate": date,
        "comment": this.comment
      }],
      "transactiontype": "update"
    }
    let msg: any;
    console.log("update request contract obj", updatereq);

    this.psa.updateContractdDetails(updatereq).subscribe(res => {
      this.updatecontractdata = res;
      msg = this.updatecontractdata;

      this.toster.successToastr(msg.message, 'success', {
        showCloseButton: true,
        animate: 'slideFromRight'
      })
      // swal(this.updatecontractdata.message, "", "success");
      this.getContractAll();
    },
      err => {
        console.log(err)
        msg = err
        this.toster.infoToastr(msg.error.error, 'info', {
          showCloseButton: true,
          animate: 'slideFromRight'
        })
      });

  }


  getByIdContract(getconid, e) {
    console.log("get customer from html", e)
    this.getcontractId = getconid;
    this.cid = e
    console.log("id value", this.getcontractId);

    var getbyidreq = {
      "customercontractdetailslist": [{

        "contractid": this.getcontractId

      }],
      "transactiontype": "getbyid"
    }
    this.moreinfo = true;
    this.psa.getByIdContractdDetails(getbyidreq).subscribe(res => {
      this.getbyidcontractres = res;
      this.getbyidcontractdata = this.getbyidcontractres.customercontractdetailslist;
      console.log("getbyid request contract obj", this.getbyidcontractdata);
    })
  }

  edit() {
    this.contractForm.controls.contractName.setValue(this.getbyidcontractdata[0].contractname)
    // this.contractForm.controls.contractStartDate.setValue(this.getbyidcontractdata[0].startdate)
    // this.contractForm.controls.contractEndDate.setValue(this.getbyidcontractdata[0].enddate)
    this.contractForm.controls.contractStartDate.setValue(this.formatDate(new Date(this.getbyidcontractdata[0].startdate)))
    this.contractForm.controls.contractEndDate.setValue(this.formatDate(new Date(this.getbyidcontractdata[0].enddate)))
    this.contractForm.controls.contractOwner.setValue(this.getbyidcontractdata[0].contractowner)
    this.contractForm.controls.contractOwner.setValue(this.getbyidcontractdata[0].contractowner)
    this.contractForm.controls.contractValue.setValue(this.getbyidcontractdata[0].contractvalue)
    this.contractForm.controls.serviceType.setValue(this.getbyidcontractdata[0].servicetype)
    this.contractForm.controls.deliveryLocation.setValue(this.getbyidcontractdata[0].deliverylocation)
    // this.contractForm.controls.createdBy.setValue(this.getbyidcontractdata[0].createdby)
    this.contractForm.controls.contractDescription.setValue(this.getbyidcontractdata[0].description)
    this.contractForm.controls.contractCurrency.setValue(this.getbyidcontractdata[0].contractcurrency)
    this.contractForm.controls.executingCompany.setValue(this.getbyidcontractdata[0].executingcompany)
    this.contractForm.controls.contractCompany.setValue(this.getbyidcontractdata[0].contractcompany)
    this.contractForm.controls.documentType.setValue(this.getbyidcontractdata[0].documenttype)
    this.contractForm.controls.documentStage.setValue(this.getbyidcontractdata[0].documentstage)
    this.contractForm.controls.multilocationDelivery.setValue(this.getbyidcontractdata[0].multilocationdelivery)
    this.contractForm.controls.documentName.setValue(this.getbyidcontractdata[0].document)
    // this.contractForm.controls.contractDescription.setValue(this.getbyidcontractdata[0].description)

  } 

  downloadFile(doc) {
    var filepdf = doc;
    let pdfdata = 'data:application/pdf;base64,'+ filepdf;
    // console.log("File Data ", pdfdata);
    let downloadLink = document.createElement('a');
    downloadLink.href = pdfdata;
    downloadLink.download = 'Contract Documents '; // here file name
    downloadLink.click();

  } 


  deleteContract(deleteconid) {

    console.log("id value", deleteconid);

    var deletereq = {
      "customercontractdetailslist": [
        {

          "contractid": deleteconid

        }],
      "transactiontype": "delete"
    }
    let msg;

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

          this.psa.deleteContractdDetails(deletereq).subscribe(res => {
            this.deleteidcontractdata = res;
            msg = this.deleteidcontractdata

            this.toster.successToastr(msg.message, 'success', {
              showCloseButton: true,
              animate: 'slideFromRight'
            })

            console.log("delete request contract obj", this.deleteidcontractdata);
            // swal(this.deleteidcontractdata.message, "", "success");
            this.getContractAll();
          }
            , err => {
              console.log(err)
              msg = err
              this.toster.infoToastr(msg.error.error, 'info', {
                showCloseButton: true,
                animate: 'slideFromRight'
              })
            });

        }
        else {
          this.toster.errorToastr('You can not delete saved data', 'Error', {
            animate: 'slideFromRight',
            showCloseButton: true,
          });
        }
      });

  }

  formatDate(date) {
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 101).toString().substring(1);
    var day = (date.getDate() + 100).toString().substring(1);
    return year + "-" + month + "-" + day;
  }


  // Customer Details
  getAllCustomerData() {

    var getcustomerreq =     {
      "customerList":
      {

      },
      "transactionType": "getall"
    }

    this.psa.getallListiofCustomer(getcustomerreq).subscribe(res => {
      this.customersdata = res;
      this.customersAllData = this.customersdata.customerList;
      console.log("customers data", this.customersdata);

    })

  }

  selectedItem(e) {
    this.customerId = e

    // this.createBtn = false
    this.status = true
    console.log("selected customer", this.customerId)
    this.getCustomerDataById(this.customerId);


  }
  // getCustomerDataById(customerId: any) {
  //   throw new Error("Method not implemented.");
  // }


  getCustomerDataById(customerid) {

    var request =
    {
      "customerList":
      {
        "customerId": customerid

      },



      "transactionType": "getbyid"
    }
    console.log("customer request", request);

    this.psa.getIdCustomer(request).subscribe(res => {
      console.log(res, "getByidcustomer")
      this.response = res;
      console.log(this.response.customerList, "response mesage");
      console.log(this.response.customerList[0].customerName, "response mesage");
      console.log(this.response.customerList[0].billinginfo.bdmconatctName, "bdm name");

      this.customerName = this.response.customerList[0].customerName;
      console.log('customer name', this.customerName);

      this.customerData = this.response.customerList[0];
      this.bdmconatctName = this.response.customerList[0].billinginfo.bdmconatctName;
      for (var i = 0; i < this.serviceTypeList.length; i++) {
        if (this.customerData.servicetype[0].servicetypeid == this.serviceTypeList[i].id) {
          this.ServiceName = this.serviceTypeList[i].serviceType
        }


      }
      //  var qua = this.customerList.find(q => q.id == this.table_data[i].qualification)
      //         this.table_data[i].qualification=qua.educationType

    })
  }


  clear() {

    this.customerId = "";
    this.customerName = "";
    this.bdmconatctName = "";
    this.ServiceName = "";

    this.status = false


  }

  //end

  // Servicetype master 
  //  getall

  getServiceTypeInfo() {

    var Requestdata = {
      "servicetypeList": [{

      }],
      "transactionType": "getall"
    }
    this.psa.getservicetype(Requestdata).subscribe(res => {
      this.servicetypelist = res;
      this.serviceTypeList = this.servicetypelist.servicetypeList;
      console.log("Get servicetype data", this.serviceTypeList)
      // this.serviceTypeAssign=this.servicetypelist.servicetypeList;
    })
  }


  // end


  // Delivery Location master
  //getall
  getdeliveryLocation() {

    var Requestdata = {
      "deliverylocationList": [{

      }],
      "transactionType": "getall"
    }

    this.psa.getdeliverylocation(Requestdata).subscribe(res => {
      this.deliveryLoclist = res;
      this.deleiveryData = this.deliveryLoclist.deliverylocationList;
      console.log("Get deleiverylocation data", this.deleiveryData)

    })

  }
  //end

  // Document Stage Master

  getDocument() {
    console.log("getDocument called");

    var Requestdata = {
      "doucumentStageList": [{

      }],
      "transactionType": "getall"
    }

    this.psa.getDocument(Requestdata).subscribe(responce => {
      this.documenttype = responce;
      this.documentstage = this.documenttype.doucumentStageList;
      console.log("Get Document Statge Data", this.documentstage)
    })
  }
  //end

  // Document Type master

  getdocumenttype() {

    var Requestdata = {

      "documenttypelist": [{

      }],
      "transactionType": "getall"
    }

    this.psa.getDocument_Type(Requestdata).subscribe(res => {
      this.documenttypelist1 = res;
      this.documenttypedata = this.documenttypelist1.documenttypelist;
      console.log("Get Document Type Data", this.documenttypedata)
    })

  }
  //end

  // Contract company master
  getcomcontract() {

    var comconreq = {
      "companyList": [{

      }],
      "transactionType": "getall"
    }
    this.psa.getcomcon(comconreq).subscribe(res => {
      this.contractcompanydata = res;
      this.contractcompanylist = this.contractcompanydata.comapnayList;
      console.log("Contract company data", this.contractcompanylist);

    })

  }
  //end




  //aprove
  approve() {
    var data = {
      "customercontractdetailslist": [
        {

          "contractid": this.getbyidcontractdata[0].contractid,
          "contractStatus": "approved",
          "updatedBy": this.loggedUserName,
          "comment": "Contract has been Approved"


        }],
      "transactiontype": "statusupdate"
    }



    swal({
      title: "Are you sure?",
      text: "Want to approve the project",
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    })
      .then((proceed) => {
        if (proceed) {

          this.psa.saveContractdDetails(data).subscribe(response => {
            console.log("approve", response);
            this.approveResopnse = response;
            this.approveMessage = this.approveResopnse.message;

            this.toster.successToastr(this.approveMessage, 'success', {
              showCloseButton: true,
              animate: 'slideFromRight'
            })
            this.getByIdContract(this.getbyidcontractdata[0].contractid, this.getbyidcontractdata[0].customerid);


          }, err => {
            console.log(err)
            this.msg = err
            this.toster.infoToastr(this.msg.error.message, 'info', {
              showCloseButton: true,
              animate: 'slideFromRight'
            })
          });

        }
        else {
          this.toster.errorToastr('You did not approve project', 'Error', {
            animate: 'slideFromRight',
            showCloseButton: true,
          });
        }
      });

  }


  //reject

  reject(cmnt) {
    var data = {
      "customercontractdetailslist": [
        {

          "contractid": this.getbyidcontractdata[0].contractid,
          "contractStatus": "rejected",
          "updatedBy": this.loggedUserName,
          "comment": cmnt.comments

        }],
      "transactiontype": "statusupdate"
    }
    console.log("res", data);

    swal({
      title: "Are you sure?",
      text: "Want to reject the project",

      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    })
      .then((proceed) => {
        if (proceed) {

          this.psa.saveContractdDetails(data).subscribe(response => {
            console.log("reject", response);
            this.approveResopnse = response;
            this.approveMessage = this.approveResopnse.message;

            this.toster.successToastr(this.approveMessage, 'success', {
              showCloseButton: true,
              animate: 'slideFromRight'
            })
            this.getByIdContract(this.getbyidcontractdata[0].contractid, this.getbyidcontractdata[0].customerid);

          }, err => {
            console.log(err)
            this.msg = err
            this.toster.infoToastr(this.msg.error.message, 'error', {
              showCloseButton: true,
              animate: 'slideFromRight'
            })
          });

        }
        else {
          this.toster.errorToastr('You did not reject project', 'info', {
            animate: 'slideFromRight',
            showCloseButton: true,
          });
        }
      });
  }


}
