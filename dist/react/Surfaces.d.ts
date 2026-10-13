import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
type Poly<E extends ElementType, P> = P & {
    as?: E;
} & Omit<ComponentPropsWithoutRef<E>, keyof P | 'as'>;
export type CardTone = 'default' | 'sunken' | 'inverse' | 'brand';
export declare function Card<E extends ElementType = 'div'>({ as, tone, padding, interactive, className, ...rest }: Poly<E, {
    tone?: CardTone;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    interactive?: boolean;
    className?: string;
}>): import("react").JSX.Element;
export type BadgeTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';
export declare function Badge({ tone, size, className, ...rest }: {
    tone?: BadgeTone;
    size?: 'sm' | 'md';
} & ComponentPropsWithoutRef<'span'>): import("react").JSX.Element;
export type CalloutTone = 'neutral' | 'brand' | 'info' | 'success' | 'warning' | 'danger';
/** A status message. Color never carries the meaning alone: always pass an icon and/or a title. */
export declare function Callout({ tone, icon, title, children, className, ...rest }: {
    tone?: CalloutTone;
    icon?: ReactNode;
    title?: ReactNode;
} & ComponentPropsWithoutRef<'div'>): import("react").JSX.Element;
/** The perforated postage stamp. One per viewport at most. */
export declare function Stamp({ tone, tilt, className, ...rest }: {
    tone?: 'brand' | 'paper' | 'navy';
    tilt?: boolean;
} & ComponentPropsWithoutRef<'div'>): import("react").JSX.Element;
/** Postmark cancellation waves. Decorative: hidden from assistive tech. */
export declare function Waves({ field, className, ...rest }: {
    field?: boolean;
} & ComponentPropsWithoutRef<'span'>): import("react").JSX.Element;
export {};
