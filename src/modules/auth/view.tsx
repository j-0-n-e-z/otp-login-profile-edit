import { Typography } from '@/components';

import { OtpForm } from './components/OtpForm/OtpForm';
import { useView } from './hooks/useView';

import styles from './View.module.css';

export const AuthView = () => {
  const { state } = useView();

  return (
    <div className={styles.container}>
      <Typography tag='h1' variant='title'>
        Вход
      </Typography>

      {!state.isOtpSent && <OtpForm />}
    </div>
  );
};
