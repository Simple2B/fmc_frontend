import { ComponentMeta, ComponentStory } from '@storybook/react';

import SignIn from './SignIn';

export default {
  title: 'Forms/Sing In',
  component: SignIn,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [(Story) => <Story />],
} as ComponentMeta<typeof SignIn>;

const Template: ComponentStory<typeof SignIn> = (args) => <SignIn {...args} />;

export const SingIn = Template.bind({});
SingIn.args = {};
