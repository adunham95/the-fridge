import React from "react"
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {Avatar} from './Avatar';
import theme from "../../theme/theme.json"

export default {
  title: 'Avatar',
  component: Avatar,
  argTypes: {
      rounded: {
          control: "boolean",
      },
      color: {
        control: { type: 'color' }, // Automatically inferred when 'options' is defined
      },
      name: {
          control: {type: "text"},
      },
      mouseToggle: {
          table: {
            disable: true,
        },
    },
  },
// eslint-disable-next-line prettier/prettier
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args}/>

export const Primary = Template.bind({});
Primary.args = {
    color: theme.BASE_COLOR.brand,
    name: "Adam Savage",
};

export const Rounded = Template.bind({});
Rounded.args = {
    color: theme.BASE_COLOR.brand,
    name: "Adam Savage",
    rounded: true,
};