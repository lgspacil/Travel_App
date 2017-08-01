import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectMesssageComponent } from './direct-messsage.component';

describe('DirectMesssageComponent', () => {
  let component: DirectMesssageComponent;
  let fixture: ComponentFixture<DirectMesssageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectMesssageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectMesssageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
