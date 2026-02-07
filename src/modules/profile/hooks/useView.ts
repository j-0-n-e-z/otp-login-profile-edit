import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { usePatchUserSessionMutation } from '@/utils/api/hooks/usePatchUserSessionMutation';
import { useStore } from '@/utils/store';

import type { ProfileFormScheme } from '../constants/profileFormScheme';

import { profileFormScheme } from '../constants/profileFormScheme';

export const useView = () => {
  const { user } = useStore();
  const profileForm = useForm<ProfileFormScheme>({
    mode: 'onTouched',
    defaultValues: user,
    resolver: zodResolver(profileFormScheme)
  });

  const patchUserSessionMutation = usePatchUserSessionMutation();

  const onSubmit = profileForm.handleSubmit(async (values) => {
    const patchUserSessionMutationResponse = await patchUserSessionMutation.mutateAsync({
      params: { phone: user.phone, user: values }
    });

    if (!patchUserSessionMutationResponse.data.success) {
      console.error('Не удалось обновить данные');
      return;
    }

    useStore.setState({ user: patchUserSessionMutationResponse.data.user });
  });

  return {
    form: profileForm,
    state: { isLoading: profileForm.formState.isSubmitting, phone: user.phone },
    functions: { onSubmit }
  };
};
