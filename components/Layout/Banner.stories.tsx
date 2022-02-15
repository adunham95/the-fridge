import React from "react"
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Banner from './Banner';

export default {
  title: 'Alert/Banner',
  component: Banner,
  argTypes: {
      color: {
        control: { type: 'color' }, // Automatically inferred when 'options' is defined
      },
  },
// eslint-disable-next-line prettier/prettier
} as ComponentMeta<typeof Banner>;

const Template: ComponentStory<typeof Banner> = (args) => <Banner {...args}/>

export const Primary = Template.bind({});
Primary.args = {
    id: "test",
};