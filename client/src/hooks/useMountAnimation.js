import { useState, useEffect } from 'react';

const useMountAnimation = () => {
  const [style, setStyle] = useState({});

  const mountedStyle = { animation: 'inAnimation 250ms ease-in' };
  const unmountedStyle = {
    animation: 'outAnimation 250ms ease-out',
    animationFillMode: 'forwards'
  };

  useEffect(() => {
    setStyle(mountedStyle);

    return () => setStyle(unmountedStyle);
  }, []);

  return style;
};

export default useMountAnimation;
