import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl, ValidatorFn, FormGroup } from '@angular/forms';
import { PsaService } from '../psa.service';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import swal from 'sweetalert';
import { Observable } from 'rxjs';
import { HrmsService } from '../../services/hrms.service';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})


export class CustomerComponent implements OnInit {

  status1: boolean;
  modalStatus: boolean;
  sta;
  arrayControl;
  remove: boolean;
  removecount;
  removecount1;
  c: any;
  cc: any;
  kk: any;
  stam: boolean;
  gststatus: any;
  customerData: any;
  customerarray = [];
  tablearray: void;
  seviceType: any;
  serviceTypeAssign: any;
  sezType: any;
  sezAssign: any;
  sezt: any;
  statedata: any;
  statelistall: any;
  citydata: any;
  cityarray: any;
  customerid: any;
  customerstatus: any;
  gstid: any;
  gstupdatestatus: number;
  addressstatus1: any;
  addressstatus2: any;
  contactId: any;
  contactinfostatus: any;
  contactinfoupstatus: any;
  updatecontactName: any;
  billinginfostatus: any;
  billingId: any;
  billinginfoupstatus: any;
  updatecustomerarrayupdate: any;
  updatedservicetype: any;
  sezstatus: boolean = false;
  gststatusupdation: number;
  gstarray: any;
  gstarrayList: any;
  lengthoftable: any;
  billingaddarr: any;
  finalarray: any;
  servicetypeidset: any;
  modalremovecount: any;
  updateid: any;
  msgdelete: any;
  msg: any;
  customerresarrayupdate: any;
  customerarray1: any = [];
  updatecustomerarray1: any;
  geoRegion: any;
  geodata: any;
  countryarr: any;
  countryarrall: any
  countryall=[];
  gstl: any = []
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  myControl1 = new FormControl();
  filteredOptions1: Observable<string[]>;
  pages:any=5;
  bc:any=0;
  sc:any=0;
  setcountry: any;
  constructor(private fb: FormBuilder, private service: PsaService, private http: HttpClient, private toastr: ToastrManager,private hrms:HrmsService) {
    this.getServiceType();

    this.getGstLocation();
    this.getLocationList();
    this.getcitylocation();
    this.getRegionList();
    this.getCountry();



  }


  ngOnInit() {

    this.getCustomerData();



  }

  serviceList: string[] = ['It Services', 'subcon', 'Perm']

  status: boolean = false;


