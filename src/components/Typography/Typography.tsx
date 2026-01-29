import React from 'react'
import styles from './Typography.module.css'

type TypographyTag = 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'span'
type TypographyVariant = 'title'

type TypographyProps<Tag extends TypographyTag> = React.ComponentProps<Tag> & {
	tag?: TypographyTag
	variant: TypographyVariant
	children: React.ReactNode
}

export const Typography = <Tag extends TypographyTag = 'div'>({
	tag = 'div',
	variant,
	children
}: TypographyProps<Tag>) => {
	const Component = tag

	return <Component className={styles[variant]}>{children}</Component>
}
