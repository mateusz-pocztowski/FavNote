import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Input from './Input';

export default {
  title: 'Atoms/Input',
  decorators: [withKnobs],
};

export const Normal = () => <Input placeholder="login" />;

export const withIcon = () => <Input placeholder="Search" search />;
