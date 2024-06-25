'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { IdField, PasswordField } from './LoginForm.field';
import { requestLogin } from './LoginForm.action';
import { useToast } from '@/components/ui/use-toast';
import { User } from '@supabase/supabase-js';

const formSchema = z.object({
  id: z.string().min(6, '최소 6글자 이상 입력해주세요').max(20, '최대 20글자 이하로 입력해주세요.'),
  password: z
    .string()
    .min(6, '최소 6글자 이상 입력해주세요')
    .max(20, '최대 20글자 이하로 입력해주세요.'),
});

export type LoginSchema = z.infer<typeof formSchema>;

export const LoginForm = ({
  imprssnBookTitle,
  onSuccess,
}: {
  imprssnBookTitle?: string;
  onSuccess: ({ credentials, user }: { credentials: LoginSchema; user: User }) => void;
}) => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const handleSubmitAfterValidation = (values: LoginSchema) => {
    startTransition(async () => {
      const { status, data, error } = await requestLogin(values);

      if (status === 'success') {
        onSuccess({ credentials: values, user: data! });
      }

      if (status === 'error') {
        toast({
          title: '로그인 실패',
          description: error,
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitAfterValidation)} className="space-y-8">
        <fieldset className="space-y-8" disabled={pending}>
          <IdField control={form.control} />
          <PasswordField control={form.control} />
        </fieldset>

        <Button className="w-full" type="submit" disabled={pending}>
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {imprssnBookTitle || '인상기록부'}에 로그인
        </Button>
      </form>
    </Form>
  );
};
