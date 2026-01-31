"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  currencies,
  Currency,
  searchCurrencies,
  getCurrency,
} from "@/lib/currencies";

type Props = {
  value?: string;
  onChange?: (code: string) => void;
  id?: string;
  name?: string;
  searchableOnDemand?: boolean;
  showSymbol?: boolean;
  showShortName?: boolean;
  topOptions?: string[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
};

export default function CurrencyPicker({
  value: initialValue,
  onChange,
  id,
  name,
  searchableOnDemand = true,
  showSymbol = true,
  showShortName = true,
  topOptions = ["USD", "EUR", "MMK"],
  placeholder = "Pick a currency",
  className = "",
  disabled = false,
  required = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<Currency | undefined>(() =>
    initialValue ? getCurrency(initialValue) : undefined,
  );
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const listRef = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current[activeIndex]) {
      listRef.current[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const list =
    searchOpen && searchTerm ? searchCurrencies(searchTerm) : currencies;
  const quick = topOptions
    .map((c) => getCurrency(c))
    .filter(Boolean) as Currency[];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (open && searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open, searchOpen]);

  function handleSelect(c: Currency) {
    setSelected(c);
    onChange?.(c.code);
    setOpen(false);
    setSearchOpen(false);
    setSearchTerm("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, list.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < list.length) {
        handleSelect(list[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setSearchOpen(false);
    }
  }

  return (
    <div ref={containerRef} className={`dropdown ${className}`}>
      <div
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id ? `${id}-listbox` : undefined}
        aria-owns={id ? `${id}-listbox` : undefined}
        className="flex items-center gap-2"
      >
        <button
          type="button"
          className={`btn btn-ghost justify-between w-full text-left ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
          onClick={() => setOpen((s) => !s)}
          aria-controls={id ? `${id}-listbox` : undefined}
          aria-label={placeholder}
          disabled={disabled}
          onKeyDown={handleKeyDown}
        >
          <span className="flex items-center gap-2">
            {selected ? (
              <span className="flex items-baseline gap-2">
                {showSymbol && selected.symbol ? (
                  <span className="text-sm">{selected.symbol}</span>
                ) : null}
                <span className="font-medium">{selected.code}</span>
                {showShortName && selected.shortName ? (
                  <span className="text-sm text-muted-foreground">
                    {" "}
                    — {selected.shortName}
                  </span>
                ) : null}
              </span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </span>
          <span className="w-4 h-4 opacity-70">▾</span>
        </button>
        {searchableOnDemand && (
          <button
            type="button"
            className={`btn btn-ghost ${searchOpen ? "text-primary" : ""}`}
            onClick={() => {
              setOpen(true);
              setSearchOpen((s) => !s);
            }}
            aria-pressed={searchOpen}
            aria-label="Toggle search"
          >
            <span className="w-4 h-4">🔍</span>
          </button>
        )}
      </div>

      <input
        type="text"
        name={name}
        value={selected ? selected.code : ""}
        readOnly
        aria-hidden
        className="sr-only"
        required={required}
      />

      <div
        className={`dropdown-content mt-2 ${open ? "block" : "hidden"} card card-compact w-full p-2 bg-base-100 shadow`}
      >
        {searchOpen && (
          <div className="p-2">
            <input
              ref={searchRef}
              type="search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setActiveIndex(-1);
              }}
              placeholder="Search currencies (code, symbol, name)"
              className="input input-bordered w-full"
            />
          </div>
        )}

        <ul
          id={id ? `${id}-listbox` : undefined}
          role="listbox"
          aria-label="Currency options"
          className="menu menu-compact max-h-[60vh] overflow-y-auto"
        >
          {quick.length > 0 && (
            <li className="px-2 pt-1">
              <div className="text-xs text-muted-foreground">Common</div>
            </li>
          )}
          {quick.map((c) => (
            <li key={`quick-${c.code}`}>
              <button
                type="button"
                role="option"
                aria-selected={selected?.code === c.code}
                className={`justify-between ${selected?.code === c.code ? "bg-primary/10" : ""}`}
                onClick={() => handleSelect(c)}
              >
                <span className="flex items-center gap-2">
                  {showSymbol && c.symbol ? (
                    <span className="text-sm">{c.symbol}</span>
                  ) : null}
                  <span className="font-medium">{c.code}</span>
                  {showShortName && c.shortName ? (
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      — {c.shortName}
                    </span>
                  ) : null}
                </span>
              </button>
            </li>
          ))}

          <li>
            <div className="divider my-1" />
          </li>

          {list.length === 0 && (
            <li className="p-2 text-sm text-muted-foreground">
              No currencies match “{searchTerm}”
            </li>
          )}

          {list.map((c, i) => (
            <li key={c.code}>
              <button
                ref={(el) => {
                  listRef.current[i] = el;
                }}
                type="button"
                role="option"
                aria-selected={selected?.code === c.code}
                tabIndex={0}
                className={`justify-between ${i === activeIndex ? "bg-primary/10" : ""}`}
                onClick={() => handleSelect(c)}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <span className="flex items-center gap-2">
                  {showSymbol && c.symbol ? (
                    <span className="text-sm">{c.symbol}</span>
                  ) : null}
                  <span className="font-medium">{c.code}</span>
                  {showShortName && c.shortName ? (
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      — {c.shortName}
                    </span>
                  ) : null}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <span className="sr-only" role="status" aria-live="polite">
          {list.length === 0 && `No currencies matching "${searchTerm}"`}
        </span>
      </div>
    </div>
  );
}
