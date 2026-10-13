import { jsx as _jsx } from "react/jsx-runtime";
import { cx } from './cx.js';
export function Container({ as, width = 'content', className, ...rest }) {
    const Comp = as ?? 'div';
    return _jsx(Comp, { className: cx('cf-container', width !== 'content' && `cf-container--${width}`, className), ...rest });
}
export function Section({ as, tone = 'default', compact, className, ...rest }) {
    const Comp = as ?? 'section';
    return _jsx(Comp, { className: cx('cf-section', compact && 'cf-section--compact', tone !== 'default' && `cf-section--${tone}`, className), ...rest });
}
