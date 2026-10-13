import { jsx as _jsx } from "react/jsx-runtime";
import * as data from './logo-data.js';
const MONO = { 'mono-black': '#000000', 'mono-white': '#FFFFFF', 'mono-navy': '#14213D', 'mono-red': '#CC3421' };
function render(g, { scheme = 'primary', title = 'CartaFlow', style, ...rest }) {
    const mono = scheme !== 'primary' && scheme !== 'reversed';
    const colorVars = scheme === 'reversed' ? { ['--cf-logo-word']: '#F6F4EF' } : {};
    const monoColor = MONO[scheme] ? { color: MONO[scheme] } : {};
    return (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: g.viewBox, role: "img", "aria-label": title, style: { ...colorVars, ...monoColor, ...style }, dangerouslySetInnerHTML: { __html: mono ? g.mono : g.color }, ...rest }));
}
/** Horizontal lockup: the default logo. Size it with height (minimum 24 px on screen). */
export const Logo = (p) => render(data.horizontal, p);
export const LogoVertical = (p) => render(data.vertical, p);
/** Stamp only. Below 32 px use MarkSimplified. */
export const Mark = (p) => render(data.mark, p);
export const MarkSimplified = (p) => render(data.markSimplified, p);
export const Wordmark = (p) => render(data.wordmark, p);
