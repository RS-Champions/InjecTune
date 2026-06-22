import { ComponentFixture, TestBed } from '@angular/core/testing';

import Input from './input';
import { FormControl } from '@angular/forms';

describe('Input', () => {
  let component: Input;
  let fixture: ComponentFixture<Input>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Input],
    }).compileComponents();

    fixture = TestBed.createComponent(Input);
    fixture.componentRef.setInput('data', {
      name: 'name',
      placeholder: 'placeholder',
      formControl: new FormControl(''),
      type: 'text',
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
