module.exports = {
  title: 'alert-banner',
  label: 'Alert banner',
  status: 'ready',
  context: {
    tag: 'beta',
    type: 'alert',
    text: 'This site is under development – you can still go to the current <a href="http://theglobechurch.org">Globe Church website</a>.'
  },
  variants: [
    {
      name: 'Warning',
      context: {
        tag: 'warning',
        type: 'warn',
        text: 'This is a warning'
      }
    },
    {
      name: 'Danger',
      context: {
        tag: 'Alert',
        type: 'danger',
        text: 'This is a red message'
      }
    },
    {
      name: 'Success',
      context: {
        tag: 'good news',
        type: 'success',
        text: 'This is good news'
      }
    }
  ]
};
