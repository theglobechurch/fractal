module.exports = {
  status: 'wip',
  name: 'description-box',
  label: 'Description Box',
  context: {
    flip: false,
  },
  variants: [
    {
      name: 'default',
      label: 'Photo left',
      context: {
        title: 'The Globe Church is all about Jesus…',
        body: ['We’re a church that proclaims the good news of Jesus Christ. Whether you are passing through London for a weekend, or living locally in Southwark when you come to The Globe Church you’re going to hear the Bible preached.'],
        img: {
          2560: '/assets/img/blocks/vision-box/img/jonty-2560.jpg',
          1920: '/assets/img/blocks/vision-box/img/jonty-1920.jpg',
          1280: '/assets/img/blocks/vision-box/img/jonty-1280.jpg',
          960: '/assets/img/blocks/vision-box/img/jonty-960.jpg',
          640: '/assets/img/blocks/vision-box/img/jonty-640.jpg',
          320: '/assets/img/blocks/vision-box/img/jonty-320.jpg',
        },
        theme: 'sockeye',
      },
    },
    {
      name: 'photo-right',
      label: 'Photo right',
      context: {
        title: 'Involved in the greatest mission',
        body: ['Borough in London is where we met as a church family, and we are called to share the good news of Jesus Christ to the people there…'],
        img: {
          2560: '/assets/img/blocks/vision-box/img/mission-2560.jpg',
          1920: '/assets/img/blocks/vision-box/img/mission-1920.jpg',
          1280: '/assets/img/blocks/vision-box/img/mission-1280.jpg',
          960: '/assets/img/blocks/vision-box/img/mission-960.jpg',
          640: '/assets/img/blocks/vision-box/img/mission-640.jpg',
          320: '/assets/img/blocks/vision-box/img/mission-320.jpg',
        },
        theme: 'lark-green',
        flip: true,
      },
    },
    {
      name: 'sermon-series',
      label: 'Sermon series',
      context: {
        title: 'Philemon: For Love\'s Sake',
        body: ['In the book of Philemon, Paul writes to a local church leader calling him to gospel love. In this series we’re going to see that gospel love will push us further and deeper than we could ever imagine.'],
        img: {
          2560: '/assets/img/phi-2560.jpg',
          1920: '/assets/img/phi-1920.jpg',
          1280: '/assets/img/phi-1280.jpg',
          960: '/assets/img/phi-960.jpg',
          640: '/assets/img/phi-640.jpg',
          320: '/assets/img/phi-320.jpg',
        },
        theme: 'lark-green',
        flip: false,
        series: {
          imgVariant: 'square',
          meta: [
            'July – August 2017',
            '5 recordings',
          ],
          list: true,
        },
      },
    },
    {
      name: 'person-profile',
      label: 'Person profile',
      context: {
        title: 'Jonty Allcock',
        body: [
          'I love Jesus because he first loved me. When I was far away from him, he gave his life to save me. That is a staggering fact that humbles me and at the same time lifts up my head.',
          'My journey began in Southampton. I grew up in a home that was (not perfect but) full of Jesus. I left home to study Chemistry at Oxford and was confronted with a challenging question: Had I been brainwashed, or did I really believe this? It was a struggle. I found university very hard. But as I looked closely into the Bible, I came to the deep conviction that it is true. My experience of living the Christian life has shown me that struggling and growing seem to go hand in hand.',
          'On leaving university, I married Linda, and together we moved to Enfield in North London. For the next seven years, I was involved in and trained in local church ministry. I was then involved in planting a new church in Enfield where I was the pastor for seven years.',
          'I have now moved into Central London (with Linda and my three boys) to continue the journey of faith here. I am far from perfect, but Jesus is a patient and wonderful king. It is my great honour to serve him at The Globe Church.',
        ],
        img: {
          2560: '/assets/img/phi-2560.jpg',
          1920: '/assets/img/phi-1920.jpg',
          1280: '/assets/img/phi-1280.jpg',
          960: '/assets/img/phi-960.jpg',
          640: '/assets/img/phi-640.jpg',
          320: '/assets/img/phi-320.jpg',
        },
        theme: 'lark-green',
        flip: false,
        series: {
          imgVariant: 'circle',
        },
      },
    },
  ],
};
