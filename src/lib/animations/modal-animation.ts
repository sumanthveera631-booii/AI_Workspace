export const modalAnimation = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },

  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },

  transition: {
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1],
  },
};