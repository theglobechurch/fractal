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
        list: true
      }
    },
    {
      name: 'with lead image',
      label: 'With Lead Image',
      context: {
        body: [
          'Globe Church gathers every Sunday at 4.30pm to worship, to pray, to hear from God\'s word',
          'Current series:<br /><a class="u-link u-link--arrowed u-link--black">1 Corinthians: (un)Impressive</a>'
        ],
        className: 'c-content-box',
        header: {
          img: {
            2560: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-2560.jpg',
            1920: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-1920.jpg',
            1280: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-1280.jpg',
            960: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-960.jpg',
            640: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-640.jpg',
            320: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-320.jpg'
          },
          title: 'Sunday services',
          subtitle: 'Every week at 4.30pm'
        },
        list: true,
        actionBtn: 'Get directions'
      }
    }
  ]
};
