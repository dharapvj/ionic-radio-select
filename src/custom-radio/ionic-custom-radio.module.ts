import { NgModule } from '@angular/core';
import { CustomRadioDirective } from './custom-radio';
@NgModule({
  declarations: [
    CustomRadioDirective
  ],
  exports: [
    CustomRadioDirective
  ]
})
export class IonicCustomRadioModule { }