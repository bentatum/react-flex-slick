import { default as React, PropTypes } from 'react';

function isActive(currentSlide, slideCount, infinite, next, prev) {
  if (next && currentSlide === 0 && infinite === false) {
    return false;
  }
  if (prev && (currentSlide + 1) === slideCount && infinite === false) {
    return false;
  }
  return true;
}

const Arrow = ({ activeClassName, className, color, currentSlide, handleClick, inactiveClassName, infinite, next, prev, size, slideCount, style, ...props }) => {
  const adjustedClassName = isActive(currentSlide, slideCount, infinite, next, prev) ? activeClassName : inactiveClassName;
  const borderTopBottom = `solid ${size}px transparent`;
  const borderLeftRight = `solid ${size * 1.25}px ${color}`;
  const adjustedStyle = {
    ...style,
    ...(adjustedClassName !== '' ? {} : {
      width: 0,
      height: 0,
      borderBottom: borderTopBottom,
      borderTop: borderTopBottom,
      borderRight: next && borderLeftRight,
      borderLeft: prev && borderLeftRight
    })
  };
  return (
    <div
      {...props}
      className={`${adjustedClassName}${className ? ` ${className}` : '' }`}
      style={adjustedStyle}
      onClick={::handleClick}
    />
  );
};

Arrow.propTypes = {
  activeClassName: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  currentSlide: PropTypes.number,
  handleClick: PropTypes.func,
  inactiveClassName: PropTypes.string,
  infinite: PropTypes.bool,
  next: PropTypes.bool,
  prev: PropTypes.bool,
  size: PropTypes.number,
  style: PropTypes.object
};

Arrow.defaultProps = {
  activeClassName: '',
  color: '#795548',
  inactiveClassName: '',
  size: 30
};

const PrevArrow = (props) => <Arrow {...props} prev />;
const NextArrow = (props) => <Arrow {...props} next />;

export { PrevArrow, NextArrow };
