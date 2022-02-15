import React from "react"
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {Toast} from './Toast';
import { EIcons } from "../Icons";
import theme from "../../theme/theme.json"

export default {
  title: 'Alert/Toast',
  component: Toast,
  argTypes: {
      color: {
        control: { type: 'color' }, // Automatically inferred when 'options' is defined
      },
      children: {
          control: {type: "text"},
      },
  },
// eslint-disable-next-line prettier/prettier
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => <Toast {...args}/>

export const Primary = Template.bind({});
Primary.args = {
    
};

export const Alert = Template.bind({});
Alert.args = {
    icon: EIcons.EXCLAMATION,
    color: theme.BASE_COLOR.error,
    children: "Alert Message",
};

export const Warn = Template.bind({});
Warn.args = {
    icon: EIcons.EXCLAMATION_TRIANGLE,
    color: theme.BASE_COLOR.warning,
    children: "Warning Message",
};

export const Info = Template.bind({});
Info.args = {
    icon: EIcons.INFO,
    color: theme.BASE_COLOR["brand-blue"],
    children: "Info Message",
};

export const Success = Template.bind({});
Success.args = {
    icon: EIcons.THUMB_UP,
    color: theme.BASE_COLOR.success,
    children: "Success Message",
};