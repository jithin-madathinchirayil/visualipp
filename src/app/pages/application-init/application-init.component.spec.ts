import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationInitComponent } from './application-init.component';

describe('ApplicationInitComponent', () => {
  let component: ApplicationInitComponent;
  let fixture: ComponentFixture<ApplicationInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationInitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
