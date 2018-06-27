import { NgModule, ModuleWithProviders } from '@angular/core';
import { CustomRadioDirective } from './custom-radio/custom-radio';

@NgModule({
  declarations: [
    // declare all components that your module uses
    CustomRadioDirective
  ],
  exports: [
    // export the component(s) that you want others to be able to use
    CustomRadioDirective
  ]
})
export class RadioSelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RadioSelectModule
    };
  }
}

