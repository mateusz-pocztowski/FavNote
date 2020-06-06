import React from 'react';
import StoryRouter from 'storybook-react-router';
import Sidebar from './Sidebar';

export default {
  title: 'Organisms/Sidebar',
  decorators: [StoryRouter()],
};

export const Note = () => <Sidebar />;
