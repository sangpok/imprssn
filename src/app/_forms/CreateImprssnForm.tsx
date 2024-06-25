'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { requestCreateImprssn } from './CreateImprssnForm.action';
import { ContentField } from './CreateImprssnForm.field';

const formSchema = z.object({
  authorId: z.string(),
  targetUserId: z.string(),
  imprssnBookId: z.string(),
  content: z.string().min(2, '최소 5글자 이상 입력해주세요'),
});

export type CreateImprssnSchema = z.infer<typeof formSchema>;

export const CreateImprssnForm = ({
  onSuccess,
  authorId,
  targetUserId,
  targetUserName,
  imprssnBookId,
}: {
  authorId: string;
  targetUserId: string;
  targetUserName: string;
  imprssnBookId: string;
  onSuccess: () => void;
}) => {
  const form = useForm<CreateImprssnSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      authorId,
      targetUserId,
      imprssnBookId,
    },
  });

  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!pending && form.formState.dirtyFields.content) {
      form.reset();
    }
  }, [pending]);

  const handleSubmitAfterValidation = (values: CreateImprssnSchema) => {
    startTransition(async () => {
      const { status, data, error } = await requestCreateImprssn(values);

      if (status === 'success') {
        onSuccess();
        toast({
          title: '✨ 인상 남기기 성공',
          description: `${targetUserName}님께 성공적으로 인상을 남겼어요^_____^`,
        });
      }

      if (status === 'error') {
        toast({
          title: '😢 인상 남기기 실패',
          description: `${targetUserName}님께 인상을 남기던 도중 오류가 났어요.\n${error}`,
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
          <ContentField control={form.control} />
        </fieldset>

        <Button className="w-full" type="submit" disabled={pending}>
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          인상 남기기
        </Button>
      </form>
    </Form>
  );
};
