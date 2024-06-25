import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';

export const IdField = ({
  control,
}: {
  control: Control<{ id: string; password: string }, any>;
}) => {
  return (
    <FormField
      control={control}
      name="id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>아이디</FormLabel>
          <FormControl>
            <Input placeholder="6글자 이상, 20글자 미만" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const PasswordField = ({
  control,
}: {
  control: Control<{ id: string; password: string }, any>;
}) => {
  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>비밀번호</FormLabel>
          <FormControl>
            <Input type="password" placeholder="6글자 이상, 20글자 미만" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
