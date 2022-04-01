import React from "react"
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {Button} from './Button'
import theme from "../../theme/theme.json"

export default {
  title: 'Input/Button',
  component: Button,
  argTypes: {
      rounded: {
          control: "boolean",
      },
      children: {
          control: {type: "text"},
      },
      buttonStyle: {
          control: "select",
      },
      onClick: {
          table: {
            disable: true,
        },
    },
      type: {
        control: 'select',
        options: ["button", "submit", "reset"],
    },
  },
// eslint-disable-next-line prettier/prettier
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}/>

export const Primary = Template.bind({});
Primary.args = {
    children: "Button Text",
    size: 'base',
};  

export const Text = Template.bind({});
Text.args = {
    children: "Button Text",
    size: 'base',
};