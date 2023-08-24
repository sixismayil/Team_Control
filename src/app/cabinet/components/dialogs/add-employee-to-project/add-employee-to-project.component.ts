import { Component, OnInit, Inject } from '@angular/core';
import { CabinetService } from 'src/app/cabinet/cabinet.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray, Form } from '@angular/forms';
import { FormControl } from '@angular/forms';

export interface DialogData {
  label:string,
  id: number;
}

export interface Position {
  id: number;
  name: string;
}

export interface Person {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-employee-to-project',
  templateUrl: './add-employee-to-project.component.html',
  styleUrls: ['./add-employee-to-project.component.scss']
})
export class AddEmployeeToProjectComponent implements OnInit {
  data: any;
  label:string;
  projectId: number;
  employeeForm: FormControl = new FormControl(['', Validators.required]);
  customerForm: FormControl = new FormControl(['', Validators.required]);


  addPeopleForm: FormGroup = this.fb.group({
    peopleList: this.fb.array([])
  });

  panelOpenState = false;
  showSpinner = false;
  position = new FormControl();
  positionList: Position[] = [];

  employeeList: Person[];
  customerList: Person[];
  constructor(@Inject(MAT_DIALOG_DATA) data: DialogData, private fb: FormBuilder, public cabinetService: CabinetService) {
    this.label= data.label;
    this.projectId = data.id;
    this.employeeList = [];
    this.customerList = [];

    this.get_employees();
    this.get_customers();
    this.get_positions();

    if(data.label == "new"){
      this.addPeopleForm=this.fb.group({
        peopleList: this.fb.array([
          this.fb.group({
            personType: ['1', Validators.required],
            employeeId: ['', Validators.required],
            role: ['', Validators.required],
            position: [[], Validators.required]
          })
        ])
      });
    } else {
      this.getProjectParticipants(this.projectId);
    }
  }

  addPeople() {
    this.peopleList.push(this.fb.group({
      personType: ['1', Validators.required],
      employeeId: ['', Validators.required],
      role: ['', Validators.required],
      position: [[], Validators.required]
    }))
  }

  removePerson(i: number) {
    this.peopleList.removeAt(i);
  }

  switchPersonType(personType: string, index: number) {
    const person = this.getPerson(index);
    switch (+personType) {
      case 1:
        person.addControl("position", this.fb.control([], Validators.required));
        person.addControl("employeeId", this.fb.control('', Validators.required));
        person.removeControl("customerId");
        break;

      case 2:
        person.removeControl("position");
        person.addControl("customerId", this.fb.control('', Validators.required));
        person.removeControl("employeeId");
        break;
    }
  }

  ngOnInit(): void {

  }

  submitHandler() {
      for (let element of this.addPeopleForm.value.peopleList) {
        for (let item in element) {
          if (typeof element[item] == "string") {
            element[item] = +element[item];
          }
        }
      }
      // this.addPeopleToProject(this.addPeopleForm.value.peopleList, this.projectId);
      if(this.label == "new"){
        console.log(this.projectId);
        console.log(this.addPeopleForm.value.peopleList);
        this.addPeopleToProject(this.addPeopleForm.value.peopleList, this.projectId);
        console.log("created");
      } else{
        console.log(this.projectId);
        console.log(this.addPeopleForm.value.peopleList);
        this.updatePeopleInProjects(this.addPeopleForm.value.peopleList,this.projectId);
        console.log("updated");
      }
  }

  get peopleList() {
    return this.addPeopleForm.get("peopleList") as FormArray;
  }

  getPerson(i: number) {
    return this.peopleList.controls[i] as FormGroup;
  }

  getPersonNameValue(i: number) {
    return this.getPerson(i).contains("employeeId") ?
      this.employeeList.find(e => e.id == (this.getPerson(i).get("employeeId") as FormControl)?.value)?.name :
      this.customerList.find(e => e.id == (this.getPerson(i).get("customerId") as FormControl)?.value)?.name;
  }

  get_employees() {
    this.cabinetService.getEmployeesLookup().subscribe(data => {
      for (let element of data.result) {
        this.employeeList.push({
          id: element.id,
          name: element.fullname
        })
      }
    })
  }

  get_customers() {
    this.cabinetService.getCustomersLookup().subscribe(data => {
      for (let element of data.result) {
        this.customerList.push({
          id: element.id,
          name: element.fullname
        })
      }
    })
  }

  get_positions() {
    this.cabinetService.getPositionsEmployee().subscribe(data => {
      for (let element of data.result) {
        this.positionList.push({
          id: element.id,
          name: element.name
        })
      }
    })
  }

  addPeopleToProject(model:any, projectId:number){
    this.showSpinner = true;
    this.cabinetService.addPeopleToProject(model,projectId).subscribe(data => {
      if (data.errorCode && data.errorCode == 1) {
        this.cabinetService.messageDialog(data.status.message, false);
      } else {
        this.cabinetService.messageDialog(data.status.message, true);
      }
      this.showSpinner = false;
    },
      err => {
        this.cabinetService.messageDialog('Serverdə xəta baş verdi', false);
        this.showSpinner = false;
      });
  }

  getProjectParticipants(projectId:number){
    this.showSpinner=true;
    this.cabinetService.getProjectParticipants(projectId).subscribe(data=>{
      for(let element of data.response.data){
        if(element.personType == 2){
          this.peopleList.push(this.fb.group({
            personType: ['2', Validators.required],
            customerId: [element.customerId, Validators.required],
            role: [`${element.role}`, Validators.required]
          }))
        }else{
          this.peopleList.push(this.fb.group({
            personType: ['1', Validators.required],
            employeeId: [element.employeeId, Validators.required],
            role: [`${element.role}`, Validators.required],
            position: [element.position, Validators.required]
          }))
        }
      }
      this.showSpinner=false;
    })
  }

  updatePeopleInProjects(model:any, projectId:number){
    this.showSpinner=true;
    this.cabinetService.updatePeopleInProjects(model,projectId).subscribe(data => {
      if (data.errorCode && data.errorCode == 1) {
        this.cabinetService.messageDialog(data.status.message, false);
      } else {
        this.cabinetService.messageDialog(data.status.message, true);
      }
      this.showSpinner = false;
    },
      err => {
        this.cabinetService.messageDialog('Serverdə xəta baş verdi', false);
        this.showSpinner = false;
      });
  }
}
