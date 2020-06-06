import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Heading from 'components/atoms/Heading/Heading';

export default {
  title: 'Atoms/Heading',
  decorators: [withKnobs],
};

export const Normal = () => <Heading>Hello Roman</Heading>;

export const Big = () => <Heading big>Hello Roman</Heading>;
