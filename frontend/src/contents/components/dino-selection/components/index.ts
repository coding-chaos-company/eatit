export { EggSplit } from './egg-split/egg-split';
export { StartButton } from './start-button/start-button';

import styleEggSplit from 'data-text:./egg-split/egg-split.module.css';
import styleSelectColor from 'data-text:./select-color/select-color.module.css';
import styleStartButton from 'data-text:./start-button/start-button.module.css';

export const styleText = `${styleSelectColor} ${styleStartButton} ${styleEggSplit}`;
