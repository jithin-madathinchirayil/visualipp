import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderAltComponent } from './builder-alt.component';

describe('BuilderAltComponent', () => {
  let component: BuilderAltComponent;
  let fixture: ComponentFixture<BuilderAltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderAltComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuilderAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
