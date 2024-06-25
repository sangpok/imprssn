'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { IDField, NameField, PWConfirmField, PWField } from './CreateAccountForm.field';
import { requestCreateAccount } from './CreateAccountForm.action';
import { User } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

const formSchema = z
  .object({
    id: z
      .string()
      .min(6, '아이디는 6글자 이상으로 설정해주세요.')
      .max(20, '아이디는 20글자 이하로 설정해주세요.'),
    password: z
      .string()
      .min(6, '비밀번호는 6글자 이상으로 설정해주세요.')
      .max(20, '비밀번호는 20글자 이하로 설정해주세요.'),
    passwordConfirm: z.string(),
    name: z
      .string()
      .min(2, '이름은 2글자 이상으로 설정해주세요.')
      .max(20, '이름는 20글자 이하로 설정해주세요.'),
  })
  .refine(
    (values) => {
      const isNotEmpty = values.password !== '' && values.passwordConfirm !== '';
      const isSame = values.password === values.passwordConfirm;

      return isNotEmpty && isSame;
    },
    {
      message: '비밀번호가 같지 않아요.',
      path: ['passwordConfirm'],
    }
  );

export type CreateAccountSchema = z.infer<typeof formSchema>;

export const CreateAccountForm = ({
  bookName,
  onSuccess,
}: {
  bookName: string;
  onSuccess: ({ credentials, user }: { credentials: CreateAccountSchema; user: User }) => void;
}) => {
  const form = useForm<CreateAccountSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      password: '',
      passwordConfirm: '',
      name: '',
    },
  });

  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const handleSubmitAfterValidation = (values: CreateAccountSchema) => {
    startTransition(async () => {
      const { status, data, error } = await requestCreateAccount(values);

      if (status === 'success') {
        onSuccess({ credentials: values, user: data! });
      }

      if (status === 'error') {
        toast({
          title: '회원가입 오류',
          description: error,
          variant: 'destructive',
          action: (
            <ToastAction
              altText="다시 시도하기"
              onClick={() => handleSubmitAfterValidation(values)}
            >
              다시 시도하기
            </ToastAction>
          ),
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitAfterValidation)} className="space-y-8">
        <fieldset className="space-y-8" disabled={pending}>
          <IDField control={form.control} />
          <PWField control={form.control} />
          <PWConfirmField control={form.control} />
          <NameField control={form.control} />
        </fieldset>

        <Button className="w-full" type="submit" disabled={pending}>
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <strong>{bookName}</strong>에 가입하기
        </Button>
      </form>
    </Form>
  );
};
