import {
  addUserToImprssnBook,
  getCreatedImprssnBooks,
  getImprssnBookDetails,
  getUserDetails,
} from '@/actions/actions';
import { User } from '@prisma/client';
import { differenceInDays } from 'date-fns';
import { BookHeartIcon } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import { CopyLinkButton } from './_components/CopyLinkButton';
import { ProfileCard } from './_components/ProfileCard';
import { NoAuthDialog } from './_dialogs/NoAuthDialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const revalidate = 60 * 60 * 24 * 7; // 7일

export async function generateStaticParams() {
  const imprssnBooks = await getCreatedImprssnBooks();

  return imprssnBooks.map(({ id: imprssnBookId }) => ({
    imprssnBookId,
  }));
}

export default async function Page({ params }: { params: { imprssnBookId: string } }) {
  const { imprssnBookId } = params;

  const [user, imprssnBookResult] = await Promise.all([
    getUserDetails(),
    getImprssnBookDetails({ id: imprssnBookId }),
  ]);

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

  const createProfileCard = (member: User) => {
    const targetImprssns = imprssnBookDetails.imprssns.filter(
      ({ targetUserId }) => targetUserId === member.id
    );

    return (
      <ProfileCard
        key={member.id}
        authorId={user!.id}
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
            <Button className="text-2xl font-semibold px-0" variant="link" asChild>
              <Link href="/">인상기록부: Imprssn</Link>
            </Button>
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
          </div>

          <section className="flex flex-row gap-4 flex-wrap w-full justify-center">
            {imprssnBookDetails.users.map(createProfileCard)}
          </section>
        </>
      )}
    </main>
  );
}
