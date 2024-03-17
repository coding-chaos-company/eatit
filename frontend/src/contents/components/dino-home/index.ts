import styleFeedBowl from 'data-text:./feed-bowl/feed-bowl.module.css';
import styleFeed from 'data-text:./feed/feed.module.css';
import styleDinoHome from 'data-text:./dino-home.module.css';
import styleDino from 'data-text:./dino/dino.module.css';

export const styleTextDinoHome = `
${styleDinoHome}
${styleFeedBowl}
${styleDino}
${styleFeed}
`;

export { DinoHome } from './dino-home';
