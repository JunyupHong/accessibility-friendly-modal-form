import { useState, useRef } from "react";

export function createModalStore<TProps = void, TResult = void>() {
  return function useModalStore() {
    const [isOpen, setIsOpen] = useState(false);
    const [props, setProps] = useState<TProps | null>(null);
    const resolverRef = useRef<((value: TResult | null) => void) | null>(null);

    const open = (p?: TProps): Promise<TResult | null> => {
      setProps(p ?? null);
      setIsOpen(true);
      return new Promise((resolve) => {
        resolverRef.current = resolve;
      });
    };

    const close = (result?: TResult | null) => {
      setIsOpen(false);
      setProps(null);
      resolverRef.current?.(result ?? null);
      resolverRef.current = null;
    };

    return { isOpen, props, open, close };
  };
}
