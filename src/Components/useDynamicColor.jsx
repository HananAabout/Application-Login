import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useDynamicColor = () => {
  const userColor = useSelector((state) => state.user.couleur);
  const updatedColor = useSelector((state) => state.color);


  const [backgroundColor, setBackgroundColor] = useState(userColor);

  useEffect(() => {
    const colorToUse = updatedColor || userColor;
    setBackgroundColor(colorToUse);
  }, [updatedColor, userColor]);

  return { backgroundColor };
};

export default useDynamicColor;
