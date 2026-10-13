import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from './cx.js';
/** Label above, control, then hint or error. Pass aria-describedby={`${id}-hint`} or `${id}-error` to the control. */
export function Field({ id, label, hint, error, children, className }) {
    return (_jsxs("div", { className: cx('cf-field', className), children: [_jsx("label", { className: "cf-field__label", htmlFor: id, children: label }), children, error ? (_jsxs("p", { className: "cf-field__error", id: `${id}-error`, children: [_jsxs("svg", { viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", "aria-hidden": true, children: [_jsx("circle", { cx: "8", cy: "8", r: "6.25" }), _jsx("path", { d: "M8 4.75v3.75M8 11.1v.15" })] }), _jsx("span", { children: error })] })) : hint ? (_jsx("p", { className: "cf-field__hint", id: `${id}-hint`, children: hint })) : null] }));
}
export function Input({ size = 'md', invalid, className, ...rest }) {
    return _jsx("input", { className: cx('cf-input', size !== 'md' && `cf-input--${size}`, className), "aria-invalid": invalid || undefined, ...rest });
}
export function Textarea({ invalid, className, ...rest }) {
    return _jsx("textarea", { className: cx('cf-textarea', className), "aria-invalid": invalid || undefined, ...rest });
}
export function Select({ invalid, className, ...rest }) {
    return _jsx("select", { className: cx('cf-select', className), "aria-invalid": invalid || undefined, ...rest });
}
