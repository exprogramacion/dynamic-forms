import { Component } from "@angular/core";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import swal from'sweetalert2';
import { JsonPipe } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public myForm: FormGroup;

  public listRules: any;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {

    this.listRules = [
        { 
            "name": "accepted"
        },
        { 
            "name": "after",
            "arguments": [
                "date"
            ]
        },
        {
            "name": "after_or_equal",
            "arguments": [
                "date"
            ]
        },
        {
            "name": "alpha",
            "arguments": [
    
            ]
        },
        {
            "name": "alpha_dash",
            "arguments": [
    
            ]
        },
        {
            "name": "alpha_num",
            "arguments": [
    
            ]
        },
        {
            "name": "between",
            "arguments": [
                "min",
                "max"
            ]
        },
        {
            "name": "unique",
            "arguments": [
    
            ]
        },
        {
            "name": "email",
            "arguments": [
    
            ]
        },
        {
            "name": "numeric",
            "arguments": [
    
            ]
        },
        {
            "name": "min",
            "arguments": [
                "value"
            ]
        },
        {
            "name": "in",
            "arguments": [
                "value"
            ]
        }
    ];

    this.myForm = this._fb.group({
      fields: this._fb.array([
        this._fb.group({
          name: [""],
          required: [false],
          rules: this._fb.array([])
        })
      ])
    });
  }

  initArgument(type:string) {
    //console.log("Argumento", type)
    if(type=='after' || type=='after_or_equal'){
        //console.log("tipo 1")
            return this._fb.group({
                date:['']
            });
    }else{
        if(type=='between'){
            //console.log("tipo 2")
            return this._fb.group({
                min:[''],
                max:['']
            });
        }else{
            //console.log("tipo 3")
            return this._fb.group({
                value:['']
            });
        }
    }
  }

  initRule() {
    return this._fb.group({
      name: [""],
      arguments: this._fb.array([])
       
    });
  }

  initField() {
    return this._fb.group({
      name: [""],
      required: [false],
      rules: this._fb.array([])
    });
  }

  addArgument(i: number, j: number, type:string, rules: any, rule: any) {
    //console.log("añade", rules, rule.value.name);
    let x = rules.map( (e, k)=>{
        //console.log("entra", e.value.name, rule.value.name)
        if(e.value.name==rule.value.name && k!=j){
            //console.log("misma regla")
            return true;
        }
    })

    let y = x.filter( e => e)

    if(!y[0]){
        this.myForm.controls.fields['controls'][i].controls.rules['controls'][j].controls.arguments.push(this.initArgument(type));
    }else{
        swal(
            'Error',
            'Repeated rule',
            'error'
          )
        const control = <FormArray>(
            this.myForm.controls["fields"]['controls'][0].controls["rules"]
          );
          control.removeAt(j);
    }
  }

  addRule(i: number) {
    this.myForm.controls.fields['controls'][i].controls.rules.push(this.initRule());
  }

  addField() {
    const control = <FormArray>this.myForm.controls["fields"];
    control.push(this.initField());
  }

  removeRule(i: number) {

    swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this rule!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          const control = <FormArray>(
            this.myForm.controls["fields"]['controls'][0].controls["rules"]
          );
          control.removeAt(i);
          swal(
            'Deleted!',
            'Your rule has been deleted.',
            'success'
          )
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swal(
            'Cancelled',
            'Your rule is safe :)',
            'error'
          )
        }
      })
  }

  removeField(i: number) {
    swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this field!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
            const control = <FormArray>(
                this.myForm.controls["fields"]
            );
            control.removeAt(i);
          swal(
            'Deleted!',
            'Your filed has been deleted.',
            'success'
          )
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swal(
            'Cancelled',
            'Your field is safe :)',
            'error'
          )
        }
      })
  }

  save() {
    let res = new JsonPipe().transform(this.myForm.value);
    console.log(JSON.parse(res));
  }
  imprimir(rule){
      console.log(rule);
  }
}
