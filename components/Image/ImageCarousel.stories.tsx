import React from "react"

import { ComponentStory, ComponentMeta } from '@storybook/react';

import {ImageCarousel }from './ImageCarousel';

export default {
  title: 'Image Carousel',
  component: ImageCarousel,
  
// eslint-disable-next-line prettier/prettier
} as ComponentMeta<typeof ImageCarousel>;

const Template: ComponentStory<typeof ImageCarousel> = (args) => <ImageCarousel {...args}/>

export const Primary = Template.bind({});

Primary.args = {
    images: []
};
