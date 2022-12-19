import React from "react";
// import useDarkMode from "use-dark-mode";

const Image = ({ className, src, srcDark, srcSet, srcSetDark, alt }) => {
    // const darkMode = useDarkMode(false);

    return <img className={className} srcSet={srcSet} src={src} alt={alt} />;
};

export default Image;
