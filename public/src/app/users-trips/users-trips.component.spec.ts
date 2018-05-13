import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTripsComponent } from './users-trips.component';

describe('UsersTripsComponent', () => {
  let component: UsersTripsComponent;
  let fixture: ComponentFixture<UsersTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
