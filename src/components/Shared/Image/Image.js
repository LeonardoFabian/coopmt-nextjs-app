import { getStrapiMedia } from "@/utils";

export function Image({
  key,
  src,
  alt,
  title,
  height,
  width,
  className,
  onClick,
}) {
  // if(!src) return null;

  const imageClasses = `c-shared__image ${className}`;
  const imageUrl = getStrapiMedia(src);
  const imageFallback = `https://placehold.co/${width || 1080}x${
    height || 600
  }`;

  return (
    <img
      key={key}
      src={imageUrl ?? imageFallback}
      alt={alt}
      title={title}
      height={height}
      width={width}
      className={imageClasses}
      onClick={onClick}
    />
  );
}
