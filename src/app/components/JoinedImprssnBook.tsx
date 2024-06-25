import { getJoinedImprssnBooks } from '@/actions/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ImprssnBook } from '@prisma/client';
import { differenceInDays } from 'date-fns';
import Link from 'next/link';

export const JoinedImprssnBook = async ({ userId }: { userId: string }) => {
  const { data: joinedImprssnBooks, error } = await getJoinedImprssnBooks({ id: userId });

  if (error !== null) {
    throw new Error(error);
  }

  const hasJoinedImprssnBooks = joinedImprssnBooks.length !== 0;
  const hasNoJoinedImprssnBooks = joinedImprssnBooks.length === 0;

  const createJoinedImprssnBookItem = (imprssnBook: ImprssnBook) => (
    <JoinedImprssnBookItem key={imprssnBook.id} {...imprssnBook} />
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>참여한 인상기록부</CardTitle>
        <CardDescription>내가 참여한 인상기록부 목록을 확인할 수 있어요.</CardDescription>
      </CardHeader>
      <CardContent>
        {hasJoinedImprssnBooks && (
          <ul className="flex flex-row gap-3 flex-wrap">
            {joinedImprssnBooks.map(createJoinedImprssnBookItem)}
          </ul>
        )}

        {hasNoJoinedImprssnBooks && <p>참여 중인 인상기록부가 없어요.</p>}
      </CardContent>
    </Card>
  );
};

const JoinedImprssnBookItem = ({ id, title, endAt }: ImprssnBook) => {
  return (
    <li key={id}>
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button variant="outline" asChild>
            <Link href={`/${id}`}>{title}</Link>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent>
          인상 공개까지 <strong>{differenceInDays(endAt, new Date())}일</strong> 남았어요.
        </HoverCardContent>
      </HoverCard>
    </li>
  );
};
