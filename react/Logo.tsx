import type { SVGProps } from 'react';
import * as data from './logo-data.js';

export type LogoScheme = 'primary' | 'reversed' | 'mono-black' | 'mono-white' | 'mono-navy' | 'mono-red' | 'current';
type Geometry = { readonly viewBox: string; readonly color: string; readonly mono: string };

const MONO: Record<string, string> = { 'mono-black': '#000000', 'mono-white': '#FFFFFF', 'mono-navy': '#14213D', 'mono-red': '#CC3421' };

type LogoProps = { scheme?: LogoScheme; title?: string } & Omit<SVGProps<SVGSVGElement>, 'children' | 'dangerouslySetInnerHTML'>;

function render(g: Geometry, { scheme = 'primary', title = 'CartaFlow', style, ...rest }: LogoProps) {
  const mono = scheme !== 'primary' && scheme !== 'reversed';
  const colorVars = scheme === 'reversed' ? { ['--cf-logo-word' as string]: '#F6F4EF' } : {};
  const monoColor = MONO[scheme] ? { color: MONO[scheme] } : {};
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={g.viewBox}
      role="img"
      aria-label={title}
      style={{ ...colorVars, ...monoColor, ...style }}
      dangerouslySetInnerHTML={{ __html: mono ? g.mono : g.color }}
      {...rest}
    />
  );
}

/** Horizontal lockup: the default logo. Size it with height (minimum 24 px on screen). */
export const Logo = (p: LogoProps) => render(data.horizontal, p);
export const LogoVertical = (p: LogoProps) => render(data.vertical, p);
/** Stamp only. Below 32 px use MarkSimplified. */
export const Mark = (p: LogoProps) => render(data.mark, p);
export const MarkSimplified = (p: LogoProps) => render(data.markSimplified, p);
export const Wordmark = (p: LogoProps) => render(data.wordmark, p);
