import { X } from 'lucide-react';
import { useEffect, useId, useRef, type ReactNode } from 'react';
import { useLanguage } from '../../i18n/useLanguage';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/** Native dialog: the browser provides the focus trap, Escape and focus return. */
export function Modal({ open, onClose, title, children }: ModalProps) {
  const { t } = useLanguage();
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-background-secondary px-5 py-3 sm:px-7">
        <h2 id={titleId} className="font-display text-xl font-extrabold tracking-tight">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.common.close}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-ink"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
      <div className="px-5 py-5 sm:px-7 sm:py-6">{children}</div>
    </dialog>
  );
}
