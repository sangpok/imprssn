import { Loader2Icon } from 'lucide-react';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="min-w-full min-h-dvh flex items-center justify-center">
      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
      <p>인상기록부를 불러오는 중입니다...</p>
    </main>
  );
}
