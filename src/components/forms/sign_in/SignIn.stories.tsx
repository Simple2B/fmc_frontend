import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/index';

import SignIn from './SignIn';

export default {
  title: 'Forms/Sing In',
  component: SignIn,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof SignIn>;

const Template: ComponentStory<typeof SignIn> = (args) => <SignIn {...args} />;

export const SingIn = Template.bind({});
SingIn.args = {};
