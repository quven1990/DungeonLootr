'use client';

import { useEffect, useState } from 'react';
import { isSoundEnabled, playUiSound, setSoundEnabled } from './ui-feedback';

const TAP_SELECTOR = [
  '.menu-toggle',
  '.nav-drawer-close',
  '.nav-links a',
  '.nav-drawer-links a',
  '.hero-actions a',
  '.tool-preview a',
  '.primary-action',
  '.intent-card',
  '.class-card',
  '.row-link',
  '.sound-toggle',
].join(',');

export function FeedbackRoot() {
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('.code-copy')) return;
      if (!target.closest(TAP_SELECTOR)) return;
      playUiSound('tap');
    };

    document.addEventListener('pointerdown', onPointerDown, true);
    return () => document.removeEventListener('pointerdown', onPointerDown, true);
  }, []);

  return null;
}

export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setEnabled(isSoundEnabled());
    setReady(true);
    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<boolean>).detail;
      setEnabled(Boolean(detail));
    };
    window.addEventListener('dl-sound-change', onChange);
    return () => window.removeEventListener('dl-sound-change', onChange);
  }, []);

  function toggle() {
    const next = !enabled;
    setSoundEnabled(next);
    setEnabled(next);
    if (next) playUiSound('success');
  }

  return (
    <button
      type="button"
      className={`sound-toggle${enabled ? ' is-on' : ''}`}
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? 'Turn UI sounds off' : 'Turn UI sounds on'}
    >
      Sound: {ready ? (enabled ? 'On' : 'Off') : 'Off'}
    </button>
  );
}
