module.exports = {
  context: {
    list: [
      {
        text: 'Listen now',
        href: '#',
        icon: 'listen',
      },
      {
        text: 'Download',
        href: '#',
        icon: 'download',
      },
      {
        text: 'Subscribe',
        href: '#',
        icon: 'subscribe',
      },
    ],
  },
  variants: [
    {
      name: 'small',
      context: {
        modifiers: ['small'],
        list: [
          {
            text: 'Jonty Allcock',
            icon: 'person',
          },
          {
            text: '14 August 2017',
            icon: 'calendar',
          },
        ],
      },
    },
  ],
};
