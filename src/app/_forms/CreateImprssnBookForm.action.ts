'use server';

import { createImprssnBook } from '@/actions/actions';
import { CreateImprssnBookSchema } from './CreateImprssnBookForm';
import { revalidatePath } from 'next/cache';

export const requestCreateImprssnBook = async (values: CreateImprssnBookSchema) => {
  const { data, error } = await createImprssnBook({ ...values });

  if (error) {
    return { status: 'error', data: null, error: error };
  }

  revalidatePath(`/${data!.id}`);

  return { status: 'success', data: data!, error: null };
};
