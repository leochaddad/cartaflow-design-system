import type { ComponentPropsWithoutRef, ElementType } from 'react';
export type HeadingSize = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
export type TextSize = 'lead' | 'body-lg' | 'body' | 'body-sm' | 'caption' | 'label' | 'overline';
/** Visual size is independent of the HTML level: keep the outline semantic, pick the look with size. */
export declare function Heading<E extends ElementType = 'h2'>({ as, size, className, ...rest }: {
    as?: E;
    size?: HeadingSize;
    className?: string;
} & Omit<ComponentPropsWithoutRef<E>, 'as' | 'size'>): import("react").JSX.Element;
export declare function Text<E extends ElementType = 'p'>({ as, size, className, ...rest }: {
    as?: E;
    size?: TextSize;
    className?: string;
} & Omit<ComponentPropsWithoutRef<E>, 'as' | 'size'>): import("react").JSX.Element;
