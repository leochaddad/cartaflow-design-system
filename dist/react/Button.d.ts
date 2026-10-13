import type { ComponentPropsWithoutRef, ElementType } from 'react';
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
export declare function buttonClass({ variant, size, iconOnly, block, className }?: ButtonStyleOptions): string;
type ButtonProps<E extends ElementType> = ButtonStyleOptions & {
    as?: E;
    loading?: boolean;
} & Omit<ComponentPropsWithoutRef<E>, keyof ButtonStyleOptions | 'as'>;
export declare function Button<E extends ElementType = 'button'>({ as, variant, size, iconOnly, block, loading, className, ...rest }: ButtonProps<E>): import("react").JSX.Element;
export {};
