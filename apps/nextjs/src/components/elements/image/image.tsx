import NextImage from "next/image";

export const Image = (props: { src: string; alt: string }) => {
  return (
    <NextImage
      src={props.src}
      alt={props.alt}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      fill
    />
  );
};
