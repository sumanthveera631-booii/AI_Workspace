export const typingAnimation = {
  hidden: {
    opacity: 0,
    y: 10,
  },

  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
    },
  }),
};