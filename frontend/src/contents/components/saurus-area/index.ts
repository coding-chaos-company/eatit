import styleFeedBowl from 'data-text:./feed-bowl/feed-bowl.module.css';
import styleFeed from 'data-text:./feed/feed.module.css';
import styleSaurusArea from 'data-text:./saurus-area.module.css';
import styleSaurus from 'data-text:./saurus/saurus.module.css';

export const styleTextSaurusArea = `
${styleSaurusArea}
${styleFeedBowl}
${styleSaurus}
${styleFeed}
`;

export { SaurusArea } from './saurus-area';
