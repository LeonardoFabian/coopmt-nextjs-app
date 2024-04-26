import { getStrapiMedia } from "@/utils";

export function Image({ src, alt, title, height, width, className }) {

    // if(!src) return null;

    const imageUrl = getStrapiMedia(src);
    const imageFallback = `https://placehold.co/${width || 1080}x${height || 600}`;

    return (
        <img 
            src={imageUrl ?? imageFallback}
            alt={alt}
            title={title}
            height={height}
            width={width}
            className={className}
        />
    );
}
