# Ionic Radio Select

Ionic's `ion-select` uses Alert to show Radio buttons to choose one of the item and it involces user selecting the option and then clicking OK button for the option to get chosen and applied as selected value for `ion-select`.

This means, users needs to do total 3 taps to make one selection. This directive changes such behavior of `ion-select` and now user only needs to do 2 taps to get the selected option reflected in the select. One to open the Alert and other to select the choice.

# How to use

In your ionic application's page module, import `IonicCustomRadioModule`.

````typescript
import { NgModule } from '@angular/core';
....
import { IonicCustomRadioModule } from 'ionic-radio-select';

@NgModule({
  ...
  imports: [
    ...,
    IonicCustomRadioModule
  ]
  ...
})
export class YourPageModule { }
````

In your html page where you were using add `customRadio` directive to `ion-select` element like shown below. Make sure it is the last entry in the tag:

````html
<ion-item>
  <ion-label>Custom Radio</ion-label>
  <ion-select [(ngModel)]="gaming" customRadio>
    <ion-option value="nes">NES</ion-option>
    <ion-option value="n64">Nintendo64</ion-option>
    <ion-option value="ps">PlayStation</ion-option>
    <ion-option value="genesis">Sega Genesis</ion-option>
    <ion-option value="saturn">Sega Saturn</ion-option>
    <ion-option value="snes">SNES</ion-option>
  </ion-select>
</ion-item>
````