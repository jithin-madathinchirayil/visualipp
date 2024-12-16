import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizeOverlayComponent } from './resize-overlay.component';

describe('ResizeOverlayComponent', () => {
  let component: ResizeOverlayComponent;
  let fixture: ComponentFixture<ResizeOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResizeOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResizeOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
