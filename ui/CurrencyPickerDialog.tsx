"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { currencies, Currency, searchCurrencies } from "@/lib/currencies";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value?: string;
  onSelect?: (code: string) => void;
};

export default function CurrencyPickerDialog({
  open,
  onOpenChange,
  value,
  onSelect,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      // focus reliably after open
      const raf = requestAnimationFrame(() => searchRef.current?.focus());
      return () => cancelAnimationFrame(raf);
    }
    return;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const list: Currency[] = useMemo(
    () => (searchTerm ? searchCurrencies(searchTerm) : currencies),
    [searchTerm],
  );

  function handleSelect(c: Currency) {
    onSelect?.(c.code);
    onOpenChange(false);
  }

  function handleOpenChange(newOpen: boolean) {
    if (!newOpen) {
      setSearchTerm("");
    }
    onOpenChange(newOpen);
  }

  return (
    <div
      className={`modal ${open ? "modal-open" : ""}`}
      role="dialog"
      aria-modal={open}
    >
      <div className="modal-box max-w-3xl w-full">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Select currency</h3>
            <p className="text-sm text-muted-foreground">
              Search by code, symbol or name
            </p>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            aria-label="Close"
            onClick={() => handleOpenChange(false)}
          >
            ✕
          </button>
        </div>

        <div className="mt-4">
          <input
            ref={searchRef}
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search currencies (e.g. USD)"
            className="input input-bordered w-full"
            aria-label="Search currencies"
          />
        </div>

        <div className="mt-4 max-h-96 overflow-y-auto space-y-2">
          {list.length === 0 && (
            <div className="text-sm text-muted-foreground p-2">
              No currencies match “{searchTerm}”
            </div>
          )}

          {list.map((c) => (
            <button
              key={c.code}
              type="button"
              className={`card card-compact w-full p-3 border cursor-pointer hover:bg-base-200 text-left ${value === c.code ? "ring ring-primary" : ""}`}
              onClick={() => handleSelect(c)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">
                    {c.symbol}
                  </div>
                  <div className="text-lg font-medium">{c.code}</div>
                </div>
                <div className="text-sm text-muted-foreground">{c.name}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="modal-action">
          <button
            type="button"
            className="btn btn-error text-white"
            onClick={() => handleOpenChange(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
