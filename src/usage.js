import { doesBrowserSupportSticky } from './stickybits-class';
import stickybits from './stickybits-class';

console.log(doesBrowserSupportSticky());
const target = document.getElementsByTagName('a')[0];
stickybits(target);
