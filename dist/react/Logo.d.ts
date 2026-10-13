import type { SVGProps } from 'react';
export type LogoScheme = 'primary' | 'reversed' | 'mono-black' | 'mono-white' | 'mono-navy' | 'mono-red' | 'current';
type LogoProps = {
    scheme?: LogoScheme;
    title?: string;
} & Omit<SVGProps<SVGSVGElement>, 'children' | 'dangerouslySetInnerHTML'>;
/** Horizontal lockup: the default logo. Size it with height (minimum 24 px on screen). */
export declare const Logo: (p: LogoProps) => import("react").JSX.Element;
export declare const LogoVertical: (p: LogoProps) => import("react").JSX.Element;
/** Stamp only. Below 32 px use MarkSimplified. */
export declare const Mark: (p: LogoProps) => import("react").JSX.Element;
export declare const MarkSimplified: (p: LogoProps) => import("react").JSX.Element;
export declare const Wordmark: (p: LogoProps) => import("react").JSX.Element;
export {};
