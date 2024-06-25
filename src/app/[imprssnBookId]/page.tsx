import { addUserToImprssnBook, getImprssnBookDetails } from '@/actions/actions';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { NoAuthDialog } from './_dialogs/NoAuthDialog';
import { revalidatePath } from 'next/cache';
import { differenceInDays } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BookHeartIcon, CopyIcon } from 'lucide-react';
import { CreateImprssnForm } from '../_forms/CreateImprssnForm';
import { ProfileCard } from './_components/ProfileCard';
import { User } from '@prisma/client';
import { CopyLinkButton } from './_components/CopyLinkButton';

export default async function Page({ params }: { params: { imprssnBookId: string } }) {
  const { imprssnBookId } = params;

  const supabase = createClient();

  const [userResult, imprssnBookResult] = await Promise.all([
    supabase.auth.getUser(),
    getImprssnBookDetails({ id: imprssnBookId }),
  ]);

  const {
    data: { user },
  } = userResult;

  const hasAuth = user !== null;
  const hasNoAuth = user === null;

  const { data: imprssnBookDetails } = imprssnBookResult;

  if (imprssnBookDetails === null) {
    notFound();
  }

  const isJoined = hasAuth ? imprssnBookDetails.users.some(({ id }) => id === user.id) : false;

  if (hasAuth && !isJoined) {
    await addUserToImprssnBook({ userId: user.id, imprssnBookId });
    revalidatePath(`/${imprssnBookId}`);
  }

  const handleSubmit = async () => {
    'use server';
  };

  const createProfileCard = (member: User) => {
    const targetImprssns = imprssnBookDetails.imprssns.filter(
      ({ targetUserId }) => targetUserId === member.id
    );

    return (
      <ProfileCard
        key={member.id}
        authorId={user.id}
        imprssnBookId={imprssnBookId}
        imprssns={targetImprssns}
        {...member}
      />
    );
  };

  return (
    <main className="min-w-full flex flex-col items-center justify-center gap-12 py-[4.5rem] px-3">
      {hasNoAuth && <NoAuthDialog {...imprssnBookDetails} />}
      {isJoined && (
        <>
          <div className="flex flex-row justify-center items-center gap-2">
            <BookHeartIcon strokeWidth="2" />
            <h1 className="text-2xl font-semibold">인상기록부: Imprssn</h1>
          </div>

          <div>
            <h2 className="text-xl font-semibold w-full text-center">
              <strong>{imprssnBookDetails.title}</strong>
            </h2>

            <p>
              인상이 공개될 때까지{' '}
              <strong>{differenceInDays(imprssnBookDetails.endAt, new Date())}</strong>일 남았어요.
            </p>
          </div>

          <div>
            <p className="text-center">
              <strong>{imprssnBookDetails.title}</strong>의 인상기록부에는
              <br />
              <strong>{imprssnBookDetails.users.length}명</strong>의 멤버에 대해 총{' '}
              <strong>{imprssnBookDetails.imprssns.length}개</strong>의 인상이 남겨졌어요.
            </p>
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            <p>링크 공유하기</p>
            <CopyLinkButton imprssnBookId={imprssnBookId} />
            {/* <div className="flex flex-row gap-4">
              <Input
                className="w-[25rem] flex-1"
                defaultValue={
                  process.env.NODE_ENV === 'development'
                    ? `http://localhost:3000/${imprssnBookId}`
                    : `https://imprssn.vercel.app/${imprssnBookId}`
                }
                readOnly
              />
              <Button variant="outline" size="icon">
                <CopyIcon className="w-4 h-4" />
              </Button>
            </div> */}
          </div>

          <section className="flex flex-row gap-4 flex-wrap w-full justify-center">
            {imprssnBookDetails.users.map(createProfileCard)}
          </section>
        </>
      )}
    </main>
  );
}
