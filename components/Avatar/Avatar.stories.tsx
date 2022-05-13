import React from "react"
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {Avatar} from './Avatar';

export default {
  title: 'Avatar',
  component: Avatar,
  argTypes: {
      color: {
        control: { type: 'color' }, // Automatically inferred when 'options' is defined
      },
  },
  args: {
    height: 'h-[2.5em]',
    width: 'w-[2.5em]',
},
// eslint-disable-next-line prettier/prettier
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args}/>

export const Primary = Template.bind({});
Primary.args = {
    rounded: false,
};

export const Rounded = Template.bind({});
Rounded.args = {
    rounded: true,
};