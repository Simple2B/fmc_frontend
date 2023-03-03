import { ComponentMeta, ComponentStory } from '@storybook/react';
import SignUpStudent, { ISignUp } from './SignUp';
import { mockBaseSignUpPageProps } from './SignUp.mocks';

export default {
  title: 'form/SignUpStudent',
  component: SignUpStudent,
  argTypes: {},
} as ComponentMeta<typeof SignUpStudent>;

const Template: ComponentStory<typeof SignUpStudent> = (args) => (
  <SignUpStudent {...args} />
);

export const SignUpStudentPage = Template.bind({});

SignUpStudentPage.args = {
  ...mockBaseSignUpPageProps,
} as ISignUp;
