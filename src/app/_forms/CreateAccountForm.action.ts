'use server';

import { createAccount } from '@/actions/actions';
import { CreateAccountSchema } from './CreateAccountForm';

export const requestCreateAccount = async (values: CreateAccountSchema) => {
  const { data, error } = await createAccount(values);

  if (error) {
    return { status: 'error', data: null, error: error.message };
  }

  return { status: 'success', data, error: null };
};
