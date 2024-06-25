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
import { CreateImprssnSchema } from './CreateImprssnForm';

export const ContentField = ({ control }: { control: Control<CreateImprssnSchema, any> }) => {
  return (
    <FormField
      control={control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>남길 인상</FormLabel>
          <FormControl>
            <Input placeholder="넌 참 멋진 친구구나!" {...field} />
          </FormControl>
          <FormDescription>좋은 인상을 남기도록 해요.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
