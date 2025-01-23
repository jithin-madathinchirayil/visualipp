import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeElementComponent } from './tree-element.component';

describe('TreeElementComponent', () => {
  let component: TreeElementComponent;
  let fixture: ComponentFixture<TreeElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
