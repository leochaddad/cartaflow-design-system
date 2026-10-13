import type { ComponentPropsWithoutRef, ReactNode } from 'react';
interface FieldProps {
    /** Must match the control's id. Required so labels, hints and errors are wired for screen readers. */
    id: string;
    label: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
    children: ReactNode;
    className?: string;
}
/** Label above, control, then hint or error. Pass aria-describedby={`${id}-hint`} or `${id}-error` to the control. */
export declare function Field({ id, label, hint, error, children, className }: FieldProps): import("react").JSX.Element;
type Size = {
    size?: 'sm' | 'md' | 'lg';
};
export declare function Input({ size, invalid, className, ...rest }: Size & {
    invalid?: boolean;
} & Omit<ComponentPropsWithoutRef<'input'>, 'size'>): import("react").JSX.Element;
export declare function Textarea({ invalid, className, ...rest }: {
    invalid?: boolean;
} & ComponentPropsWithoutRef<'textarea'>): import("react").JSX.Element;
export declare function Select({ invalid, className, ...rest }: {
    invalid?: boolean;
} & ComponentPropsWithoutRef<'select'>): import("react").JSX.Element;
export {};
