import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, effect, inject, input, InputSignal, OnDestroy, output, OutputEmitterRef } from '@angular/core';
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
export class ComponentPropertiesComponent implements OnDestroy {
  private utilityService: UtilityService = inject(UtilityService);
  public selectedSchema: InputSignal<PageSchema | undefined> = input<PageSchema | undefined>(undefined,{alias:"selectedComponentSchema"});
  public onChanges: OutputEmitterRef<any> = output<string>({alias:'onChanges'});
  public form: FormGroup = new FormGroup({
    test: new FormControl('')
  });
  public enableView: boolean = false;
  public selectedSchemaShadow: PageSchema | undefined;
  private subscriptionList: Subscription[] = [];

  constructor() {
    this.onInputChanges();
  }

  private onInputChanges(): void {
    effect(async () => {
      this.enableView = false;
      this.selectedSchemaShadow = this.selectedSchema();
      await this.generateForm(this.selectedSchemaShadow?.styleProps);
      this.enableView = true;
    },{allowSignalWrites: true});
  }

  private async generateForm(fieldSets: any[] | undefined): Promise<void> {
    if(!fieldSets) return;
    let tempForm: FormGroup = new FormGroup({});
    for(const parent of fieldSets) {
      for(const child of parent.items) {
        if(child.type === 'box-margin' || child.type === 'box-padding') {
          for(const childItem of child.items) {
            if(this.selectedSchemaShadow?.styleValues && this.selectedSchemaShadow?.styleValues[child.name+childItem.label]) {
              tempForm.addControl(child.name+childItem.label, new FormControl(this.selectedSchemaShadow?.styleValues[child.name+childItem.label]));
            } else {
              tempForm.addControl(child.name+childItem.label, new FormControl(childItem.default));
            }
          }
        } else  {
          if(this.selectedSchemaShadow?.styleValues && this.selectedSchemaShadow?.styleValues[child.name]) {
            tempForm.addControl(child.name, new FormControl(this.selectedSchemaShadow?.styleValues[child.name]));
          } else {
            tempForm.addControl(child.name, new FormControl(child.default));
          }
        }
      }
    }
    this.form = tempForm;
    this.onFormChange();
    return;
  }

  private onFormChange(): void {
    this.subscriptionList.push(this.form.valueChanges.pipe(debounceTime(200)).subscribe((value: any) => {
      this.selectedSchemaShadow!.styleValues = value;
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
