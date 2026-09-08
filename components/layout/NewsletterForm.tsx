'use client';

import type { FormEvent } from 'react';
import { useId, useState } from 'react';

import { ArrowRight } from '@/components/ui/Icon';

type Status = 'idle' | 'submitting' | 'done' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const inputId = useId();
  const statusId = useId();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus('error');
      setMessage('Enter an email address in the form name@example.com.');
      return;
    }

    setStatus('submitting');

    await new Promise(resolve => setTimeout(resolve, 600));

    setStatus('done');
    setMessage('You are on the list. Lineup and schedule news lands in your inbox first.');
    setEmail('');
  }

  if (status === 'done') {
    return (
      <p role="status" className="rounded-xl border border-bone/30 bg-bone/10 px-4 py-3.5 text-sm text-bone">
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <label htmlFor={inputId} className="text-sm text-ash">
        Get the lineup before it is public
      </label>

      <div className="mt-3 flex gap-2">
        <input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          aria-invalid={status === 'error'}
          aria-describedby={status === 'error' ? statusId : undefined}
          className="min-w-0 flex-1 rounded-full border seam bg-smoke/60 px-4 py-3 text-sm text-bone placeholder:text-ash-dim focus:border-bone/50"
        />

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-bone text-ink transition-[filter,transform] hover:opacity-90 active:scale-95 disabled:opacity-60"
        >
          <ArrowRight className="size-4" />
          <span className="sr-only">{status === 'submitting' ? 'Subscribing' : 'Subscribe'}</span>
        </button>
      </div>

      {status === 'error' ? (
        <p id={statusId} role="alert" className="mt-2 text-sm text-red-300">
          {message}
        </p>
      ) : null}
    </form>
  );
}
