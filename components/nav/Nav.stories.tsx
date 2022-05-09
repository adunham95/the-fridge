import React from "react"
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Nav from './Nav';
import { ERoutes } from "../../models/Routes";
import { EIcons } from "../Icons";

export default {
  title: 'Layout/Nav',
  component: Nav,
// eslint-disable-next-line prettier/prettier
} as ComponentMeta<typeof Nav>;

const Template: ComponentStory<typeof Nav> = (args) => <Nav {...args}/>

export const Primary = Template.bind({});
Primary.args = {
    navMenu: [
      {
        path: ERoutes.WALL,
        title: 'Wall',
        icon: EIcons.BOOK,
        exact: true,
        showIf: {
          loggedIn: true,
        },
      },
    ],
};