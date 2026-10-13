import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { cx } from './cx.js';

type Poly<E extends ElementType, P> = P & { as?: E } & Omit<ComponentPropsWithoutRef<E>, keyof P | 'as'>;

export function Container<E extends ElementType = 'div'>({ as, width = 'content', className, ...rest }: Poly<E, { width?: 'prose' | 'content' | 'wide'; className?: string }>) {
  const Comp: ElementType = as ?? 'div';
  return <Comp className={cx('cf-container', width !== 'content' && `cf-container--${width}`, className)} {...rest} />;
}

export type SectionTone = 'default' | 'subtle' | 'sunken' | 'inverse' | 'brand';

export function Section<E extends ElementType = 'section'>({ as, tone = 'default', compact, className, ...rest }: Poly<E, { tone?: SectionTone; compact?: boolean; className?: string }>) {
  const Comp: ElementType = as ?? 'section';
  return <Comp className={cx('cf-section', compact && 'cf-section--compact', tone !== 'default' && `cf-section--${tone}`, className)} {...rest} />;
}
