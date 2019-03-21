module.exports = {
  name: 'internal-navigation',
  label: 'Internal navigation',
  status: 'wip',
  context: {
    navList: [
      'Sundays',
      'Bible study',
      'Prayer meeting',
    ],
  },
  variants: [
    {
      name: 'internal-nav-in-content-box',
      label: 'in content box',
      context: {
        cls: ['content-box'],
      },
    },
  ],
};
