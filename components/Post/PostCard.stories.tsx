import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PostCard from './PostCard';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Post/Post Card',
  component: PostCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
// eslint-disable-next-line prettier/prettier
} as ComponentMeta<typeof PostCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PostCard> = (args) => <div className=' max-w-xs'><PostCard {...args}/></div>;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};