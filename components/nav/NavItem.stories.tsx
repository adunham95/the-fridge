import React from "react"
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NavItem from './NavItem';
import { EIcons } from "../Icons";

export default {
  title: 'Layout/NavItem',
  component: NavItem,
  argTypes: {
    icon: {
        options: EIcons,
        control: { type: 'select' }, // Automatically inferred when 'options' is defined
      },
  }
// eslint-disable-next-line prettier/prettier
} as ComponentMeta<typeof NavItem>;

const Template: ComponentStory<typeof NavItem> = (args) => <NavItem {...args}/>

export const Primary = Template.bind({});
Primary.args = {
    icon: EIcons.HOME
};