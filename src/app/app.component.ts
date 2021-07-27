import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{

  public employees: Employee[];
  public editemployee:Employee;
  public deleteemployee:Employee;

  constructor(private employeeService:EmployeeService){}

      ngOnInit(){
        this.getEmployees();
      }
  public getEmployees():void{
    this.employeeService.getEmployees().subscribe(
      (response:Employee[])=>{
        this.employees=response;

      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }


    public onAddEmployee(addForm: NgForm):void{
      document.getElementById('add-employee-form').click();
      this.employeeService.addEmployees(addForm.value).subscribe(
        (response:Employee)=>{
          console.log(response);
          this.getEmployees();
          addForm.reset();
        },
        (error:HttpErrorResponse)=>{
          alert(error.message);
          addForm.reset();
        }
      );
    }

    public onUpdateEmployee(employee:Employee):void{

      this.employeeService.updateEmployees(employee).subscribe(
        (response:Employee)=>{
          console.log(response);
          this.getEmployees();
        },
        (error:HttpErrorResponse)=>{
          alert(error.message);
        }
      );
    }


    public onDeleteEmployee(employeeId :number):void{

      this.employeeService.deleteEmployees(employeeId).subscribe(
        (response:void)=>{
          console.log(response);
          this.getEmployees();
        },
        (error:HttpErrorResponse)=>{
          alert(error.message);
        }
      );
    }

      public searchEmployees(key:String):void{
        //console.log(key);
            const res:Employee[] =[];
            for(const employee of this.employees){
              if(employee.nom.toLowerCase().indexOf(key.toLowerCase()) !==-1){
                res.push(employee);
              }
            }
            this.employees=res;
          /* if(res.length == 0 || !key){
             // this.getEmployees();
            //alert('not found');
            }*/
      }



      public onOpenModal(employee: Employee,mode :String): void{

        const container=document.getElementById('main-container');
        const button =document.createElement('button');
        button.type='button';
        button.style.display='none';
        button.setAttribute('data-toggle','modal');

        if(mode === 'add'){
          button.setAttribute('data-target','#addEmployeeModal');
        }
        if(mode === 'edit'){
          this.editemployee=employee;
          button.setAttribute('data-target','#updateEmployeeModal');
        }
        if(mode === 'delete'){
          this.deleteemployee=employee;
          button.setAttribute('data-target','#deleteEmployeeModal');
        }

        container.appendChild(button);
        button.click();
      }





}
