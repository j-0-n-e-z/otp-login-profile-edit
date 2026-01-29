import { Button, Typography } from '@/components';

import styles from './View.module.css';

export const AuthView = () => {
  return (
    <div className={styles.container}>
      <Typography tag='h1' variant='title'>
        AuthView
      </Typography>
      <Typography tag='p' variant='paragraph16-regular'>
        Введите номер телефона для входа
        <br /> в личный кабинет
      </Typography>

      <Button variant='contained'>Войти</Button>
    </div>
  );
};
