module.exports = {
  name: 'image',
  context: {
    src: '/assets/img/habakkuk-960.jpg',
    caption: 'Habakkuk: Worth waiting for'
  },
  variants: [
    {
      name: 'Full width',
      context: {
        modifiers: ['full-width'],
        src: '/assets/img/ruth-960.jpg',
        caption: 'Ruth: He noticed me'
      }
    },
    {
      name: 'Float left',
      context: {
        modifiers: ['float-left'],
        src: '/assets/img/1cor-960.jpg',
        caption: '1 Corinthians: Are you impressed?'
      }
    },
    {
      name: 'Float right',
      context: {
        modifiers: ['float-right'],
        src: '/assets/img/phi-960.jpg',
        caption: 'Philemon: For love\'s sake'
      }
    }
  ]
};
