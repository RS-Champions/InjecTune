import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiContext } from '@taiga-ui/cdk';
import { TuiError, TuiInput, tuiValidationErrorsProvider } from '@taiga-ui/core';
import { injectContext, PolymorpheusComponent } from '@taiga-ui/polymorpheus';

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
}

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, TuiError, TuiInput],
  templateUrl: './input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiValidationErrorsProvider({ required: new PolymorpheusComponent(Error) })],
})
export default class Input {
  data = input.required<InputData>();
}
