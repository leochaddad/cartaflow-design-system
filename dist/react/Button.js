import { jsx as _jsx } from "react/jsx-runtime";
import { cx } from './cx.js';
/** Class string for anything that must look like a button (for example a framework Link). */
export function buttonClass({ variant = 'primary', size = 'md', iconOnly, block, className } = {}) {
    return cx('cf-btn', `cf-btn--${variant}`, size !== 'md' && `cf-btn--${size}`, iconOnly && 'cf-btn--icon', block && 'cf-btn--block', className);
}
export function Button({ as, variant, size, iconOnly, block, loading, className, ...rest }) {
    const Comp = as ?? 'button';
    const extra = Comp === 'button' && !('type' in rest) ? { type: 'button' } : {};
    return _jsx(Comp, { className: buttonClass({ variant, size, iconOnly, block, className }), "aria-busy": loading || undefined, ...extra, ...rest });
}
