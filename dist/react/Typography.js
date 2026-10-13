import { jsx as _jsx } from "react/jsx-runtime";
import { cx } from './cx.js';
/** Visual size is independent of the HTML level: keep the outline semantic, pick the look with size. */
export function Heading({ as, size, className, ...rest }) {
    const Comp = as ?? 'h2';
    const fallback = (typeof Comp === 'string' && /^h[1-5]$/.test(Comp) ? Comp : 'h2');
    return _jsx(Comp, { className: cx(`cf-${size ?? fallback}`, className), ...rest });
}
export function Text({ as, size = 'body', className, ...rest }) {
    const Comp = as ?? 'p';
    return _jsx(Comp, { className: cx(`cf-${size}`, className), ...rest });
}
