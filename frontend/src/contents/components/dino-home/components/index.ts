export { Dino } from './dino/dino';
export { Feed } from './feed/feed';
export { FeedBowl } from './feed-bowl/feed-bowl';
export { FeedButton } from './feed-button/feed-button';

import styleFeedBowl from 'data-text:./feed-bowl/feed-bowl.module.css';
import styleFeedButton from 'data-text:./feed-button/feed-button.module.css';

export const styleText = styleFeedBowl + styleFeedButton;
