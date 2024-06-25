import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-w-full min-h-dvh flex flex-col items-center justify-center gap-4">
      <h2 className="text-lg font-semibold">존재하지 않는 인상기록부</h2>
      <p>요청하신 인상기록부를 찾지 못했습니다😇</p>
      <Button variant="default" asChild>
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </main>
  );
}
