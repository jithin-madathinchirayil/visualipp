import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTreeComponent } from './component-tree.component';

describe('ComponentTreeComponent', () => {
  let component: ComponentTreeComponent;
  let fixture: ComponentFixture<ComponentTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
