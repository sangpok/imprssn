'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DateField, TitleField } from './CreateImprssnBookForm.field';
import { requestCreateImprssnBook } from './CreateImprssnBookForm.action';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { ImprssnBook } from '@prisma/client';

const formSchema = z.object({
  title: z
    .string()
    .min(2, '최소 2글자 이상 입력해주세요')
    .max(30, '최대 50글자 이하로 입력해주세요.'),
  endAt: z.date().min(new Date()),
});

export type CreateImprssnBookSchema = z.infer<typeof formSchema>;

export const CreateImprssnBookForm = ({
  onSuccess,
}: {
  onSuccess: (values: ImprssnBook) => void;
}) => {
  const form = useForm<CreateImprssnBookSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      endAt: addDays(new Date(), 7),
    },
  });

  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const handleSubmitAfterValidation = (values: CreateImprssnBookSchema) => {
    startTransition(async () => {
      const { status, data, error } = await requestCreateImprssnBook(values);

      if (status === 'success') {
        onSuccess(data!);
      }

      if (status === 'error') {
        toast({
          title: ' 생성 실패',
          description: `${values.title} 인상기록부를 만드는 도중 오류가 났어요.\n${error}`,
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
          <TitleField control={form.control} />
          <DateField control={form.control} />
        </fieldset>

        <Button className="w-full" type="submit" disabled={pending}>
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          인상기록부 만들기
        </Button>
      </form>
    </Form>
  );
};
