import type { ComponentPropsWithoutRef, ElementType } from 'react';
type Poly<E extends ElementType, P> = P & {
    as?: E;
} & Omit<ComponentPropsWithoutRef<E>, keyof P | 'as'>;
export declare function Container<E extends ElementType = 'div'>({ as, width, className, ...rest }: Poly<E, {
    width?: 'prose' | 'content' | 'wide';
    className?: string;
}>): import("react").JSX.Element;
export type SectionTone = 'default' | 'subtle' | 'sunken' | 'inverse' | 'brand';
export declare function Section<E extends ElementType = 'section'>({ as, tone, compact, className, ...rest }: Poly<E, {
    tone?: SectionTone;
    compact?: boolean;
    className?: string;
}>): import("react").JSX.Element;
export {};
