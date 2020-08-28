import { AbstractControl } from '@angular/forms';

export function loadedWeightValidation(control: AbstractControl) {

  if(control && (control.value != null || control.value != undefined)){
    const lwt = control.value;
    const ow = control.root.get('emptyweight');
    if(ow){
      const owt = ow.value;

      if(owt >= lwt){
        return {
          isError: true
        };
      }
    }
  }
  return null;
}
