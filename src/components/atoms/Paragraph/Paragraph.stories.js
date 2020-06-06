import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Paragraph from './Paragraph';

export default {
  title: 'Atoms/Paragraph',
  decorators: [withKnobs],
};

export const Normal = () => <Paragraph>Hello Roman</Paragraph>;
