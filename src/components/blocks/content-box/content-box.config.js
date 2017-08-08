module.exports = {
  title: 'content-box',
  label: 'Content box',
  status: 'wip',
  context: {
    className: 'c-content-box'
  },
  variants: [
    {
      name: 'default',
      label: 'One column',
      context: {
        title: 'Join us this Sunday',
        subtitle: '4pm at Wilcox House, 140-148 Borough High Street',
        link: {
          icon: 'map',
          text: 'View on a map',
          location: '#'
        }
      }
    },
    {
      name: 'two-one-col',
      label: 'Two:One column',
      context: {
        title: 'Join us this Sunday',
        subtitle: '4pm at Wilcox House, 140-148 Borough High Street',
        link: {
          icon: 'map',
          text: 'View on a map',
          href: '#'
        }
      }
    }
  ]
};
