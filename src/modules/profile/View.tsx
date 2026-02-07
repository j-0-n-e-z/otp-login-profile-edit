import { PatternFormat } from 'react-number-format';

import { Button, Input, Typography } from '@/components';

import { useView } from './hooks/useView';

import styles from './View.module.css';

export const ProfileView = () => {
  const { functions, form, state } = useView();
  const { errors } = form.formState;

  return (
    <form className={styles.container} onSubmit={functions.onSubmit}>
      <Typography tag='h1' variant='title'>
        Профиль
      </Typography>

      <fieldset className={styles.fieldset} disabled={state.isLoading}>
        <Input
          label='Фамилия'
          placeholder='Фамилия'
          {...form.register('lastname')}
          {...(errors.lastname && { error: errors.lastname.message })}
        />

        <Input
          disabled
          label='Номер телефона'
          value={state.phone}
          component={PatternFormat}
          format='+7 (###) ### ## ##'
        />

        <Input
          label='Имя'
          placeholder='Имя'
          {...form.register('firstname')}
          {...(errors.firstname && { error: errors.firstname.message })}
        />

        <Input
          label='Email'
          type='email'
          autoComplete='email'
          placeholder='Email'
          {...form.register('email')}
          {...(errors.email && { error: errors.email.message })}
        />

        <Input
          label='Отчество'
          placeholder='Отчество'
          {...form.register('middlename')}
          {...(errors.middlename && { error: errors.middlename.message })}
        />

        <Input
          label='Город'
          placeholder='Город'
          {...form.register('city')}
          {...(errors.city && { error: errors.city.message })}
        />
      </fieldset>

      <div>
        <Button
          disabled={state.isLoading}
          type='submit'
          variant='contained'
          loading={state.isLoading}
        >
          Обновить данные
        </Button>
      </div>
    </form>
  );
};
