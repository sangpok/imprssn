import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { CreateAccountSchema } from './CreateAccountForm';

export const IDField = ({ control }: { control: Control<CreateAccountSchema, any> }) => {
  return (
    <FormField
      control={control}
      name="id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>아이디</FormLabel>
          <FormControl>
            <Input type="text" placeholder="6글자 이상, 20글자 미만" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const PWField = ({ control }: { control: Control<CreateAccountSchema, any> }) => {
  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
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

export const PWConfirmField = ({ control }: { control: Control<CreateAccountSchema, any> }) => {
  return (
    <FormField
      control={control}
      name="passwordConfirm"
      render={({ field }) => (
        <FormItem>
          <FormLabel>비밀번호 확인</FormLabel>
          <FormControl>
            <Input type="password" placeholder="6글자 이상, 20글자 미만" {...field} />
          </FormControl>
          <FormDescription>비밀번호를 다시 한 번 입력해주세요.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const NameField = ({ control }: { control: Control<CreateAccountSchema, any> }) => {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>이름</FormLabel>
          <FormControl>
            <Input placeholder="2글자 이상, 20글자 미만" {...field} />
          </FormControl>
          <FormDescription>인상기록부에 쓰일 이름을 입력해주세요.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
