import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { addRecord } from '../../../api/tablesRecordsApi/api';
import AddIcon from '../../../assets/images/add.svg?react';
import CrossIcon from '../../../assets/images/cross.svg?react';
import { Button } from '../../Button';
import { Grid } from '../../Grid';
import { ControlledTextField } from '../../TextField/ControlledTextField';
import { Title } from '../../Typography';
import styles from './AddRecordForm.module.scss';
import { VALIDATION_EMAIL_PATTERN, VALIDATION_NAME_FILED_PATTERN, VALIDATION_NUMBER_PATTERN, VALIDATION_REQUIRED, VALIDATION_STRING_PATTERN } from './valid';
export type CustomField = {
    name: string;
    value: string;
};
export interface IAddRecordFormProps{
    onClose: ()=>void
}
export type AddRecordForm = {
    id: string;
    name: string;
    status: string;
    schet: string;
    email: string;
    country?: string;
    city?: string;
    street?: string;
    house_number?: string;
    flat_number?: string;
    castomField?: CustomField[];
};

export function AddRecordForm({ onClose }: IAddRecordFormProps) {
    const queryClient = useQueryClient();
    const methods = useForm<AddRecordForm>({
        defaultValues: { }
    });

    const { control, handleSubmit } = methods;
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'castomField'
    });
    const mutation = useMutation({
        mutationFn: addRecord,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['records'] });
            onClose();
        },
        onError: (err) => {
            console.error('Ошибка создания записи:', err);
        }
    });

    const onSubmit = (data: AddRecordForm) => {
        if (data.castomField && data.castomField.length > 5) {
            console.warn('Не более 5 кастомных полей');
            return;
        }
        mutation.mutate(data);
    };
    return (
        <div className={styles['root']}>
            <FormProvider {...methods}>
                <form className={styles['form']}>
                    <Grid container spacing="2rem">
                        <Grid item xs={12}>
                            <Title>Обязательные поля</Title>
                        </Grid>
                        <Grid item xs={2}>
                            <ControlledTextField
                                control={control}
                                name="id"
                                view="outlined"
                                label="id"
                                placeholder="Введите id"
                                rules={{
                                    required: VALIDATION_REQUIRED,
                                    pattern: VALIDATION_NUMBER_PATTERN }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <ControlledTextField
                                control={control}
                                name="name"
                                view="outlined"
                                label="Имя"
                                placeholder="Введите имя"
                                rules={{
                                    required: VALIDATION_REQUIRED,
                                    pattern: VALIDATION_STRING_PATTERN }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <ControlledTextField
                                control={control}
                                name="status"
                                view="outlined"
                                label="Статус"
                                placeholder="Введите статус"
                                rules={{
                                    required: VALIDATION_REQUIRED,
                                    pattern: VALIDATION_STRING_PATTERN }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ControlledTextField
                                control={control}
                                name="schet"
                                view="outlined"
                                label="Номер счета"
                                placeholder="Введите номер счета"
                                rules={{
                                    required: VALIDATION_REQUIRED,
                                    pattern: VALIDATION_NUMBER_PATTERN }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ControlledTextField
                                control={control}
                                name="email"
                                view="outlined"
                                label="Email"
                                placeholder="Введите email"
                                rules={{
                                    required: VALIDATION_REQUIRED,
                                    pattern: VALIDATION_EMAIL_PATTERN }}
                            />
                        </Grid>


                        <Grid item xs={12}>
                            <Title>Дополнительные поля</Title>
                        </Grid>
                        <Grid item xs={2}>
                            <ControlledTextField
                                control={control}
                                name="country"
                                view="outlined"
                                label="Страна"
                                placeholder="Введите страну"
                                rules={{ pattern: VALIDATION_STRING_PATTERN }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <ControlledTextField
                                control={control}
                                name="city"
                                view="outlined"
                                label="Город"
                                placeholder="Введите город"
                                rules={{ pattern: VALIDATION_STRING_PATTERN }}

                            />
                        </Grid>
                        <Grid item xs={2}>
                            <ControlledTextField
                                control={control}
                                name="street"
                                view="outlined"
                                label="Улица"
                                placeholder="Введите улицу"
                                rules={{ pattern: VALIDATION_STRING_PATTERN }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ControlledTextField
                                control={control}
                                name="house_number"
                                view="outlined"
                                label="Номер дома"
                                placeholder="Введите номер дома"
                                rules={{ pattern: VALIDATION_NUMBER_PATTERN }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ControlledTextField
                                control={control}
                                name="flat_number"
                                view="outlined"
                                label="Номер квартиры"
                                placeholder="Введите номер квартиры"
                                rules={{ pattern: VALIDATION_NUMBER_PATTERN }}
                            />
                        </Grid>

                        {!!fields.length && (
                            <Grid item xs={12}>
                                <Title>Пользовательские поля</Title>
                            </Grid>
                        )}
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className={styles['castomField']}
                                style={{
                                    borderBottom: index === fields.length - 1 ? 'none' : '0.1rem solid var(--border-default)',
                                    margin: index === 0 ? '0' : '10px 0 0 0'
                                }}
                            >
                                <Grid item xs={4} >
                                    <ControlledTextField
                                        control={control}
                                        name={`castomField.${index}.name`}
                                        view="outlined"
                                        label="Название поля"
                                        placeholder="Введите название"
                                        rules={{ required: VALIDATION_REQUIRED, pattern: VALIDATION_NAME_FILED_PATTERN }}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <ControlledTextField
                                        control={control}
                                        name={`castomField.${index}.value`}
                                        view="outlined"
                                        label="Значение поля"
                                        placeholder="Введите значение"
                                        rules={{ pattern: VALIDATION_NUMBER_PATTERN }}
                                    />
                                </Grid>
                                <Grid item xs={1} >
                                    <Button
                                        type="button"
                                        isIconButton
                                        startIcon={<CrossIcon width={24} height={24} />}
                                        view="flat"
                                        onClick={() => remove(index)}
                                    />
                                </Grid>
                            </div>
                        ))}


                        <Grid item xs={6}>
                            <Button
                                style={{
                                    display: fields.length >= 5 ? 'none' : 'flex',
                                }}
                                type="button"
                                startIcon={<AddIcon width={24} height={24} />}
                                className={styles['addButton']}
                                view="outlined"
                                onClick={() => append({ name: '', value: '' })}
                            >
                                Добавить новое поле
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>

            <div className={styles['actions']}>
                <Button
                    className={styles['button']}
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                >
                    Добавить запись
                </Button>
                <Button
                    className={styles['button']}
                    type="button"
                    view="outlined"
                    onClick={() => onClose()}
                >
                    Отменить
                </Button>
            </div>
        </div>


    );
}