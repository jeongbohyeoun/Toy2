import { InputProps } from '@/lib/types/input';
import Input from '@/components/Input';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    mode: {
      control: {
        type: 'select',
        options: ['primary', 'white'],
      },
    },
    children: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<InputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: '입력창',
  color: 'primary',
  name: 'name',
  placeholder: '입력하세요',
  type: 'text',
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  ...Default.args,
  error: true,
  errorMessage: '오류 메시지가 표시됩니다.',
};
