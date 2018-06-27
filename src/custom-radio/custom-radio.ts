import { Directive, Output, EventEmitter } from '@angular/core';
import { Host, Self, Optional } from '@angular/core';
import { Alert, Select } from 'ionic-angular';
import { deepCopy } from 'ionic-angular/util/util';
import { Overlay } from 'ionic-angular/navigation/overlay';

@Directive({
    selector: '[customRadio]',
})
export class CustomRadioDirective {
    
    @Output() overslide: any = new EventEmitter();
    
    constructor(@Host() @Self() @Optional() public hostSel : Select) {
      let app = (<any>hostSel)._app;
      hostSel.open = (ev?: UIEvent) => {
        // console.log('wrapper in');
        // orig.apply(hostCheckboxComponent, ev);
        if (hostSel.isFocus() || hostSel._disabled) {
          return;
        }
    
        console.debug('select, open alert');
    
        // the user may have assigned some options specifically for the alert
        const selectOptions = deepCopy(hostSel.selectOptions);
    
        selectOptions.buttons = null;
    
        // if the selectOptions didn't provide a title then use the label's text
        if (!selectOptions.title && hostSel._item) {
          selectOptions.title = hostSel._item.getLabelText();
        }
    
        if ((hostSel.interface === 'action-sheet' || hostSel.interface === 'popover') ) {
          console.error('customRadio directive is supported only with interface="radio" interface values "action-sheet" and "popover" are not supported when using customRadio directive.');
          return;
        }
        if( hostSel._multi ) { 
          console.error('customRadio directive is not supported multi="true" option.');
          return;
        }
    
        let overlay: Overlay;

        // default to use the alert interface
        hostSel.interface = 'alert';
  
        // user cannot provide inputs from selectOptions
        // alert inputs must be created by ionic from ion-options
        selectOptions.inputs = hostSel._options.map(input => {
          return {
            type: (hostSel._multi ? 'checkbox' : 'radio'),
            label: input.text,
            value: input.value,
            checked: input.selected,
            disabled: input.disabled,
            handler: (selectedOption: any) => {
              // Only emit the select event if it is being checked
              // For multi selects this won't emit when unchecking
              if (selectedOption.checked) {
                input.ionSelect.emit(input.value);
                overlay.dismiss();
              }
            }
          };
        });
  
        let selectCssClass = 'select-alert';
  
        // create the alert instance from our built up selectOptions
        overlay = new Alert(app, selectOptions, hostSel.config);
  
        // use radio buttons
        selectCssClass += ' single-select-alert';
        selectCssClass+=' custom-radio-alert';
        // If the user passed a cssClass for the select, add it
        selectCssClass += selectOptions.cssClass ? ' ' + selectOptions.cssClass : '';

        (overlay as Alert).setCssClass(selectCssClass);

        overlay.onDidDismiss(() => {
          const checkedInput = selectOptions.inputs.find(i => i.checked);
          checkedInput.selected = true;
          hostSel.value = checkedInput.value;
          hostSel._fireBlur();
          hostSel._overlay = undefined;
        });
    
        overlay.present(selectOptions);
    
        hostSel._fireFocus();
    
    
        hostSel._overlay = overlay;
        // console.log('wrapper out');
      };
    }

}
