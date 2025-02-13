import React from 'react';
import PropTypes from 'prop-types';

const variantClassMap = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl font-bold',
  h4: 'text-xl font-semibold',
  h5: 'text-lg font-semibold',
  h6: 'text-base font-semibold',
  subtitle1: 'text-lg',
  subtitle2: 'text-base',
  body1: 'text-base',
  body2: 'text-sm',
  caption: 'text-xs',
  overline: 'text-xs uppercase tracking-wider',
};

const colorClassMap = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  error: 'text-red-600',
  warning: 'text-amber-600',
  info: 'text-blue-600',
  success: 'text-green-600',
  'text.primary': 'text-gray-900',
  'text.secondary': 'text-gray-700',
  'text.disabled': 'text-gray-400',
};

const Typography = ({
  variant = 'body1',
  color,
  align,
  children,
  className = '',
  ...props
}) => {
  const getComponent = () => {
    switch (variant) {
      case 'h1':
        return 'h1';
      case 'h2':
        return 'h2';
      case 'h3':
        return 'h3';
      case 'h4':
        return 'h4';
      case 'h5':
        return 'h5';
      case 'h6':
        return 'h6';
      default:
        return 'p';
    }
  };

  const Component = getComponent();

  const classes = [
    variantClassMap[variant] || variantClassMap.body1,
    color && colorClassMap[color],
    align && `text-${align}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};
Typography.propTypes = {
  variant: PropTypes.oneOf([
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'subtitle1', 'subtitle2', 'body1', 'body2',
    'caption', 'overline'
  ]),
  color: PropTypes.string,
  align: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Typography;