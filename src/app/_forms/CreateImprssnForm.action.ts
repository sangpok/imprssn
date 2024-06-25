'use server';

import { createImprssn } from '@/actions/actions';
import { CreateImprssnSchema } from './CreateImprssnForm';

export async function requestCreateImprssn(payload: CreateImprssnSchema) {
  const { data, error } = await createImprssn(payload);

  if (error) {
    return { status: 'error', data: null, error: error };
  }

  return { status: 'success', data: true, error: null };
}
