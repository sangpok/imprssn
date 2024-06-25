'use server';

import { addUserToImprssnBook } from '@/actions/actions';
import { CreateAccountSchema } from '@/app/_forms/CreateAccountForm';
import { createClient } from '@/lib/supabase/server';
import { Prisma } from '@prisma/client';
import { User } from '@supabase/supabase-js';

type LoginWithSignInImprssnBookProp = {
  credentials: CreateAccountSchema;
  imprssnBookId: string;
  userId: string;
};

export async function loginWithSignInImprssnBook({
  credentials,
  imprssnBookId,
  userId,
}: LoginWithSignInImprssnBookProp) {
  const supabase = createClient();

  const credentialPayload = {
    email: `${credentials.id}@imprssn.com`,
    password: credentials.password,
  };

  const [{ error: signInError }, { error: addError }] = await Promise.all([
    supabase.auth.signInWithPassword(credentialPayload),
    addUserToImprssnBook({ userId, imprssnBookId }),
  ]);

  if (signInError) {
    return { status: 'error', data: null, error: signInError };
  }

  if (addError) {
    return { status: 'error', data: null, error: addError };
  }

  return { status: 'success', data: true, error: null };
}

type ImprssnBookWithUsers = Prisma.ImprssnBookGetPayload<{
  include: { users: true };
}>;

export async function isJoinedUser({
  users,
  user,
}: {
  users: ImprssnBookWithUsers['users'];
  user: User;
}) {
  return users.some(({ id }) => id === user.id);
}
