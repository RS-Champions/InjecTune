import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiContext } from '@taiga-ui/cdk';
import { TuiError, TuiInput, tuiValidationErrorsProvider } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';

@Component({
  template: 'Required: {{ context.$implicit }}',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Error {
  protected readonly context = injectContext<TuiContext<boolean>>();
}

export interface InputData {
  name: string;
  placeholder: string;
  formControl: FormControl<string | null>;
  type?: HTMLInputElement['type'];
}

const ERROR_MESSAGES = {
  email: 'Invalid value of email',
  required: 'Field is required',
  passwordsMismatch: `The passwords don't match`,
  minlength: ({ requiredLength }: { requiredLength: number | undefined }) => {
    if (!requiredLength) return '';
    return `Minimum ${requiredLength.toString()} symbols`;
  },
};

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, TuiError, TuiInput],
  templateUrl: './input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiValidationErrorsProvider(ERROR_MESSAGES)],
})
export default class Input {
  data = input.required<InputData>();
}
