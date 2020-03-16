module.exports = {
  title: 'banner',
  label: 'Page banner',
  status: 'ready',
  context: {
    className: 'c-banner',
    img: {
      2560: '/assets/img/globals/banner/img/southbank-2560.jpg',
      1920: '/assets/img/globals/banner/img/southbank-1920.jpg',
      1280: '/assets/img/globals/banner/img/southbank-1280.jpg',
      960: '/assets/img/globals/banner/img/southbank-960.jpg',
      640: '/assets/img/globals/banner/img/southbank-640.jpg',
      320: '/assets/img/globals/banner/img/southbank-320.jpg',
    },
    title: 'The Globe Church',
    subtitle: 'A church for the Southbank',
  },
  variants: [
    {
      name: 'scripture-reference',
      label: 'With scripture reference',
      context: {
        scriptureReference: 'Philemon 1:1-4',
      },
    },
    {
      name: 'small',
      label: 'Small',
      context: {
        variant: ['small'],
      },
    },
    {
      name: 'blurred',
      label: 'Blurred',
      context: {
        variant: ['blurred'],
      },
    },
    {
      name: 'video',
      label: 'Video',
      context: {
        variant: ['video'],
        video: 'https://www.youtube.com/embed/wIWt0kTtp3U'
      }
    }
  ],
};
