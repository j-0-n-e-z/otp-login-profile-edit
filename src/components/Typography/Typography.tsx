import clsx from 'clsx';
import React from 'react';

type TypographyTag = 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
type TypographyVariant = 'paragraph16-regular' | 'title';

// exclude 'span' because property 'align' from 'span'  breaks it
type TypographyProps<Tag extends TypographyTag> = React.ComponentProps<Exclude<Tag, 'span'>> & {
  tag?: TypographyTag;
  variant: TypographyVariant;
  children: React.ReactNode;
};

export const Typography = <Tag extends TypographyTag = 'div'>({
  tag = 'div',
  variant,
  children,
  className,
  ...props
}: TypographyProps<Tag>) => {
  const Component = tag;

  return (
    <Component className={clsx(variant, className)} {...props}>
      {children}
    </Component>
  );
};
