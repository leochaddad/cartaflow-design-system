import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cx } from './cx.js';

type Poly<E extends ElementType, P> = P & { as?: E } & Omit<ComponentPropsWithoutRef<E>, keyof P | 'as'>;

export type CardTone = 'default' | 'sunken' | 'inverse' | 'brand';

export function Card<E extends ElementType = 'div'>({ as, tone = 'default', padding = 'md', interactive, className, ...rest }: Poly<E, { tone?: CardTone; padding?: 'none' | 'sm' | 'md' | 'lg'; interactive?: boolean; className?: string }>) {
  const Comp: ElementType = as ?? 'div';
  return (
    <Comp
      className={cx('cf-card', tone !== 'default' && `cf-card--${tone}`, padding === 'none' ? 'cf-card--flush' : padding !== 'md' && `cf-card--${padding}`, interactive && 'cf-card--interactive', className)}
      {...rest}
    />
  );
}

export type BadgeTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';

export function Badge({ tone = 'neutral', size = 'md', className, ...rest }: { tone?: BadgeTone; size?: 'sm' | 'md' } & ComponentPropsWithoutRef<'span'>) {
  return <span className={cx('cf-badge', tone !== 'neutral' && `cf-badge--${tone}`, size === 'sm' && 'cf-badge--sm', className)} {...rest} />;
}

export type CalloutTone = 'neutral' | 'brand' | 'info' | 'success' | 'warning' | 'danger';

/** A status message. Color never carries the meaning alone: always pass an icon and/or a title. */
export function Callout({ tone = 'neutral', icon, title, children, className, ...rest }: { tone?: CalloutTone; icon?: ReactNode; title?: ReactNode } & ComponentPropsWithoutRef<'div'>) {
  return (
    <div role={tone === 'danger' || tone === 'warning' ? 'alert' : 'note'} className={cx('cf-callout', tone !== 'neutral' && `cf-callout--${tone}`, className)} {...rest}>
      {icon ?? <span aria-hidden />}
      <div>
        {title ? <p className="cf-callout__title">{title}</p> : null}
        {children}
      </div>
    </div>
  );
}

/** The perforated postage stamp. One per viewport at most. */
export function Stamp({ tone = 'brand', tilt, className, ...rest }: { tone?: 'brand' | 'paper' | 'navy'; tilt?: boolean } & ComponentPropsWithoutRef<'div'>) {
  return <div className={cx('cf-stamp', tone !== 'brand' && `cf-stamp--${tone}`, tilt && 'cf-stamp--tilt', className)} {...rest} />;
}

/** Postmark cancellation waves. Decorative: hidden from assistive tech. */
export function Waves({ field, className, ...rest }: { field?: boolean } & ComponentPropsWithoutRef<'span'>) {
  return <span aria-hidden className={cx('cf-waves', field && 'cf-waves--field', className)} {...rest} />;
}
