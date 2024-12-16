import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPropertiesComponent } from './component-properties.component';

describe('ComponentPropertiesComponent', () => {
  let component: ComponentPropertiesComponent;
  let fixture: ComponentFixture<ComponentPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentPropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
