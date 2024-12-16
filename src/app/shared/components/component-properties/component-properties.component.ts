import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, effect, inject, input, InputSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { PageSchema } from '@core/models/app.models';
import { ChildFinderPipe } from '@core/pipes/filters.pipe';
import { UtilityService } from '@core/services/utility.service';
import { NgxColorsModule } from 'ngx-colors';

@Component({
  selector: 'app-component-properties',
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NgTemplateOutlet,
    MatExpansionModule,
    ChildFinderPipe,
    NgxColorsModule
  ],
  templateUrl: './component-properties.component.html',
  styleUrl: './component-properties.component.scss',
  host:{
    class: 'w-full flex flex-wrap'
  }
})
export class ComponentPropertiesComponent {
  private utilityService: UtilityService = inject(UtilityService);
  public selectedSchema: InputSignal<PageSchema | undefined> = input<PageSchema | undefined>(undefined,{alias:"selectedComponentSchema"});
  public form: FormGroup = new FormGroup({});
  public enableView: boolean = false;

  constructor() {
    this.onInputChanges();
  }

  private onInputChanges(): void {
    effect(() => {
      this.generateForm(this.selectedSchema()?.styleProps)
    },{allowSignalWrites: true});
  }

  private generateForm(fieldSets: any[] | undefined): void {
    this.enableView = false;
    if(!fieldSets) return;
    let tempForm: FormGroup = new FormGroup({});
    for(const parent of fieldSets) {
      for(const child of parent.items) {
        if(child.type === 'box-margin' || child.type === 'box-padding') {
          for(const childItem of child.items) {
            tempForm.addControl(child.name+childItem.label, new FormControl(childItem.default));
          }
        } else  {
          tempForm.addControl(child.name, new FormControl(child.default));
        }
      }
    }
    this.form = tempForm;
    console.log(this.form.value);
    this.enableView = true;
  }

  public async onImageChanges(e: Event,control: string): Promise<void> {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.form.get(control)?.setValue(await this.utilityService.fileToDataURI(file));
    this.changes();
  }

  public resetControl(control: string): void {
    this.form.get(control)?.reset(null);
  }

  public changes(): void {
    console.log(this.form.value);
  }
}
