import { FormGroup } from '@angular/forms';

//these are sample custom validators

//password match validator
export function PasswordMatch(controlName: string, matchingControlName: string){
    return(formGroup: FormGroup)=>{
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName]

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        if(control.value !== matchingControl.value){
            matchingControl.setErrors({ passwordMatch: true})
        }else{
            matchingControl.setErrors(null)
        }
    }
}

//checks if latitude value is valid
export function LatitudeCheck(controlName: string){
    return(formGroup: FormGroup)=>{
        const control = formGroup.controls[controlName];
        const check = Math.abs(control.value)

        if (control.errors) {
            return;
        }

        if(check  && check <= 90 || check === 0){
            control.setErrors(null)
        }else{
            control.setErrors({ latitudeCheck: true})
        }
    }
}

//checks if lognitude value is valid
export function LongitudeCheck(controlName: string){
    return(formGroup: FormGroup)=>{
        const control = formGroup.controls[controlName];
        const check = Math.abs(control.value)

        if (control.errors) {
            return;
        }

        if(check  && check <= 180 || check === 0){
            control.setErrors(null)
        }else{
            control.setErrors({ longitudeCheck: true})
        }
    }
}

//checks size of given element if its a valid number
export function SizeCheck(controlName: string){
    return(formGroup: FormGroup)=>{
        const control = formGroup.controls[controlName];
         
        if (control.errors) {
            return;
        }

        if(isNaN(Number(control.value))){
            control.setErrors({ sizeCheck: true})
        }else{
            control.setErrors(null) 
        }
    }
}

//validates file size
onSelect(myFile, element: HTMLElement,){ 
    if(myFile.length > 0){
      if(element.getAttribute('formControlName') === 'landone'){
        if(myFile[0].size > 5120000){
          this.f.landone.setErrors({limitSize: true})
        }else{
          this.fileone = myFile[0]
        }
      }
      else if(element.getAttribute('formControlName') === 'landtwo'){
        if(myFile[0].size > 5120000){
          this.f.landtwo.setErrors({limitSize: true})
        }else{
          this.filetwo = myFile[0]
        }
      }
    }
  }
