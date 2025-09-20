import { useState, useRef } from "react";

export type FormData = { email: string; };

export function useDefaultFormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const resolverRef = useRef<((value: FormData | null) => void) | null>(null);

  const open = (): Promise<FormData | null> => {
    setIsOpen(true);
    return new Promise((resolve) => {
      resolverRef.current = resolve;
    });
  };

  const close = (result?: FormData | null) => {
    setIsOpen(false);
    resolverRef.current?.(result ?? null);
    resolverRef.current = null;
  };

  return { isOpen, open, close };
}
