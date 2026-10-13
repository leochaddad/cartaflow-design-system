import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cx } from './cx.js';

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
export function Field({ id, label, hint, error, children, className }: FieldProps) {
  return (
    <div className={cx('cf-field', className)}>
      <label className="cf-field__label" htmlFor={id}>{label}</label>
      {children}
      {error ? (
        <p className="cf-field__error" id={`${id}-error`}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden><circle cx="8" cy="8" r="6.25" /><path d="M8 4.75v3.75M8 11.1v.15" /></svg>
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p className="cf-field__hint" id={`${id}-hint`}>{hint}</p>
      ) : null}
    </div>
  );
}

type Size = { size?: 'sm' | 'md' | 'lg' };

export function Input({ size = 'md', invalid, className, ...rest }: Size & { invalid?: boolean } & Omit<ComponentPropsWithoutRef<'input'>, 'size'>) {
  return <input className={cx('cf-input', size !== 'md' && `cf-input--${size}`, className)} aria-invalid={invalid || undefined} {...rest} />;
}

export function Textarea({ invalid, className, ...rest }: { invalid?: boolean } & ComponentPropsWithoutRef<'textarea'>) {
  return <textarea className={cx('cf-textarea', className)} aria-invalid={invalid || undefined} {...rest} />;
}

export function Select({ invalid, className, ...rest }: { invalid?: boolean } & ComponentPropsWithoutRef<'select'>) {
  return <select className={cx('cf-select', className)} aria-invalid={invalid || undefined} {...rest} />;
}
