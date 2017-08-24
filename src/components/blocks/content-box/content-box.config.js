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
    },
    {
      name: 'with all the content',
      label: 'With all the content',
      context: {
        body: [
          'The Bible uses several pictures of the church to illustrate the idea of membership. For example, the parts of a body, bricks in a building, soldiers in an army and perhaps most powerfully members of one family. These pictures all contain the idea of belonging, it is much more than attending. Church isn’t supposed to be a spectator sport. It is much more of a family who are all involved in different ways to make the family work properly.',
          'Therefore we believe that anyone who is trusting Jesus and has decided to make Globe church their home is a member of the family.',
          'We then encourage those who are members at the Globe Church to express that membership publicly by becoming part of our formal membership. It can be really easy to float around various churches in London and we think that is unhelpful. Membership expresses a commitment to one local church family. It is also legally how we are constituted. There are regular church members meetings and any changes in church leadership need to be agreed by a vote of the membership.',
          'Becoming a member means simply filling in a form that contains these four ideas:',
          '<ol><li>I commit (this is my church family)</li><li>I need (I can’t go it alone)</li><li>I entrust (I want this church to look out for me)</li><li>I give (I want to be involved in the mission)</li></ol>',
          'Membership forms can be found at the back of church. If you are interested then fill in a form or chat to one of the elders.'
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
          title: 'Membership',
          subtitle: 'Committing, needing, entrusting, giving'
        },
        textFocus: true
      }
    }
  ]
};
