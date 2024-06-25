'use server';

import { CreateAccountSchema } from '@/app/_forms/CreateAccountForm';
import { CreateImprssnSchema } from '@/app/_forms/CreateImprssnForm';
import prisma from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import { nanoid } from 'nanoid';

export const createImprssnBook = async ({ title, endAt }: { title: string; endAt: Date }) => {
  try {
    const newImprssnBook = await prisma.imprssnBook.create({
      data: {
        id: nanoid(),
        title,
        endAt,
      },
    });

    return { data: newImprssnBook, error: null };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return { data: null, error: error.message };
    }

    if (error instanceof PrismaClientUnknownRequestError) {
      return { data: null, error: error.message };
    }

    return { data: null, error: 'unknown error' };
  }
};

export const createAccount = async ({ id, password, name }: CreateAccountSchema) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email: `${id}@imprssn.com`,
    password,
    options: {
      data: { name },
    },
  });

  if (error) {
    return { error, data: null };
  }

  return { error: null, data: data.user };
};

export async function addUserToImprssnBook({
  userId,
  imprssnBookId,
}: {
  userId: string;
  imprssnBookId: string;
}) {
  try {
    // User를 ImprssnBook에 추가
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        joinedImprssnBooks: {
          connect: { id: imprssnBookId },
        },
      },
    });

    // ImprssnBook에 User 추가
    await prisma.imprssnBook.update({
      where: {
        id: imprssnBookId,
      },
      data: {
        users: {
          connect: { id: userId },
        },
      },
    });

    return { data: true, error: null };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return { data: null, error: error.message };
    }

    if (error instanceof PrismaClientUnknownRequestError) {
      return { data: null, error: error.message };
    }

    return { data: null, error: 'unknown error' };
  }
}

export async function getJoinedImprssnBooks({ id }: { id: string }) {
  try {
    const targetUser = await prisma.user.findUnique({
      where: { id },
      include: {
        joinedImprssnBooks: true,
      },
    });

    if (targetUser === null) {
      return { data: null, error: '존재하지 않는 유저입니다.' };
    }

    return { data: targetUser.joinedImprssnBooks, error: null };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return { data: null, error: error.message };
    }

    if (error instanceof PrismaClientUnknownRequestError) {
      return { data: null, error: error.message };
    }

    return { data: null, error: 'unknown error' };
  }
}

export async function verifyUserRegistration({
  userId,
  imprssnBookId,
}: {
  userId: string;
  imprssnBookId: string;
}) {
  const { data, error } = await getJoinedImprssnBooks({ id: userId });

  if (error) {
    return false;
  }

  return data!.some(({ id }) => id === imprssnBookId);
}

export async function getImprssnBookDetails({ id }: { id: string }) {
  try {
    const imprssnBook = await prisma.imprssnBook.findUnique({
      where: { id },
      include: {
        imprssns: true,
        users: true,
      },
    });

    if (imprssnBook === null) {
      return { data: null, error: '존재하지 않는 인상기록부입니다.' };
    }

    return { data: imprssnBook, error: null };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return { data: null, error: error.message };
    }

    if (error instanceof PrismaClientUnknownRequestError) {
      return { data: null, error: error.message };
    }

    return { data: null, error: 'unknown error' };
  }
}

export async function createImprssn({
  authorId,
  targetUserId,
  imprssnBookId,
  content,
}: CreateImprssnSchema) {
  try {
    const newImprssn = await prisma.imprssn.create({
      data: {
        content,
        authorId,
        imprssnBookId,
        targetUserId,
      },
    });

    await addImprssnToUser({
      authorId,
      imprssnBookId,
      targetUserId,
      imprssnId: newImprssn.id,
    });

    return { data: true, error: null };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return { data: null, error: error.message };
    }

    if (error instanceof PrismaClientUnknownRequestError) {
      return { data: null, error: error.message };
    }

    return { data: null, error: 'unknown error' };
  }
}

type AddImprssnToUserProp = {
  imprssnId: number;
} & Omit<CreateImprssnSchema, 'content'>;

export async function addImprssnToUser({
  authorId,
  targetUserId,
  imprssnId,
  imprssnBookId,
}: AddImprssnToUserProp) {
  const authorPayload = {
    where: { id: authorId },
    data: {
      writtenImprssns: {
        connect: { id: imprssnId },
      },
    },
  };

  const targetUserPayload = {
    where: { id: targetUserId },
    data: {
      receviedImprssns: {
        connect: { id: imprssnId },
      },
    },
  };

  const imprssnBookPayload = {
    where: {
      id: imprssnBookId,
    },
    data: {
      imprssns: {
        connect: { id: imprssnId },
      },
    },
  };

  await Promise.all([
    prisma.user.update(authorPayload),
    prisma.user.update(targetUserPayload),
    prisma.imprssnBook.update(imprssnBookPayload),
  ]);

  return { data: true, error: null };
}
