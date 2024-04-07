// runtime.getURLだとチラつく時があるので全部importする
import bendBrachio1Blue from 'data-base64:~/../assets/dinos/bend-brachio-1-blue.gif';
import bendBrachio1Green from 'data-base64:~/../assets/dinos/bend-brachio-1-green.gif';
import bendBrachio1Pink from 'data-base64:~/../assets/dinos/bend-brachio-1-pink.gif';
import bendBrachio2Blue from 'data-base64:~/../assets/dinos/bend-brachio-2-blue.gif';
import bendBrachio2Green from 'data-base64:~/../assets/dinos/bend-brachio-2-green.gif';
import bendBrachio2Pink from 'data-base64:~/../assets/dinos/bend-brachio-2-pink.gif';
import bendBrachio3Blue from 'data-base64:~/../assets/dinos/bend-brachio-3-blue.gif';
import bendBrachio3Green from 'data-base64:~/../assets/dinos/bend-brachio-3-green.gif';
import bendBrachio3Pink from 'data-base64:~/../assets/dinos/bend-brachio-3-pink.gif';
import bendBrachio4Blue from 'data-base64:~/../assets/dinos/bend-brachio-4-blue.gif';
import bendBrachio4Green from 'data-base64:~/../assets/dinos/bend-brachio-4-green.gif';
import bendBrachio4Pink from 'data-base64:~/../assets/dinos/bend-brachio-4-pink.gif';
import eatBrachio1Blue from 'data-base64:~/../assets/dinos/eat-brachio-1-blue.gif';
import eatBrachio1Green from 'data-base64:~/../assets/dinos/eat-brachio-1-green.gif';
import eatBrachio1Pink from 'data-base64:~/../assets/dinos/eat-brachio-1-pink.gif';
import eatBrachio2Blue from 'data-base64:~/../assets/dinos/eat-brachio-2-blue.gif';
import eatBrachio2Green from 'data-base64:~/../assets/dinos/eat-brachio-2-green.gif';
import eatBrachio2Pink from 'data-base64:~/../assets/dinos/eat-brachio-2-pink.gif';
import eatBrachio3Blue from 'data-base64:~/../assets/dinos/eat-brachio-3-blue.gif';
import eatBrachio3Green from 'data-base64:~/../assets/dinos/eat-brachio-3-green.gif';
import eatBrachio3Pink from 'data-base64:~/../assets/dinos/eat-brachio-3-pink.gif';
import eatBrachio4Blue from 'data-base64:~/../assets/dinos/eat-brachio-4-blue.gif';
import eatBrachio4Green from 'data-base64:~/../assets/dinos/eat-brachio-4-green.gif';
import eatBrachio4Pink from 'data-base64:~/../assets/dinos/eat-brachio-4-pink.gif';
import walkBrachio1Blue from 'data-base64:~/../assets/dinos/walk-brachio-1-blue.gif';
import walkBrachio1Green from 'data-base64:~/../assets/dinos/walk-brachio-1-green.gif';
import walkBrachio1Pink from 'data-base64:~/../assets/dinos/walk-brachio-1-pink.gif';
import walkBrachio2Blue from 'data-base64:~/../assets/dinos/walk-brachio-2-blue.gif';
import walkBrachio2Green from 'data-base64:~/../assets/dinos/walk-brachio-2-green.gif';
import walkBrachio2Pink from 'data-base64:~/../assets/dinos/walk-brachio-2-pink.gif';
import walkBrachio3Blue from 'data-base64:~/../assets/dinos/walk-brachio-3-blue.gif';
import walkBrachio3Green from 'data-base64:~/../assets/dinos/walk-brachio-3-green.gif';
import walkBrachio3Pink from 'data-base64:~/../assets/dinos/walk-brachio-3-pink.gif';
import walkBrachio4Blue from 'data-base64:~/../assets/dinos/walk-brachio-4-blue.gif';
import walkBrachio4Green from 'data-base64:~/../assets/dinos/walk-brachio-4-green.gif';
import walkBrachio4Pink from 'data-base64:~/../assets/dinos/walk-brachio-4-pink.gif';

export const assets = {
  bend: {
    brachio: {
      1: {
        blue: bendBrachio1Blue,
        green: bendBrachio1Green,
        pink: bendBrachio1Pink,
      },
      2: {
        blue: bendBrachio2Blue,
        green: bendBrachio2Green,
        pink: bendBrachio2Pink,
      },
      3: {
        blue: bendBrachio3Blue,
        green: bendBrachio3Green,
        pink: bendBrachio3Pink,
      },
      4: {
        blue: bendBrachio4Blue,
        green: bendBrachio4Green,
        pink: bendBrachio4Pink,
      },
    },
  },
  eat: {
    brachio: {
      1: {
        blue: eatBrachio1Blue,
        green: eatBrachio1Green,
        pink: eatBrachio1Pink,
      },
      2: {
        blue: eatBrachio2Blue,
        green: eatBrachio2Green,
        pink: eatBrachio2Pink,
      },
      3: {
        blue: eatBrachio3Blue,
        green: eatBrachio3Green,
        pink: eatBrachio3Pink,
      },
      4: {
        blue: eatBrachio4Blue,
        green: eatBrachio4Green,
        pink: eatBrachio4Pink,
      },
    },
  },
  walk: {
    brachio: {
      1: {
        blue: walkBrachio1Blue,
        green: walkBrachio1Green,
        pink: walkBrachio1Pink,
      },
      2: {
        blue: walkBrachio2Blue,
        green: walkBrachio2Green,
        pink: walkBrachio2Pink,
      },
      3: {
        blue: walkBrachio3Blue,
        green: walkBrachio3Green,
        pink: walkBrachio3Pink,
      },
      4: {
        blue: walkBrachio4Blue,
        green: walkBrachio4Green,
        pink: walkBrachio4Pink,
      },
    },
  },
} as const;
