'use client';

import { useState } from 'react';

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const area = document.createElement('textarea');
  area.value = value;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  document.execCommand('copy');
  area.remove();
}

export function CopyCodeButton({
  code,
  muted = false,
  showCode = true,
}: {
  code: string;
  muted?: boolean;
  showCode?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await copyText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      className={`code-copy${copied ? ' is-copied' : ''}${muted ? ' is-muted' : ''}${showCode ? '' : ' is-plain'}`}
      onClick={onCopy}
      aria-label={copied ? `Copied ${code}` : `Copy code ${code}`}
    >
      {showCode ? <code className={`code-chip${muted ? ' muted' : ''}`}>{code}</code> : null}
      <span className="code-copy-label">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}
