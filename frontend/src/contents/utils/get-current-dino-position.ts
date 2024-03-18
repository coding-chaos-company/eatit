import type { RefObject } from 'react';

export const getCurrentDinoPosition = <Parent extends HTMLElement, Child extends HTMLElement>(
  parent: RefObject<Parent>,
  child: RefObject<Child>
) => child.current.getBoundingClientRect().left - parent.current.getBoundingClientRect().left;
