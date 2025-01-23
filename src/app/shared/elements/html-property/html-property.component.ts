import { JsonPipe, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { heightAnimation } from '@core/animations/app.animations';
import { ChildFinderPipe } from '@core/pipes/filters.pipe';
import { Subscription } from 'rxjs/internal/Subscription';
import { NgxColorsModule } from 'ngx-colors';
import { UtilityService } from '@core/services/utility.service';
import { ArrayFinderPipe } from '@core/pipes/array-finder.pipe';
import { ArrayFilterPipe } from '@core/pipes/array-filter';

@Component({
  selector: 'app-html-property',
  standalone: true,
  imports: [
    NgStyle,
    JsonPipe,
    NgTemplateOutlet,
    ChildFinderPipe,
    ArrayFinderPipe,
    ArrayFilterPipe,
    ReactiveFormsModule,
    NgxColorsModule
  ],
  templateUrl: './html-property.component.html',
  styleUrl: './html-property.component.scss',
  host:{class:'w-full h-auto flex flex-wrap'},
  animations:[heightAnimation]
})
export class HtmlPropertyComponent implements OnChanges, OnDestroy {
  @Input() property: any;
  @Input() computedStyle: any;
  @Output() onPropertyChange: EventEmitter<any> = new EventEmitter(true);
  public expanded: boolean = false;
  public form: FormGroup = new FormGroup({});
  private subscriptionList: Subscription[] = [];
    private utilityService: UtilityService = inject(UtilityService);
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['property']?.currentValue) {
      this.generateForm();
    }
    if(changes['computedStyle']?.currentValue) {
      this.patchForm();
    }
  }

  private generateForm(): void {
    let tempForm: FormGroup = new FormGroup({});
    this.property.items.forEach((item: any) => {
      if(item.items?.length > 0) {
        item.items.forEach((child: any) => {
          tempForm.addControl(item.name+child.label, new FormControl(child.default));
        });
      } else {
        tempForm.addControl(item.name, new FormControl(item.default))
      }
    });
    this.form = tempForm;
    console.log(this.form.value)
    this.onPropertyChange.emit(this.form.value);
    this.onFormChanges();
  }

  private patchForm(): void {
    if(!this.computedStyle || Object.keys(this.computedStyle).length === 0) return;
    Object.keys(this.computedStyle).forEach((key: string) =>  {
      this.form.get(key)?.patchValue(this.computedStyle[key],{emitEvent: false})
    });
  }

  private onFormChanges(): void {
    this.subscriptionList.push(this.form.valueChanges.subscribe({
      next:(value) => {
        this.onPropertyChange.emit(value);
      }
    }));
  }

  public toggleExpand(): void {
    this.expanded = !this.expanded;
  }

  public haveControl(name: string): boolean {
    return this.form.get(name) ? true : false;
  }

  public async onImageChanges(e: Event,control: string): Promise<void> {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.form.get(control)?.setValue(await this.utilityService.fileToDataURI(file));
  }

  public resetControl(control: string): void {
    this.form.get(control)?.reset(null);
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((item: Subscription) => item.unsubscribe());
  }
}
