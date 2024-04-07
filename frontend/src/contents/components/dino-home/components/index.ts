export { Dino } from './dino/dino';
export { Feed } from './feed/feed';
export { FeedBowl } from './feed-bowl/feed-bowl';
export { FeedButton } from './feed-button/feed-button';
export { Grass } from './grass/grass';

import styleFeedBowl from 'data-text:./feed-bowl/feed-bowl.module.css';
import styleFeedButton from 'data-text:./feed-button/feed-button.module.css';
import styleGrass from 'data-text:./grass/grass.module.css';

export const styleText = styleFeedBowl + styleFeedButton + styleGrass;
