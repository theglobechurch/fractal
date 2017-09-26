import svg4everybody from 'svg4everybody';
import navToggle from '../../components/globals/header';
import audioPlayer from '../../components/blocks/audio-player';
import contentBox from '../../components/blocks/content-box';

require('../../components/00-mixins/modernizr/index.js');
require('../../components/services/polyfill-object-fit/index.js');

svg4everybody();
navToggle();
audioPlayer();
contentBox();
