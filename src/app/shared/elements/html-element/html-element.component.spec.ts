import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlElementComponent } from './html-element.component';

describe('HtmlElementComponent', () => {
  let component: HtmlElementComponent;
  let fixture: ComponentFixture<HtmlElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HtmlElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtmlElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
