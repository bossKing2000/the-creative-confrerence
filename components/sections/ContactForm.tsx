'use client';

import type { FormEvent } from 'react';
import { useId, useState } from 'react';

import { ArrowRight } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

type Field = 'name' | 'email' | 'subject' | 'message';
type Errors = Partial<Record<Field, string>>;

const SUBJECTS = ['General question', 'Tickets', 'Sponsorship or partnership', 'Speaking', 'Press'];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY = { name: '', email: '', subject: SUBJECTS[0], message: '' };

function validate(values: typeof EMPTY): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = 'Tell us who you are.';
  if (!values.email.trim()) errors.email = 'We need an email address to reply to.';
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Use the form name@example.com.';
  if (values.message.trim().length < 10) errors.message = 'Add a little more detail — at least 10 characters.';

  return errors;
}

const fieldClasses =
  'w-full rounded-xl border bg-smoke/60 px-4 py-3 text-sm text-bone placeholder:text-ash-dim ' +
  'transition-colors focus:border-bone/50';

export function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const baseId = useId();

  function update(field: Field, value: string) {
    setValues(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: undefined }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSending(true);

    await new Promise(resolve => setTimeout(resolve, 700));

    setSending(false);
    setSent(true);
    setValues(EMPTY);
  }

  if (sent) {
    return (
      <div role="status" className="rounded-2xl border border-bone/30 bg-bone/10 p-8 text-center">
        <h2 className="font-display text-xl font-semibold text-bone">Message sent</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ash">
          We reply to everything, usually within two working days. For anything urgent, WhatsApp is faster.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 font-mono text-xs tracking-[0.18em] text-bone uppercase underline-offset-4 hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  const errorId = (field: Field) => `${baseId}-${field}-error`;

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border seam bg-char/60 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${baseId}-name`} className="text-sm text-ash">
            Your name
          </label>
          <input
            id={`${baseId}-name`}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={e => update('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId('name') : undefined}
            className={cn('mt-2', fieldClasses, errors.name ? 'border-rose-400/60' : 'seam')}
          />
          {errors.name ? (
            <p id={errorId('name')} role="alert" className="mt-1.5 text-xs text-red-300">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${baseId}-email`} className="text-sm text-ash">
            Email
          </label>
          <input
            id={`${baseId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={values.email}
            onChange={e => update('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId('email') : undefined}
            className={cn('mt-2', fieldClasses, errors.email ? 'border-rose-400/60' : 'seam')}
          />
          {errors.email ? (
            <p id={errorId('email')} role="alert" className="mt-1.5 text-xs text-red-300">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={`${baseId}-subject`} className="text-sm text-ash">
          What is this about?
        </label>
        <select
          id={`${baseId}-subject`}
          name="subject"
          value={values.subject}
          onChange={e => update('subject', e.target.value)}
          className={cn('mt-2 appearance-none', fieldClasses, 'seam')}
        >
          {SUBJECTS.map(subject => (
            <option key={subject} value={subject} className="bg-smoke">
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor={`${baseId}-message`} className="text-sm text-ash">
          Message
        </label>
        <textarea
          id={`${baseId}-message`}
          name="message"
          rows={5}
          value={values.message}
          onChange={e => update('message', e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? errorId('message') : undefined}
          className={cn('mt-2 resize-y', fieldClasses, errors.message ? 'border-rose-400/60' : 'seam')}
        />
        {errors.message ? (
          <p id={errorId('message')} role="alert" className="mt-1.5 text-xs text-red-300">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={sending}
        className="group mt-7 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full border border-bone bg-bone px-7 font-medium text-ink transition-[background-color,color,transform] hover:bg-transparent hover:text-bone active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
      >
        {sending ? 'Sending' : 'Send message'}
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
