import { ComponentMeta, ComponentStory } from '@storybook/react';
import SignIn, { ISignIn } from './SignIn';
import { mockBaseSignInProps } from './SignIn.mocks';

export default {
  title: 'form/SignIn',
  component: SignIn,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof SignIn>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SignIn> = (args) => <SignIn {...args} />;

export const BaseSignIn = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

BaseSignIn.args = {
  ...mockBaseSignInProps,
} as ISignIn;
