import blueEgg from 'data-base64:~/../assets/eggs/egg-blue.gif';
import greenEgg from 'data-base64:~/../assets/eggs/egg-green.gif';
import pinkEgg from 'data-base64:~/../assets/eggs/egg-pink.gif';
import type { ChangeEventHandler } from 'react';
import * as styles from './select-color.module.css';

type SelectColorProps = {
  onChangeColorHandler: ChangeEventHandler<HTMLInputElement>;
};

const radios = [
  { img: blueEgg, label: 'blue', default: false },
  { img: greenEgg, label: 'green', default: true },
  { img: pinkEgg, label: 'pink', default: false },
];

export const SelectColor = ({ onChangeColorHandler }: SelectColorProps) => {
  return (
    <fieldset className={styles.group}>
      {radios.map((radio) => (
        <>
          <input
            className={styles.input}
            id={radio.label}
            type="radio"
            name="radio"
            value={radio.label}
            onChange={onChangeColorHandler}
            defaultChecked={radio.default}
          />
          <label className={styles.label} htmlFor={radio.label}>
            <img src={radio.img} alt={`${radio.label} egg`} />
          </label>
        </>
      ))}
    </fieldset>
  );
};
