import { Meta, StoryFn } from '@storybook/react';
import Button from '@/components/Button';
import { ButtonProps } from '@/lib/types/button';

export default {
  title: 'Components/Button',
  component: Button,
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

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Custom = Template.bind({});
Custom.args = {
  mode: 'primary',
  children: '저장',
  onClick: () => alert('Button clicked!'),
};

export const White = Template.bind({});
White.args = {
  mode: 'white',
  children: '취소',
  onClick: () => alert('Button clicked!'),
};
