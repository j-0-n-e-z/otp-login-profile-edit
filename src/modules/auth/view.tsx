import { Typography } from '@/components';

import { OtpForm } from './components/OtpForm/OtpForm';
import { useAuthViewStore } from './store';

import styles from './View.module.css';

export const AuthView = () => {
  const authViewStore = useAuthViewStore();

  return (
    <div className={styles.container}>
      <Typography tag='h1' variant='title'>
        Вход
      </Typography>

      {!authViewStore.isOtpSent && <OtpForm />}
    </div>
  );
};
