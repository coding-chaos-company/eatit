import type { RefObject } from 'react';

export const getCurrentDinoPosition = <Parent extends HTMLElement, Child extends HTMLElement>(
  parent: RefObject<Parent>,
  child: RefObject<Child>
) => parent.current.getBoundingClientRect().left - child.current.getBoundingClientRect().left;
