module.exports = {
  title: 'content-box',
  label: 'Content box',
  status: 'wip',
  context: {
    className: 'c-content-box',
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
          location: '#',
        },
      },
    },
    {
      name: 'with icon list',
      label: 'With Icon List',
      context: {
        className: 'c-content-box',
        body: ['Do you want to have a deeper experience of what it means to know Christ? Do you want to have a deeper experience of life? We want to experience and understand more. We’ve been working our way through this letter, today we’re focusing on verses 4 through 7. In these verses Paul says something really important; he talks about what gospel love looks like in the church… and it’s not about standing still– it’s about know Jesus more.'],
        aside: true,
        icons: true,
      },
    },
    {
      name: 'event details',
      label: 'Event Details',
      context: {
        className: 'c-content-box',
        bodyImg: '/assets/img/blocks/content-box/img/sunday-service',
        body: [
          'Getting together on a Sunday is the high point of our week. We gather because we want to worship God, help one another, and be challenged and encouraged by God’s Word.',
          'Our gathering has two parts. Firstly, there is the church service, which lasts about eighty minutes. During that time, we sing God’s praise, pray to him together as a church, and hear the Word of God preached. Secondly, we spend time as a church family talking and eating together. The hour after the service has become a brilliant time for us to build our family life as a church.',
          'Globe Kids and Globe Minis are our Sunday children\'s groups. Globe Minis is our group for babies to Year 4, and Globe Kids is for children and young people in Year 5 to Year 9. Our Kids group meets every other Sunday during the service, whilst Minis meet every week. This is a time crafted especially for children, with a focus on teaching them more about who Jesus is and what that means for them. A typical session involves Bible teaching, games, craft, sport, and play - all designed to help them get to grips with the person of Jesus in the Bible.',
        ],
        aside: [
          {
            title: 'Every Sunday',
            subtitle: '4.30–6.00pm',
            small: 'You\'re invited to a meal after the service',
          },
          {
            title: 'New Hunt\'s House',
            subtitle: 'Guy\'s Campus,<br />Newccomen Street,<br />SE1 1UL',
            small: 'London Bridge / Borough',
          },
        ],
        icons: false,
        map: true,
      },
    },
    {
      name: 'with lead image',
      label: 'With Lead Image',
      context: {
        body: [
          'Globe Church gathers every Sunday at 4.30pm to worship, to pray, to hear from God\'s word',
          'Current series:<br /><a class="u-link u-link--arrowed u-link--black">1 Corinthians: (un)Impressive</a>',
        ],
        className: 'c-content-box',
        header: {
          img: {
            2560: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-2560.jpg',
            1920: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-1920.jpg',
            1280: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-1280.jpg',
            960: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-960.jpg',
            640: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-640.jpg',
            320: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-320.jpg',
          },
          title: 'Sunday services',
          subtitle: 'Every week at 4.30pm',
        },
        aside: true,
        actionBtn: 'Get directions',
      },
    },
    {
      name: 'with all the content',
      label: 'With all the content',
      context: {
        body: [
          'The Bible uses several pictures of the church to illustrate the idea of <a href="#">membership</a>. For example, the parts of a body, bricks in a building, soldiers in an army and perhaps most powerfully members of one family. These pictures all contain the idea of belonging, it is much more than attending. Church isn’t supposed to be a spectator sport. It is much more of a family who are all involved in different ways to make the family work properly.',
          'Therefore we believe that anyone who is trusting Jesus and has decided to make Globe church their home is a member of the family.',
          'We then encourage those who are members at the Globe Church to express that membership publicly by becoming part of our formal membership. It can be really easy to float around various churches in London and we think that is unhelpful. Membership expresses a commitment to one local church family. It is also legally how we are constituted. There are regular church members meetings and any changes in church leadership need to be agreed by a vote of the membership.',
          'Becoming a member means simply filling in a form that contains these four ideas:',
          '<ol><li>I commit (this is my church family)</li><li>I need (I can’t go it alone)</li><li>I entrust (I want this church to look out for me)</li><li>I give (I want to be involved in the mission)</li></ol>',
          'Membership forms can be found at the back of church. If you are interested then fill in a form or chat to one of the elders.',
        ],
        className: 'c-content-box',
        header: {
          img: {
            2560: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-2560.jpg',
            1920: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-1920.jpg',
            1280: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-1280.jpg',
            960: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-960.jpg',
            640: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-640.jpg',
            320: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-320.jpg',
          },
          title: 'Membership',
          subtitle: 'Committing, needing, entrusting, giving',
        },
        textFocus: true,
      },
    },
    {
      name: 'with expander section',
      context: {
        body: [
          'Following Jesus is not an individual thing. Part of the genius of God’s plan is that he is creating a new humanity. He is saving a community of people.',
          'The scope of God’s plan is seen in this vision of the future:',
          'After this I looked, and there before me was a great multitude that no one could count, from every nation, tribe, people and language, standing before the throne and before the Lamb. (Revelation 7:9, NIVUK).',
          'God\'s plan is to save a great diversity of people.',
        ],
        className: 'c-content-box',
        header: {
          img: {
            2560: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-2560.jpg',
            1920: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-1920.jpg',
            1280: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-1280.jpg',
            960: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-960.jpg',
            640: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-640.jpg',
            320: '/assets/img/templates/series-and-resources/img/series-and-resources-banner-320.jpg',
          },
          title: 'Made up of all sorts of people',
        },
        hidden: {
          nav: true,
          section: [
            {
              title: 'Staff',
              body: [
                'The Globe Church is about the whole church family living as disciples of Christ, but a few people have especially committed to serve the church and work to see its vision flourish. We call them our Staff Team.',
              ],
            },
            {
              title: 'Eldership',
              body: [
                'The elders have the joy and responsibility, under God, for prayerfully leading The Globe Church, setting the vision and direction, and ensuring that we remain firmly true to the Bible in all that we do. Through the preaching and teaching, we seek to clearly point to Jesus, applying his Word for people in all stages of life and faith.',
                'The elders have overall pastoral concern for the spiritual and practical needs of the church family. We are also passionate about training and equipping others both to serve Jesus in the church, and to live for him through all of life.  We long to see God use us all at Globe Church to show Jesus to those we meet day by day.',
                'We would love to welcome you into our church family and for you to be ‘at home’ here.  We always want to be approachable. Please come and find one (or more!) of us for a friendly conversation so we can get to know you better.',
              ],
            },
          ],
        },
        textFocus: true,
      },
    },
  ],
};
