import { useCallback, useState } from "react";

export function randomBetween(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const useComponentDimensions = () => {
  const [dimensions, setDimensions] = useState(null);

  const onComponentLayout = useCallback((event) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  }, []);

  return [dimensions, onComponentLayout];
};
