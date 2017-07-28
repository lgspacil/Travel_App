import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContinueComponent } from './create-continue.component';

describe('CreateContinueComponent', () => {
  let component: CreateContinueComponent;
  let fixture: ComponentFixture<CreateContinueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContinueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContinueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
