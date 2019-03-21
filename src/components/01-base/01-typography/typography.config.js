module.exports = {
  title: 'Typography',
  label: 'Typography',
  status: 'prototype',
  default: 'regular',
  context: {
    heading: 'The quick brown fox jumps over the lazy dog.',
  },
  variants: [
    {
      name: 'regular',
      label: 'Regular',
      context: {
        name: 'regular',
        sizes: ['0', '1', '2', '3', '4', '5'],
      },
    },
    {
      name: 'bold',
      label: 'Bold',
      context: {
        name: 'bold',
        sizes: ['0', '1', '2', '3', '4', '5', '6'],
      },
    },
    {
      name: 'uppercase',
      label: 'Uppercase',
      context: {
        name: 'uppercase',
        weights: ['bold', 'semi-bold'],
        sizes: ['0', '1', '2', '3', '4', '5'],
      },
    },
  ],
};
