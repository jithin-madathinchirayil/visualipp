import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlPropertyComponent } from './html-property.component';

describe('HtmlPropertyComponent', () => {
  let component: HtmlPropertyComponent;
  let fixture: ComponentFixture<HtmlPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HtmlPropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtmlPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
