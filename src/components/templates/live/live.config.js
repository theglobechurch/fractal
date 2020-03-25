module.exports = {
  status: 'wip',
  context: {

    banner: {
      className: 'c-banner',
      variant: ['video'],
      video: 'https://www.youtube.com/embed/wIWt0kTtp3U',
      title: 'About Globe Church',
      subtitle: 'The Globe Church is all about sharing the good news of Jesus Christ to those living and working on the Southbank of London.',
    },

    intro: {
      className: 'c-content-box',
      title: 'The Globe Church Livestream',
      subtitle: 'For the next few weeks we are unable to meet as normal…',
      body: ['Church is about gathering together as God’s people. We think that is a precious and wonderful thing. There are occasions when gathering is not possible and at those times a livestream can help us until we can gather again. We hope this livestream of our service can serve you in that way. This will never be able to replace the gathering, it is not as good as the gathering, but as a short term solution it can help us as a church family. We hope you will find it a blessing to join with us.'],
      aside: true,
      icons: true,

      iconList: {
        list: [
          {
            text: 'Exploring Christianity?',
            href: 'https://www.christianityexplored.org/Groups/276316/Home/CE_ORG/What_is_Christianity/What_is_Christianity.aspx',
            icon: 'christianity-explored',
          },
          {
            text: 'Discuss Sunday\'s sermon',
            href: 'https://one21.org',
            icon: 'one21',
          },
        ]
      }
    },



    promobox: {
      className: 'c-promo-box',
      href: '#',
      title: 'Church leadership',
      cta: 'Find out more',
      img: {
        2560: '/assets/img/phi-2560.jpg',
        1920: '/assets/img/phi-1920.jpg',
        1280: '/assets/img/phi-1280.jpg',
        960: '/assets/img/phi-960.jpg',
        640: '/assets/img/phi-640.jpg',
        320: '/assets/img/phi-320.jpg',
      },
    },
  },
};
