import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, effect, EventEmitter, inject, Input, input, InputSignal, OnChanges, OnDestroy, Output, output, OutputEmitterRef, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { PageSchema } from '@core/models/app.models';
import { ChildFinderPipe } from '@core/pipes/filters.pipe';
import { UtilityService } from '@core/services/utility.service';
import { NgxColorsModule } from 'ngx-colors';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Subscription } from 'rxjs/internal/Subscription';

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
export class ComponentPropertiesComponent implements OnChanges, OnDestroy {
  @Input() selectedComponentSchema: PageSchema | undefined;
  @Output() onChanges: EventEmitter<PageSchema> = new EventEmitter<PageSchema>(true);
  private utilityService: UtilityService = inject(UtilityService);
  public form: FormGroup = new FormGroup({});
  public enableView: boolean = false;
  private subscriptionList: Subscription[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedComponentSchema']?.currentValue) {
      this.generateForm(this.selectedComponentSchema?.styleProps);
    }    
  }

  private async generateForm(fieldSets: any[] | undefined): Promise<void> {
    if(!fieldSets) return;
    let tempForm: FormGroup = new FormGroup({});
    for(const parent of fieldSets) {
      for(const child of parent.items) {
        if(child.type === 'box-margin' || child.type === 'box-padding') {
          for(const childItem of child.items) {
            if(this.selectedComponentSchema?.styleValues && this.selectedComponentSchema?.styleValues[child.name+childItem.label]) {
              tempForm.addControl(child.name+childItem.label, new FormControl(this.selectedComponentSchema?.styleValues[child.name+childItem.label]));
            } else {
              tempForm.addControl(child.name+childItem.label, new FormControl(childItem.default));
            }
          }
        } else  {
          if(this.selectedComponentSchema?.styleValues && this.selectedComponentSchema?.styleValues[child.name]) {
            tempForm.addControl(child.name, new FormControl(this.selectedComponentSchema?.styleValues[child.name]));
          } else {
            tempForm.addControl(child.name, new FormControl(child.default));
          }
        }
      }
    }
    this.form = tempForm;
    this.onFormChange();
    this.selectedComponentSchema!.styleValues = this.form.value;
    this.enableView = true;
    this.onChanges.emit(this.selectedComponentSchema);
    return;
  }

  private onFormChange(): void {
    this.subscriptionList.push(this.form.valueChanges.pipe(debounceTime(200)).subscribe((value: any) => {
      this.selectedComponentSchema!.styleValues = value;
      this.onChanges.emit(this.selectedComponentSchema);
    }));
  }

  public async onImageChanges(e: Event,control: string): Promise<void> {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.form.get(control)?.setValue(await this.utilityService.fileToDataURI(file));
  }

  public resetControl(control: string): void {
    this.form.get(control)?.reset(null);
  }

  public haveControl(name: string): boolean {
    return this.form.get(name) ? true : false;
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
