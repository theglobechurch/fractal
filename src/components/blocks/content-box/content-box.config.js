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
      name: 'with icon list',
      label: 'With Icon List',
      context: {
        className: 'c-content-box',
        body: ['Do you want to have a deeper experience of what it means to know Christ? Do you want to have a deeper experience of life? We want to experience and understand more. We’ve been working our way through this letter, today we’re focusing on verses 4 through 7. In these verses Paul says something really important; he talks about what gospel love looks like in the church… and it’s not about standing still– it’s about know Jesus more.'],
        iconList: true
      }
    }
  ]
};
