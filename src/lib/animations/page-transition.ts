export const pageTransition = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -30,
  },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1],
  },
};