import { type ReactElement } from 'react';
import {
    type FieldPath,
    type FieldValues,
    type RegisterOptions,
    useController,
    type UseControllerProps,
    useFormState,
} from 'react-hook-form';

import { type IInputProps, TextField } from './TextField';

type IControlledTextFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  UseControllerProps<TFieldValues, TName> &
  Omit<IInputProps, 'onChange' | 'value' | 'name'> & {
      rules?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
  };

export function ControlledTextField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
    control,
    name,
    rules,
    ...properties
}: IControlledTextFieldProps<TFieldValues, TName>): ReactElement {
    const { field } = useController<TFieldValues, TName>({ name, control, rules });
    const { errors } = useFormState<TFieldValues>({ control });

    return (
        <TextField
            value={field.value}
            onChange={field.onChange}
            {...properties}
            error={errors[name]?.message as string}
        />
    );
}