  CustomerForm = this.fb.group({

    customerName: ['', Validators.required],
    services: ['', Validators.required],
    regaddstate: ['', Validators.required],
    regaddcity: ['', Validators.required],
    regaddpincode: ['', Validators.compose([
      Validators.required,
      Validators.pattern('[0-9]{6}$')
    ])],
    TAN: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[A-Z]{4}[0-9]{5}[A-Z]{1}$')
    ])],
    PAN: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')
    ])],
    geo: ['', Validators.required],
    country: ['', Validators.required],

    billingAddress: this.fb.array([
      this.fb.group({


        Address1: ['', Validators.required],
        Address2: ['',],
        Pincode: ['', Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]{6}$')
        ])],
        City: ['', Validators.required],
        State: ['', Validators.required],
        billingdefault: [],

      })
    ]),
    ShippingingAddress: this.fb.array([
      this.fb.group({

        Address1: ['', Validators.required],
        Address2: ['',],
        Pincode: ['', Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]{6}$')
        ])],
        City: ['', Validators.required],
        State: ['', Validators.required],
        shippingdefault: [],
        SEZ: ['', Validators.required],
        gstLocation: ['', Validators.required],
      })
    ]),
    SEZ: ['', Validators.required],
    GST: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z0-9]{2}[A-Z0-9]{2}$')
      
    ])],
    gstLocation: ['', Validators.required],

    ApContactName: ['', Validators.required],
    Email: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
    ])],
    APPhoneNumber: ['', Validators.compose([
      Validators.required,
      Validators.pattern('[6789][0-9]{9}$')
    ])],
    Tds: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'), Validators.maxLength(5)
    ])],
    BdmContactName: ['', Validators.required],
    BdmMail: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
    ])],
    AmName: ['', Validators.required],
    AmMailID: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
    ])]


  })


  addingBillingAddress() {
    this.status = true;
    (this.CustomerForm.get('billingAddress') as FormArray).push(this.fb.group({

      Address1: ['', Validators.required],
      Address2: ['',],
      Pincode: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      billingdefault: [],
      // SEZ: ['', Validators.required],
      // gstLocation: ['', Validators.required],

    }))
    this.getI();


  }
  addingshippingingAddress() {
    this.status1 = true;
    (this.CustomerForm.get('ShippingingAddress') as FormArray).push(this.fb.group({

      Address1: ['', Validators.required],
      Address2: [],
      Pincode: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      shippingdefault: [],
      SEZ: ['', Validators.required],
      gstLocation: ['', Validators.required],




    }))
  }


  removingBillingAddress(a) {
    console.log(a, "this is from Billing id")
    this.c = a;
    (this.CustomerForm.get('billingAddress') as FormArray).removeAt(a)

    this.removecount = this.CustomerForm.controls.billingAddress.value.length
    this.disable();

  }
  removingShippingAddress(b) {
    console.log(b, "this is from Shipping id")
    // console.log(b,"this is from the removing shipping address")

    this.cc = b;
    (this.CustomerForm.get('ShippingingAddress') as FormArray).removeAt(b)
    this.disable1();
    if (this.cc <= 1) {
      this.status1 = false
    }
    else
      this.status1 = true

  }

  createCustomer(a) {

    console.log(a, "this is from form array")
    var today = this.formatDate(new Date())
    var addresslist = [];
    var addressList1 = [];
    var servicelist = [];
    var sc=0;
    var bc=0;
    for (let i in a.services) {
      var ser =
      {

        "servicetypeid": a.services[i],
        "servicestatus": "true"
      }
      servicelist.push(ser)
    }
    for (let i in a.ShippingingAddress) {
      if(Number(a.ShippingingAddress[i].shippingdefault)==1){
        sc++;
      }
      let shipping = {
        "shippingaddressLine1": a.ShippingingAddress[i].Address1,
        "shippingaddressLine2": a.ShippingingAddress[i].Address2,
        "pincode": Number(a.ShippingingAddress[i].Pincode),
        "citylocation": a.ShippingingAddress[i].City,
        "stateslocation": a.ShippingingAddress[i].State,
        "defaultaddressstatus": Number(a.ShippingingAddress[i].shippingdefault),
        "issez": Number(a.ShippingingAddress[i].SEZ),
        "gstlocation": a.ShippingingAddress[i].gstLocation,
        "status": 1
      }
      addresslist.push(shipping)
    }
    for (let i in a.billingAddress) {
      if(Number(a.billingAddress[i].billingdefault)==1){
        bc++;
      }
      let one = {
        "billingaddressLine1": a.billingAddress[i].Address1,
        "billingaddressLine2": a.billingAddress[i].Address2,
        "pincode": Number(a.billingAddress[i].Pincode),
        "citylocation": a.billingAddress[i].City,
        "stateslocation": a.billingAddress[i].State,
        "defaultaddressstatus": Number(a.billingAddress[i].billingdefault),
        "status": 1
      }
      addressList1.push(one)
    }




    console.log(addresslist, "this is form data")
    var getGstLocation = this.gstarrayList.find(s => s.gstcode == a.gstLocation);
    a.gstLocation = getGstLocation.gstlocationName;
    console.log(getGstLocation.gstlocation, "sfghj")


    var request = {
      "customerList":
      {

        "customerName": a.customerName,
        "tds": a.Tds,
        "customerstatus": 1,
        "pannumber": a.PAN,
        "tannumber": a.TAN,
        "geolocations": a.geo,
        "countries": a.country,
        'createdby': a.BdmContactName,
        'createddate': today,
        "mailstatus": "pending",
      },
      "customergstList":
      {

        "location": a.gstLocation,
        "gst": 1,
        "gstnumber": a.GST,
        "issez": Number(a.SEZ),
        "customergststatus": 1

      },
      "shippingaddressList": addresslist,
      "billingaddressList": addressList1,
      "contactinfoList":
      {

        "contactName": "CTS",
        "contactinfostatus": 1

      },
      "billinginfoList":
      {

        "apcontactName": a.ApContactName,
        "apEmail": a.Email,
        "phoneNumber": a.APPhoneNumber,
        "bdmconatctName": a.BdmContactName,
        "bdmEmail": a.BdmMail,
        "amconatctName": a.AmName,
        "amEmail": a.AmMailID,
        "billinginfostatus": 1

      },
      "registeredaddress":
      {
        "citylocation": a.regaddcity,
        "stateslocation": a.regaddstate,
        "registeredpincode": Number(a.regaddpincode),
        "status": "true"
      },
      "servicetype": servicelist,
      "transactionType": "save"
    }
    console.log(request, "this is for save")
    console.log(a, "this is form")
    let msg;
    if((this.bc>0 && this.sc<2) && (this.sc>0 && this.sc<2)){
      this.service.saveCustomerDetails(request).subscribe(res => {
        console.log(res, "this is res of formdata")
        this.getCustomerData();
        this.CustomerForm.reset();
        msg = res
        this.toastr.successToastr(msg.message, 'Success', {
          showCloseButton: true,
          animate: 'slideFromRight'
        })
      }, err => {
        this.toastr.infoToastr('Customer not created', 'Info', {
          showCloseButton: true,
          animate: 'slideFromRight'
        })
      })
    }else{
      this.toastr.infoToastr("Please select atleast one shipping and billing address as deafult","Info",{
        showCloseButton: true,
        animate: 'slideFromRight'
      })
    } 
  }

  selecteddata(id) {
    console.log("form", this.ModalCusForm)

    let updatecustomerarray;

    this.updateid = id;
    let c;
    let c1;
    var request =
    {
      "customerList":
      {
        "customerId": id

      },



      "transactionType": "getById"
    }

    this.service.getByIDListofCustomer(request).subscribe(resp => {
      console.log(resp, "this is get by id")

      updatecustomerarray = resp;
      this.updatecustomerarray1 = updatecustomerarray.customerList
      this.updatecustomerarrayupdate = this.updatecustomerarray1;
      console.log(this.updatecustomerarray1, "this is responnse")

      console.log("before setting form", this.ModalCusForm)
      let statetype = this.statelistall.find(state => state.id = this.updatecustomerarrayupdate[0].registeredaddress.stateslocation)
      this.updatecustomerarrayupdate[0].registeredaddress.stateslocation = statetype.stateName
      for (let i in this.updatecustomerarrayupdate) {

        for (let j in this.updatecustomerarrayupdate[i].shippingaddress) {
          let statetype = this.statelistall.find(state => state.id = this.updatecustomerarrayupdate[i].shippingaddress[j].stateslocation)
          this.updatecustomerarrayupdate[i].shippingaddress[j].stateslocation = statetype.stateName
        }

      }
      for (let i in this.updatecustomerarrayupdate) {

        for (let j in this.updatecustomerarrayupdate[i].billingaddress) {
          let statetype = this.statelistall.find(state => state.id = this.updatecustomerarrayupdate[i].billingaddress[j].stateslocation)
          this.updatecustomerarrayupdate[i].billingaddress[j].stateslocation = statetype.stateName
        }
      }
    })
  }


  edit() {
    this.clearmodalform()
    this.bc=1
    this.sc=1
    console.log("form", this.ModalCusForm)
    var ser = []
    var serid = []
    var serstatus = []
    this.ModalCusForm.controls.customerName.setValue(this.updatecustomerarray1[0].customerName)
    for (let i in this.updatecustomerarray1[0].servicetype) {
      ser.push(Number(this.updatecustomerarray1[0].servicetype[i].servicetypeid))
      serid.push(this.updatecustomerarray1[0].servicetype[i].id)
      serstatus.push(this.updatecustomerarray1[0].servicetype[i].servicestatus)
    }
    this.ModalCusForm.controls.services.get('serviceTypeid').setValue(ser)
    this.ModalCusForm.controls.services.get('serviceStatus').setValue(serstatus)
    this.ModalCusForm.controls.services.get('id').setValue(serid)
    this.ModalCusForm.controls.regaddcity.setValue(this.updatecustomerarray1[0].registeredaddress.citylocation)

    var stateset = this.statelistall.find(s => s.stateslocation = this.updatecustomerarray1[0].registeredaddress.stateslocation)
    this.updatecustomerarray1[0].registeredaddress.stateslocation = stateset.id

    this.ModalCusForm.controls.regaddstate.setValue(this.updatecustomerarray1[0].registeredaddress.stateslocation)
    this.ModalCusForm.controls.regaddpincode.setValue(this.updatecustomerarray1[0].registeredaddress.registeredpincode)
    this.ModalCusForm.controls.geo.setValue(this.updatecustomerarray1[0].geolocations)
    this.ModalCusForm.controls.country.setValue(this.updatecustomerarray1[0].countries)
    this.setcountry=this.updatecustomerarray1[0].countries
    this.ModalCusForm.controls.TAN.setValue(this.updatecustomerarray1[0].tannumber)
    this.ModalCusForm.controls.PAN.setValue(this.updatecustomerarray1[0].pannumber)
    this.ModalCusForm.controls.Tds.setValue(this.updatecustomerarray1[0].tds)
    this.ModalCusForm.controls.SEZ.setValue(this.updatecustomerarray1[0].customergst.issez)
    this.ModalCusForm.controls.GST.setValue(this.updatecustomerarray1[0].customergst.gstnumber)
    this.ModalCusForm.controls.gstLocation.setValue(this.updatecustomerarray1[0].customergst.location)
    this.ModalCusForm.controls.ApContactName.setValue(this.updatecustomerarray1[0].billinginfo.apcontactName)
    this.ModalCusForm.controls.Email.setValue(this.updatecustomerarray1[0].billinginfo.apEmail)
    this.ModalCusForm.controls.APPhoneNumber.setValue(this.updatecustomerarray1[0].billinginfo.phoneNumber)
    this.ModalCusForm.controls.BdmContactName.setValue(this.updatecustomerarray1[0].billinginfo.bdmconatctName)
    this.ModalCusForm.controls.BdmMail.setValue(this.updatecustomerarray1[0].billinginfo.bdmEmail)
    this.ModalCusForm.controls.AmName.setValue(this.updatecustomerarray1[0].billinginfo.amconatctName)
    this.ModalCusForm.controls.AmMailID.setValue(this.updatecustomerarray1[0].billinginfo.amEmail)
    var length = this.updatecustomerarray1[0].billingaddress.length
    console.log(length, "length")


    var length = this.updatecustomerarray1[0].shippingaddress.length
    let b = 0
    var formbilling = (this.ModalCusForm.get('billingAddress') as FormArray)
    console.log(formbilling, "hello")
    for (let i in this.updatecustomerarray1[0].billingaddress) {
      if (b == 0 && b < length) {
        formbilling.controls[b].get('billingaddressId').setValue(this.updatecustomerarray1[0].billingaddress[i].billingaddressId)
        formbilling.controls[b].get('Address1').setValue(this.updatecustomerarray1[0].billingaddress[i].billingaddressLine1)
        formbilling.controls[b].get('Address2').setValue(this.updatecustomerarray1[0].billingaddress[i].billingaddressLine2)
        formbilling.controls[b].get('Pincode').setValue(this.updatecustomerarray1[0].billingaddress[i].pincode)

        formbilling.controls[b].get('City').setValue(this.updatecustomerarray1[0].billingaddress[i].citylocation)

        var stateset = this.statelistall.find(s => s.stateslocation = this.updatecustomerarray1[0].billingaddress[i].stateslocation)
        this.updatecustomerarray1[0].billingaddress[i].stateslocation = stateset.id

        formbilling.controls[b].get('State').setValue(this.updatecustomerarray1[0].billingaddress[i].stateslocation)

        formbilling.controls[b].get('billingdefault').setValue(this.updatecustomerarray1[0].billingaddress[i].defaultaddressstatus)
        b++;
      } else if (b > 0 && b < length) {
        this.modaladdingBillingAddress()
        formbilling.controls[b].get('billingaddressId').setValue(this.updatecustomerarray1[0].billingaddress[i].billingaddressId)
        formbilling.controls[b].get('Address1').setValue(this.updatecustomerarray1[0].billingaddress[i].billingaddressLine1)
        formbilling.controls[b].get('Address2').setValue(this.updatecustomerarray1[0].billingaddress[i].billingaddressLine2)
        formbilling.controls[b].get('Pincode').setValue(this.updatecustomerarray1[0].billingaddress[i].pincode)
        formbilling.controls[b].get('City').setValue(this.updatecustomerarray1[0].billingaddress[i].citylocation)
        var stateset = this.statelistall.find(s => s.stateslocation = this.updatecustomerarray1[0].billingaddress[i].stateslocation)
        this.updatecustomerarray1[0].billingaddress[i].stateslocation = stateset.id
        formbilling.controls[b].get('State').setValue(this.updatecustomerarray1[0].billingaddress[i].stateslocation)
        formbilling.controls[b].get('billingdefault').setValue(this.updatecustomerarray1[0].billingaddress[i].defaultaddressstatus)
        b++
      }
    }



    var length1 = this.updatecustomerarray1[0].shippingaddress.length
    this.modaldisable(length1);
    this.modaldisable1(length);
    let c = 0
    var formbilling1 = (this.ModalCusForm.get('ShippingingAddress') as FormArray)
    console.log(formbilling1, "hello")
    for (let i in this.updatecustomerarray1[0].shippingaddress) {
      if (c == 0 && c < length1) {
        formbilling1.controls[c].get('SEZ').setValue(this.updatecustomerarray1[0].shippingaddress[i].issez)
        formbilling1.controls[c].get('shippingaddressId').setValue(this.updatecustomerarray1[0].shippingaddress[i].shippingaddressId)
        formbilling1.controls[c].get('Address1').setValue(this.updatecustomerarray1[0].shippingaddress[i].shippingaddressLine1)
        formbilling1.controls[c].get('Address2').setValue(this.updatecustomerarray1[0].shippingaddress[i].shippingaddressLine2)
        formbilling1.controls[c].get('Pincode').setValue(this.updatecustomerarray1[0].shippingaddress[i].pincode)
        formbilling1.controls[c].get('City').setValue(this.updatecustomerarray1[0].shippingaddress[i].citylocation)

        var stateset = this.statelistall.find(s => s.stateslocation = this.updatecustomerarray1[0].shippingaddress[i].stateslocation)
        this.updatecustomerarray1[0].shippingaddress[i].stateslocation = stateset.id
        formbilling1.controls[c].get('State').setValue(this.updatecustomerarray1[0].shippingaddress[i].stateslocation)
        formbilling1.controls[c].get('shippingdefault').setValue(this.updatecustomerarray1[0].shippingaddress[i].defaultaddressstatus)
        formbilling1.controls[c].get('gstLocation').setValue(this.updatecustomerarray1[0].shippingaddress[i].gstlocation)
        c++;
      } else if (c > 0 && c < length1) {
        this.modaladdingshippingingAddress()
        formbilling1.controls[c].get('SEZ').setValue(this.updatecustomerarray1[0].shippingaddress[i].issez)
        formbilling1.controls[c].get('shippingaddressId').setValue(this.updatecustomerarray1[0].shippingaddress[i].shippingaddressId)
        formbilling1.controls[c].get('Address1').setValue(this.updatecustomerarray1[0].shippingaddress[i].shippingaddressLine1)
        formbilling1.controls[c].get('Address2').setValue(this.updatecustomerarray1[0].shippingaddress[i].shippingaddressLine2)
        formbilling1.controls[c].get('Pincode').setValue(this.updatecustomerarray1[0].shippingaddress[i].pincode)
        formbilling1.controls[c].get('City').setValue(this.updatecustomerarray1[0].shippingaddress[i].citylocation)
        var stateset = this.statelistall.find(s => s.stateslocation = this.updatecustomerarray1[0].shippingaddress[i].stateslocation)
        this.updatecustomerarray1[0].shippingaddress[i].stateslocation = stateset.id
        formbilling1.controls[c].get('State').setValue(this.updatecustomerarray1[0].shippingaddress[i].stateslocation)
        formbilling1.controls[c].get('shippingdefault').setValue(this.updatecustomerarray1[0].shippingaddress[i].defaultaddressstatus)



        formbilling1.controls[c].get('gstLocation').setValue(this.updatecustomerarray1[0].shippingaddress[i].gstlocation)
        c++
      }
    }
    console.log("form", this.ModalCusForm)
  }
  updateCustomerData(b) {
    console.log(b, "this form for update")
    var addresslist = [];
    var addressList1 = [];
    var servicelist = [];
    var today = this.formatDate(new Date())
    console.log(this.ModalCusForm.controls.services.value, "hello")
    for (let i in this.ModalCusForm.controls.services.value.serviceTypeid) {
      var ser = {
        "id": this.ModalCusForm.controls.services.value.id[i],
        "servicetypeid": this.ModalCusForm.controls.services.value.serviceTypeid[i],
        "servicestatus": true
      }
      servicelist.push(ser)
    }
    for (let i in b.ShippingingAddress) {

      let shipping = {
        'shippingaddressId': b.ShippingingAddress[i].shippingaddressId,
        "shippingaddressLine1": b.ShippingingAddress[i].Address1,
        "shippingaddressLine2": b.ShippingingAddress[i].Address2,
        "pincode": Number(b.ShippingingAddress[i].Pincode),
        "citylocation": b.ShippingingAddress[i].City,
        "stateslocation": b.ShippingingAddress[i].State,
        "defaultaddressstatus": b.ShippingingAddress[i].shippingdefault,
        "issez": Number(b.ShippingingAddress[i].SEZ),
        "gstlocation": b.ShippingingAddress[i].gstLocation,
        "status": 1
      }
      addresslist.push(shipping)
    }
    for (let i in b.billingAddress) {

      let one = {
        'billingaddressId': b.billingAddress[i].billingaddressId,
        "billingaddressLine1": b.billingAddress[i].Address1,
        "billingaddressLine2": b.billingAddress[i].Address2,
        "pincode": Number(b.billingAddress[i].Pincode),
        "citylocation": b.billingAddress[i].City,
        "stateslocation": b.billingAddress[i].State,
        "defaultaddressstatus": b.billingAddress[i].billingdefault,
        "status": 1
      }
      addressList1.push(one)
    }
    console.log(addressList1, "billing")

    console.log(addresslist, "shipping")
    var updateobject = {


      "customerList":
      {
        "customerId": this.updateid,
        "customerName": b.customerName,
        "tds": b.Tds,
        "customerstatus": this.updatecustomerarrayupdate[0].customerstatus,
        "pannumber": b.PAN,
        "tannumber": b.TAN,
        "geolocations": b.geo,
        "createddate": this.updatecustomerarrayupdate[0].createddate,
        "updateddate": today,
        "createdby": this.updatecustomerarrayupdate[0].createdby,
        "updatedby": b.BdmContactName,
        "countries": b.country,
        "mailstatus": this.updatecustomerarrayupdate[0].mailstatus,
      },
      "customergstList":
      {
        "id": this.updatecustomerarrayupdate[0].customergst.id,
        "location": b.gstLocation,
        "gst": this.updatecustomerarrayupdate[0].customergst.gst,
        "gstnumber": b.GST,
        "issez": Number(b.SEZ),
        "customergststatus": this.updatecustomerarrayupdate[0].customergst.customergststatus

      },
      "shippingaddressList": addresslist,
      "billingaddressList": addressList1,
      "contactinfoList":
      {
        "contactId": this.updatecustomerarrayupdate[0].contactinfo.contactId,
        "contactName": this.updatecustomerarrayupdate[0].contactinfo.contactName,
        "contactinfostatus": this.updatecustomerarrayupdate[0].contactinfo.contactinfostatus

      },
      "billinginfoList":
      {
        "billingId": this.updatecustomerarrayupdate[0].billinginfo.billingId,
        "apcontactName": b.ApContactName,
        "apEmail": b.Email,
        "phoneNumber": b.APPhoneNumber,
        "bdmconatctName": b.BdmContactName,
        "bdmEmail": b.BdmMail,
        "amconatctName": b.AmName,
        "amEmail": b.AmMailID,
        "billinginfostatus": this.updatecustomerarrayupdate[0].billinginfo.billinginfostatus

      },
      "registeredaddress":
      {
        "id": this.updatecustomerarrayupdate[0].registeredaddress.id,
        "citylocation": b.regaddcity,
        "stateslocation": b.regaddstate,
        "registeredpincode": b.regaddpincode,
        "status": "true"
      },
      "servicetype": servicelist,
      "transactionType": "update"
    }
    let msg
    if((this.bc>0 && this.sc<2) && (this.sc>0 && this.sc<2)){
      console.log("update object", updateobject)
      this.service.updateCustomerDetails(updateobject).subscribe(res => {
        msg = res
        this.toastr.successToastr(msg.message, 'Success', {
          showCloseButton: true,
          animate: 'slideFromRight'
        })
        console.log(res)
        this.getCustomerData()
        this.selecteddata(this.updateid);
      },
        err => {
          msg = err
          this.toastr.infoToastr(msg.error.message, 'Info', {
            showCloseButton: true,
            animate: 'slideFromRight'
          })
        })
      
    }else{
      this.toastr.infoToastr("Please select atleast one shipping and billing address as deafult","Info",{
        showCloseButton: true,
        animate: 'slideFromRight'
      })
    }
    




  }



  getI() {


    this.removecount = this.CustomerForm.controls.billingAddress.value.length

    if (this.removecount <= 1) {
      this.remove = true;

      this.removecount = this.CustomerForm.controls.billingAddress.value.length
      this.remove = false;
    }

  }

  //  Disabling the rremove buttonb in billing address when index at 1
  disable() {
    // console.log(this.c,"the value form index of removing")
    if (this.c <= 1) {
      this.status = false;
    }
    else {
      this.status = true;
    }
  }
  //  Disabling the rremove buttonb in shipping addresswhen index at 1

  disable1() {
    this.kk = this.CustomerForm.controls.ShippingingAddress.get('length')


    if (this.kk <= 1) {

      this.status1 = false;
    }
    if (this.c <= 1) {

      this.status1 = false;
    }
    else {
      this.status1 = true;

    }
  }


  // status for remoingmodal button?
  modalgetI() {
    //  console.log(":this is from keshava");

    this.removecount = this.ModalCusForm.controls.billingAddress.value.length
    // console.log(this.removecount,"index value")
    if (this.removecount <= 1) {
      this.remove = true;

      this.removecount = this.ModalCusForm.controls.billingAddress.value.length
      this.remove = false;
    }

  }

  //  Disabling the rremove buttonb in billing address when index at 1
  modaldisable(l) {
    // console.log(this.c,"the value form index of removing")
    if (l <= 1) {
      this.modalStatus = false;
    }
    else {
      this.modalStatus = true;
    }
  }
  //  Disabling the rremove buttonb in shipping addresswhen index at 1

  modaldisable1(k) {
    this.kk = this.ModalCusForm.controls.ShippingingAddress.get('length')


    if (k <= 1) {

      this.modalStatus = false;
    }
    if (this.c <= 1) {

      this.modalStatus = false;
    }
    else {
      this.modalStatus = true;

    }
  }

  // form for modal
  ModalCusForm = this.fb.group({

    customerName: ['', Validators.required],
    services: this.fb.group({
      serviceTypeid: ['', Validators.required],
      serviceStatus: [],
      id: []
    }
    ),

    regaddstate: ['', Validators.required],
    regaddcity: ['', Validators.required],
    regaddpincode: ['', Validators.required],
    TAN: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[A-Z]{4}[0-9]{5}[A-Z]{1}$')
    ])],
    PAN: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')
    ])],
    geo: ['', Validators.required],
    country: ['', Validators.required],

    billingAddress: this.fb.array([
      this.fb.group({

        billingaddressId: [],
        Address1: ['', Validators.required],
        Address2: ['',],
        Pincode: ['', Validators.required],
        City: ['', Validators.required],
        State: ['', Validators.required],
        billingdefault: [],

      })
    ]),
    ShippingingAddress: this.fb.array([
      this.fb.group({
        shippingaddressId: [],
        Address1: ['', Validators.required],
        Address2: ['',],
        Pincode: ['', Validators.required],
        City: ['', Validators.required],
        State: ['', Validators.required],
        shippingdefault: [],
        SEZ: ['', Validators.required],
        gstLocation: ['', Validators.required],
      })
    ]),
    SEZ: ['', Validators.required],
    GST: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[0-9 A-Z]{2}[0-9 A-Z]{2}$')
    ])],
    gstLocation: ['', Validators.required],

    ApContactName: ['', Validators.required],
    Email: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
    ])],
    APPhoneNumber: ['', Validators.compose([
      Validators.required,
      Validators.pattern('[6789][0-9]{9}$')
    ])],
    Tds: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'), Validators.maxLength(5)
    ])],
    
    BdmContactName: ['', Validators.required],
    BdmMail: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
    ])],
    AmName: ['', Validators.required],
    AmMailID: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
    ])]


  })



  modaladdingBillingAddress() {
    this.status = true;

    (this.ModalCusForm.get('billingAddress') as FormArray).push(this.fb.group({
      billingaddressId: [],
      Address1: ['', Validators.required],
      Address2: ['',],
      Pincode: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      billingdefault: [],

    }))

    this.modalgetI();

  }
  modaladdingshippingingAddress() {
    this.modalStatus = true;

    (this.ModalCusForm.get('ShippingingAddress') as FormArray).push(this.fb.group({
      shippingaddressId: [],
      Address1: ['', Validators.required],
      Address2: [],
      Pincode: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      shippingdefault: [],
      SEZ: ['', Validators.required],
      gstLocation: ['', Validators.required],




    }))

  }


  mmodalremovingBillingAddress(a) {
    console.log(a, "this is from Billing id")
    var c = a;
    (this.ModalCusForm.get('billingAddress') as FormArray).removeAt(a)

    this.modalremovecount = this.ModalCusForm.controls.billingAddress.value.length
    this.modaldisable(c);
  }

  modalremovingShippingAddress(b) {
    console.log(b, "this is from Shipping id")
    // console.log(b,"this is from the removing shipping address")

    var cc = b;
    (this.ModalCusForm.get('ShippingingAddress') as FormArray).removeAt(b)
    this.modaldisable1(b);
    if (cc <= 1) {
      this.modalStatus = false
    }
    else
      this.modalStatus = true

  }




  getCustomerData() {
    this.customerarray = [];
    var request =
    {
      "customerList":
      {


      },



      "transactionType": "getall"
    }

    this.service.getallListiofCustomer(request).subscribe(res => {
      console.log(res, "get all")
      this.customerData = res;
      this.updatecustomerarrayupdate = this.customerData.customerList;



      for (let a in this.updatecustomerarrayupdate) {

        if (this.updatecustomerarrayupdate[a].customerstatus == true) {

          this.customerarray.push(this.updatecustomerarrayupdate[a])


        }
      }

      console.log(this.customerarray, "original")
      var tablearray = [];
      var tablearray1 = [];

      for (let i in this.customerarray) {
        for (let j in this.customerarray[i].servicetype) {
          var stype = this.serviceTypeAssign.find(s => s.id == this.customerarray[i].servicetype[j].servicetypeid);
          this.customerarray[i].servicetype[j].serviceType = stype.serviceType
          console.log(this.customerarray[i].servicetype[j].serviceType, "service type")
          console.log(this.customerarray, "final data")

        }

        for (let j in this.customerarray[i].billingaddress) {
          if (this.customerarray[i].billingaddress[j].defaultaddressstatus == true) {
            tablearray.push(this.customerarray[i].billingaddress)
          }
        }
        for (let j in this.customerarray[i].shippingaddress) {
          console.log(this.customerarray[i].shippingaddress[j].defaultaddressstatus)
          if (this.customerarray[i].shippingaddress[j].defaultaddressstatus == true) {
            tablearray1.push(this.customerarray[i].shippingaddress)
          }
        }
      }


      console.log(tablearray, "final")
      console.log(tablearray1, "array")



    })

  }
  getCustomerDataById(customerid) {
    this.customerid = customerid
    var request =
    {
      "customerList":
      {
        "customerId": customerid

      },



      "transactionType": "getbyid"
    }


    this.service.getByIDListofCustomer(request).subscribe(res => {
      console.log(res, "getByidcustomer")

    })

  }
  updateCustomerDetails() {



    var request = {
      "customerList": {
        "customerId": this.customerid,
        "customerName": this.ModalCusForm.value.customerName,
        "serviceType": this.updatedservicetype,
        "tds": this.ModalCusForm.value.Tds,
        "customerstatus": this.customerstatus,
        "location": this.ModalCusForm.value.billingAddress[0].State[0]

      },
      "customergst": {
        "id": this.gstid,
        "location": this.ModalCusForm.value.billingAddress[0].City[0],
        "gst": this.gstupdatestatus,
        "issez": this.ModalCusForm.value.SEZ,

      },
      "addressList": [

        {

          "addressLine1": this.ModalCusForm.value.ShippingingAddress[0].Address1,
          "addressLine2": this.ModalCusForm.value.ShippingingAddress[0].Address1,
          "pincode": this.ModalCusForm.value.ShippingingAddress[0].Pincode,
          "location": this.ModalCusForm.value.ShippingingAddress[0].City[0],
          "addressstatus": this.addressstatus1

        }, {

          "addressLine1": this.ModalCusForm.value.billingAddress[0].Address1,
          "addressLine2": this.ModalCusForm.value.billingAddress[0].Address1,
          "pincode": this.ModalCusForm.value.billingAddress[0].Pincode,
          "location": this.ModalCusForm.value.ShippingingAddress[0].State[0],
          "addressstatus": this.addressstatus2

        }],
      "contactinfoList":
      {
        "contactId": this.contactId,
        "contactinfostatus": this.contactinfoupstatus,
        "contactName": this.updatecontactName,
        "permanentMobileNumber": this.ModalCusForm.value.PermantMnumber,
        "alternateMobileNumber": this.ModalCusForm.value.alternateMNumber,
        "personalEmail": this.ModalCusForm.value.personalEmail,
        "officialEmail": this.ModalCusForm.value.officiaalEmail,


      },
      "billinginfoList":
      {
        "billingId": this.billinginfoupstatus,
        "apcontactName": this.ModalCusForm.value.ApContactName,
        "apEmail": this.ModalCusForm.value.Email,
        "phoneNumber": this.ModalCusForm.value.APPhoneNumber,
        "bdmconatctName": this.ModalCusForm.value.BdmContactName,
        "bdmEmail": this.ModalCusForm.value.BdmMail,
        "amconatctName": this.ModalCusForm.value.AmName,
        "amEmail": this.ModalCusForm.value.AmMailID,

      },

      "transactionType": "update"
    }

    console.log(request, "updated data")

    this.service.updateCustomerDetails(request).subscribe(res => console.log(res, "this is updated form"))

  }
  deleteCustomer(id) {

    var deleteObject = {
      "customerList":
      {
        "customerId": id,

        "customerstatus": 0


      },



      "transactionType": "delete"
    }
    console.log(deleteObject, "this is delete")
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this activity!",
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    })
      .then((proceed) => {
        if (proceed) {

          this.service.deleteCustomerDetails(deleteObject).subscribe(response => {
            console.log("delete response", response);
            this.msgdelete = response;
            this.toastr.successToastr(this.msgdelete.message, 'success', {
              showCloseButton: true,
              animate: 'slideFromRight'
            })

            this.getCustomerData();
          }, err => {
            console.log(err)
            this.msg = err
            this.toastr.infoToastr(this.msg.error.message, 'error', {
              showCloseButton: true,
              animate: 'slideFromRight'
            })
          });

        }
        // else{
        //   this.toastr.errorToastr('You not deleted customer', 'info', {
        //     animate: 'slideFromRight',
        //     showCloseButton: true,
        //   });
        // }
      });





  }

  //    masters
  getServiceType() {

    var request =
    {
      "servicetypeList": [{



      }],
      "transactionType": "getall"


    }

    // this.http.post("http://192.168.3.18:9973/obs/servicetype/get", request).subscribe(resp => {
    //   console.log(resp, "getting serviceType Masters")
    //   this.seviceType = resp;
    //   this.serviceTypeAssign = this.seviceType.servicetypeList;
    //   console.log(this.serviceTypeAssign, "master dataaa")
    // })
    this.service.getservicetype(request).subscribe(resp => {
      console.log(resp, "getting serviceType Masters")
      this.seviceType = resp;
      this.serviceTypeAssign = this.seviceType.servicetypeList;
      console.log(this.serviceTypeAssign, "master dataaa")
    })
  }

  getLocationList() {

    var request =
    {

      deliverylocationList: [{




      }],
      "transactionType": "getall"
    }
    // this.http.post("http://192.168.3.100:7078/get", request).subscribe(resp => {
    //   console.log(resp, "this is for location")
    //   this.citydata = resp;
    //   this.cityarray = this.citydata.deliverylocationList;
    //   console.log(this.cityarray, "this is for location;.ol,imuknjfg")
    // })

    this.service.getdeliverylocation(request).subscribe(resp => {
      console.log(resp, "this is for location")
      this.citydata = resp;
      this.cityarray = this.citydata.deliverylocationList;
      console.log(this.cityarray, "this is for location;.ol,imuknjfg")
    })
  }
  getcitylocation() {

    var request = {

      "states":
        [],

      "sessionId": "1234",
      "transactionType": "getAll"

    }
    // this.http.post("http://192.168.1.48:8089/master/states/get", request).subscribe(resp => {
    //   console.log(resp)

    //   this.statedata = resp;
    //   this.statelistall = this.statedata.statesList;
    //   console.log(this.statelistall, "datahrms")

    // })

    this.hrms.getStateListMaster(request).subscribe(resp => {
      console.log(resp)

      this.statedata = resp;
      this.statelistall = this.statedata.statesList;
      console.log(this.statelistall, "datahrms")

    })

  }

  getGstLocation() {

    var request = {
      "gstlocationList": [{




      }],
      "transactionType": "getAll"
    }
    this.service.getGstLocation(request).subscribe(res => {
      console.log(res, "gst")

      this.gstarray = res;
      this.gstarrayList = this.gstarray.gstlocationList;

      console.log(this.gstl, "this is for Gst Location")
    })
  }

  getCountry() {
     this.countryall=[]
    var request = {
      "countrylist": [{

      }],
      "transactionType": "getall"
    }
    this.service.GetCountry(request).subscribe(res => {
      console.log(res, "countries")

      this.countryarr = res
      this.countryarrall = this.countryarr.body.countrylist
      for(let i in this.countryarrall){
        this.countryall.push(this.countryarrall[i].country)
      }
      console.log(this.countryarrall, "countries1")
    })

  }
  getRegionList() {

    var request = {
      "geoList": [
        {

        }
      ],
      "transactionType": "getall"
    }
    this.service.GetGeo(request).subscribe(res => {
      console.log(res, "geo regions")
      this.geodata = res;

      this.geoRegion = this.geodata.geoList
      console.log(this.geoRegion, "geo regions")
    })

  }




  gstchange(value) {
    var gst = value;
    var gstset = gst.substring(0, 2);
    this.CustomerForm.controls.gstLocation.setValue(gstset)
    console.log(gstset, "gst")
  }

  clearmodalform() {
    this.ModalCusForm.reset()
    let array = this.ModalCusForm.get('ShippingingAddress') as FormArray
    let array1 = this.ModalCusForm.get('billingAddress') as FormArray
    while (array.length) {
      array.removeAt(array.length - 1);
    }
    while (array1.length) {
      array1.removeAt(array1.length - 1);
    }
    this.modaladdingshippingingAddress();
    this.modaladdingBillingAddress();
  }
  clearcreateform() {
    this.CustomerForm.clearValidators();
    this.CustomerForm.reset();
    let array = this.CustomerForm.get('ShippingingAddress') as FormArray
    let array1 = this.CustomerForm.get('billingAddress') as FormArray
    while (array.length) {
      array.removeAt(array.length - 1);
    }
    while (array1.length) {
      array1.removeAt(array1.length - 1);
    }
    this.addingshippingingAddress();
    this.addingBillingAddress();
    this.status=false
  }

  formatDate(date) {
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 101).toString().substring(1);
    var day = (date.getDate() + 100).toString().substring(1);
    return year + "-" + month + "-" + day;
  }
  


  defaultbillingaddress(e){
    console.log("defaultaddress",e)
    if(e.target.checked==true){
      this.bc++
      console.log("checked",this.bc)
    }
    else{
      this.bc--
      console.log("checked",this.bc)
    }
   
    if(this.bc>1){
      this.toastr.infoToastr("Only one billing address should select as default","Info",{
        showCloseButton:true,
        animate: 'slideFromRight'
      })
    }
    if(this.bc<1){
      this.toastr.infoToastr("atleast one billing address should select as default","Info",{
        showCloseButton:true,
        animate: 'slideFromRight'
      })
    }
  }

  defaultshippingaddress(e){
    console.log("defaultaddress",e)
    if(e.target.checked==true){
      this.sc++
      console.log("checked",this.bc)
    }
    else{
      this.sc--
      console.log("checked",this.bc)
    }
   
    if(this.sc>1){
      this.toastr.infoToastr("Only one shipping address should select as default","Info",{
        showCloseButton:true,
        animate: 'slideFromRight'
      })
    }
    if(this.sc<1){
      this.toastr.infoToastr("atleast one shipping address should select as default","Info",{
        showCloseButton:true,
        animate: 'slideFromRight'
      })
    }
  }
}
