import { ComponentMeta, ComponentStory } from '@storybook/react';
import SignUpStartPage, { ISignUpStartPage } from './SignUpStartPage';
import { mockBaseSignUpStartPageProps } from './SignUpStartPage.mocks';

export default {
  title: 'form/SignUpStartPage',
  component: SignUpStartPage,
  argTypes: {},
} as ComponentMeta<typeof SignUpStartPage>;

const Template: ComponentStory<typeof SignUpStartPage> = (args) => (
  <SignUpStartPage {...args} />
);

export const SignUpMainPage = Template.bind({});

SignUpMainPage.args = {
  ...mockBaseSignUpStartPageProps,
} as ISignUpStartPage;
