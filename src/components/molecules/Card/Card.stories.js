import React from 'react';
import Card from './Card';

export default {
  title: 'Molecules/Card',
};

export const Notes = () => <Card cardType="notes" />;
export const Twitters = () => <Card cardType="twitters" />;
export const Articles = () => <Card cardType="articles" />;
