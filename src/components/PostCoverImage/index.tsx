import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type PostCoverImageProps = {
  imageProps: React.ComponentProps<typeof Image>;
  LinkProps: React.ComponentProps<typeof Link>;
};

export function PostCoverImage({ imageProps, LinkProps }: PostCoverImageProps) {
  return (
    <Link
      {...LinkProps}
      className={clsx(
        'w-full h-full overflow-hidden rounded-xl',
        LinkProps.className,
      )}
    >
      <Image
        className={clsx(
          'w-full h-full object-cover object-center',
          'group-hover:scale-105 transition',
          imageProps.className,
        )}
        {...imageProps}
        src={imageProps.src}
        alt={imageProps.alt}
        priority
      />
    </Link>
  );
}
