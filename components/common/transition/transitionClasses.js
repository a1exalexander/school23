const transitionClasses = {
fade: {
    enterActive: 'animated faster fadeIn',
    exitActive: 'animated faster fadeOut'
},
notifications: {
  enterActive: 'animated faster fadeInDownUp',
  exitActive: 'animated fast fadeOut'
},
slideLeft: {
    enterActive: 'animated fast slideInLeft',
    exitActive: 'animated fast slideOutLeft'
},
slideRight: {
    enterActive: 'animated fast slideInLeft',
    exitActive: 'animated fast slideOutLeft'
},
drop: {
  enterActive: 'animated rocket drop',
  exitActive: 'animated rocket drop animate-reverse'
}
};

export default transitionClasses;
