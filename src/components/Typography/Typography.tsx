import React from 'react'

import styles from './Typography.module.css'

type TypographyTag = 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
type TypographyVariant = 'title'

// exclude 'span' because property 'align' from 'span'  breaks it
type TypographyProps<Tag extends TypographyTag> = React.ComponentProps<Exclude<Tag, 'span'>> & {
	tag?: TypographyTag
	variant: TypographyVariant
	children: React.ReactNode,
}

export const Typography = <Tag extends TypographyTag = 'div'>({
	tag = 'div',
	variant,
	children,
	...props
}: TypographyProps<Tag>) => {
	const Component = tag

	return <Component className={styles[variant]} {...props}>{children}</Component>
}
