import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceAnswerComponent } from './choice-answer.component';

describe('ChoiceAnswerComponent', () => {
  let component: ChoiceAnswerComponent;
  let fixture: ComponentFixture<ChoiceAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoiceAnswerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoiceAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
