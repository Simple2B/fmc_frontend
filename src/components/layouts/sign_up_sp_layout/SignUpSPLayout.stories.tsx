import { ComponentMeta, ComponentStory } from '@storybook/react';
import SignUpStartPage from '../../../components/forms/sign_up_start_page/SignUpStartPage';
import SignUpSPLayout, { ISignUpSPLayout } from './SignUpSPLayout';
import { mockSignUpSPLayoutProps } from './SignUpSPLayout.mocks';

export default {
  title: 'Templates/BaseTemplate',
  component: SignUpSPLayout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof SignUpSPLayout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SignUpSPLayout> = (args) => (
  <SignUpSPLayout {...args} />
);

export const SignUpStartPageLayout = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

SignUpStartPageLayout.args = {
  children: <SignUpStartPage />,
  ...mockSignUpSPLayoutProps.base,
} as ISignUpSPLayout;
