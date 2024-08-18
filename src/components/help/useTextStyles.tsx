import { useState } from "react";

type TextStyle = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
};

export const useTextStyles = () => {
  const [styles, setStyles] = useState<TextStyle>({
    bold: false,
    italic: false,
    underline: false,
  });

  const toggleBold = () => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      bold: !prevStyles.bold,
    }));
  };

  const toggleItalic = () => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      italic: !prevStyles.italic,
    }));
  };

  const toggleUnderline = () => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      underline: !prevStyles.underline,
    }));
  };

  const getClassNames = () => {
    return `${styles.bold ? "font-bold" : ""} ${
      styles.italic ? "italic" : ""
    } ${styles.underline ? "underline" : ""}`;
  };

  return { styles, toggleBold, toggleItalic, toggleUnderline, getClassNames };
};
