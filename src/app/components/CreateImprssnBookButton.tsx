import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CreateImprssnBookForm } from '../_forms/CreateImprssnBookForm';
import { ImprssnBook } from '@prisma/client';
import { redirect } from 'next/navigation';
import { addUserToImprssnBook } from '@/actions/actions';

export const CreateImprssnBookButton = ({ userId }: { userId: string }) => {
  const handleSuccess = async (values: ImprssnBook) => {
    'use server';

    /** 계정이 있는 상태에서만 들어올 수 있음 */

    const { data, error } = await addUserToImprssnBook({ userId, imprssnBookId: values.id });

    if (data) {
      redirect(`/${values.id}`);
    }

    /** 토스트를 띄워야 하는데 ... */
    console.log(error);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4 w-full" variant="default">
          인상기록부 만들기
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>인상기록부 만들기</DialogTitle>
          <DialogDescription>인상기록부의 정보를 입력해주세요.</DialogDescription>
        </DialogHeader>

        <CreateImprssnBookForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};
