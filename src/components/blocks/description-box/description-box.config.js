module.exports = {
  status: 'wip',
  name: 'description-box',
  label: 'Description Box',
  context: {
    flip: false
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
          320: '/assets/img/blocks/vision-box/img/jonty-320.jpg'
        },
        theme: 'sockeye'
      }
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
          320: '/assets/img/blocks/vision-box/img/mission-320.jpg'
        },
        theme: 'lark-green',
        flip: true
      }
    }
  ]
};
