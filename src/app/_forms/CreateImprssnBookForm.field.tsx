import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Control } from 'react-hook-form';

export const TitleField = ({
  control,
}: {
  control: Control<{ title: string; endAt: Date }, any>;
}) => {
  return (
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>인상기록부 제목</FormLabel>
          <FormControl>
            <Input placeholder="2글자 이상, 30글자 미만" {...field} />
          </FormControl>
          <FormDescription>인상기록부의 제목을 지정해주세요.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const DateField = ({
  control,
}: {
  control: Control<{ title: string; endAt: Date }, any>;
}) => {
  return (
    <FormField
      control={control}
      name="endAt"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>종료일</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? (
                    format(field.value, 'PPP', { locale: ko })
                  ) : (
                    <span>종료일 선택</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>종료일에 인상기록부가 공개됩니다.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
