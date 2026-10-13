import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { cx } from './cx.js';

export type HeadingSize = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
export type TextSize = 'lead' | 'body-lg' | 'body' | 'body-sm' | 'caption' | 'label' | 'overline';

/** Visual size is independent of the HTML level: keep the outline semantic, pick the look with size. */
export function Heading<E extends ElementType = 'h2'>({ as, size, className, ...rest }: { as?: E; size?: HeadingSize; className?: string } & Omit<ComponentPropsWithoutRef<E>, 'as' | 'size'>) {
  const Comp: ElementType = as ?? 'h2';
  const fallback = (typeof Comp === 'string' && /^h[1-5]$/.test(Comp) ? Comp : 'h2') as HeadingSize;
  return <Comp className={cx(`cf-${size ?? fallback}`, className)} {...rest} />;
}

export function Text<E extends ElementType = 'p'>({ as, size = 'body', className, ...rest }: { as?: E; size?: TextSize; className?: string } & Omit<ComponentPropsWithoutRef<E>, 'as' | 'size'>) {
  const Comp: ElementType = as ?? 'p';
  return <Comp className={cx(`cf-${size}`, className)} {...rest} />;
}
