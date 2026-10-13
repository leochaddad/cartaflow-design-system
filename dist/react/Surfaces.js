import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from './cx.js';
export function Card({ as, tone = 'default', padding = 'md', interactive, className, ...rest }) {
    const Comp = as ?? 'div';
    return (_jsx(Comp, { className: cx('cf-card', tone !== 'default' && `cf-card--${tone}`, padding === 'none' ? 'cf-card--flush' : padding !== 'md' && `cf-card--${padding}`, interactive && 'cf-card--interactive', className), ...rest }));
}
export function Badge({ tone = 'neutral', size = 'md', className, ...rest }) {
    return _jsx("span", { className: cx('cf-badge', tone !== 'neutral' && `cf-badge--${tone}`, size === 'sm' && 'cf-badge--sm', className), ...rest });
}
/** A status message. Color never carries the meaning alone: always pass an icon and/or a title. */
export function Callout({ tone = 'neutral', icon, title, children, className, ...rest }) {
    return (_jsxs("div", { role: tone === 'danger' || tone === 'warning' ? 'alert' : 'note', className: cx('cf-callout', tone !== 'neutral' && `cf-callout--${tone}`, className), ...rest, children: [icon ?? _jsx("span", { "aria-hidden": true }), _jsxs("div", { children: [title ? _jsx("p", { className: "cf-callout__title", children: title }) : null, children] })] }));
}
/** The perforated postage stamp. One per viewport at most. */
export function Stamp({ tone = 'brand', tilt, className, ...rest }) {
    return _jsx("div", { className: cx('cf-stamp', tone !== 'brand' && `cf-stamp--${tone}`, tilt && 'cf-stamp--tilt', className), ...rest });
}
/** Postmark cancellation waves. Decorative: hidden from assistive tech. */
export function Waves({ field, className, ...rest }) {
    return _jsx("span", { "aria-hidden": true, className: cx('cf-waves', field && 'cf-waves--field', className), ...rest });
}
