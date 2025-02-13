import React from 'react';
import PropTypes from 'prop-types';

const Image = ({
  src,
  alt,
  width,
  height,
  className = '',
  objectFit = 'cover',
  loading = 'lazy',
  ...props
}) => {
  const imgClasses = [
    className,
    objectFit && `object-${objectFit}`
  ].filter(Boolean).join(' ');

  return (
    <img
      src={src}
      alt={alt || ''}
      width={width}
      height={height}
      className={imgClasses}
      loading={loading}
      {...props}
    />
  );
};
Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  objectFit: PropTypes.string,
  loading: PropTypes.string,
};

export default Image;