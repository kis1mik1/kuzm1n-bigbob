export const $ = selector => document.querySelector(selector);

export const isTouch = window.matchMedia('(pointer: coarse)').matches;
