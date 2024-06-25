import { CreateImprssnForm } from '@/app/_forms/CreateImprssnForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Imprssn } from '@prisma/client';
import { revalidatePath } from 'next/cache';

type ProfileCardProp = {
  id: string;
  name: string;
  authorId: string;
  imprssnBookId: string;
  imprssns: Imprssn[];
};

export const ProfileCard = ({ authorId, id, name, imprssnBookId, imprssns }: ProfileCardProp) => {
  const handleSubmit = async () => {
    'use server';

    revalidatePath(`/${imprssnBookId}`);
  };

  const hasImprssn = imprssns.length !== 0;
  const hasNoImprssn = imprssns.length === 0;

  return (
    <Card key={id} className="min-w-[350px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        {hasNoImprssn && <CardDescription>처음으로 인상을 남겨보세요!</CardDescription>}
        {hasImprssn && <CardDescription>{imprssns.length}개의 인상이 있어요.</CardDescription>}
      </CardHeader>
      <CardContent>
        <CreateImprssnForm
          authorId={authorId}
          targetUserId={id}
          targetUserName={name}
          imprssnBookId={imprssnBookId}
          onSuccess={handleSubmit}
        />
        {/* <CreateAccountForm bookId={bookId} bookName={bookName} onSubmit={handleSubmit} /> */}
      </CardContent>
    </Card>
  );
};
