import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { cx } from './cx.js';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Square button holding only an icon. Requires an aria-label. */
  iconOnly?: boolean;
  block?: boolean;
  className?: string;
}

/** Class string for anything that must look like a button (for example a framework Link). */
export function buttonClass({ variant = 'primary', size = 'md', iconOnly, block, className }: ButtonStyleOptions = {}): string {
  return cx('cf-btn', `cf-btn--${variant}`, size !== 'md' && `cf-btn--${size}`, iconOnly && 'cf-btn--icon', block && 'cf-btn--block', className);
}

type ButtonProps<E extends ElementType> = ButtonStyleOptions & {
  as?: E;
  loading?: boolean;
} & Omit<ComponentPropsWithoutRef<E>, keyof ButtonStyleOptions | 'as'>;

export function Button<E extends ElementType = 'button'>({ as, variant, size, iconOnly, block, loading, className, ...rest }: ButtonProps<E>) {
  const Comp: ElementType = as ?? 'button';
  const extra = Comp === 'button' && !('type' in rest) ? { type: 'button' } : {};
  return <Comp className={buttonClass({ variant, size, iconOnly, block, className })} aria-busy={loading || undefined} {...extra} {...rest} />;
}
