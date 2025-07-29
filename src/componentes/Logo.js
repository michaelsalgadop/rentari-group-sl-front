export const Logo = (props) => {
  const { alt, className, width, height } = props;
  return (
    <img
      src="/imgs/rentari-logo.svg"
      alt={alt}
      {...(width && { width })} // Si width es undefined, no se añade la propiedad
      {...(height && { height })}
      className={className}
    />
  );
};
