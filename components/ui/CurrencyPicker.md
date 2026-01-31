CurrencyPicker

Overview
- A simple DaisyUI-based currency picker component that shows currency code, symbol, and short name.
- Search is available on-demand via the magnifier toggle.

Props
- value?: string — currently selected currency code
- onChange?: (code: string) => void
- id?: string
- name?: string — hidden input name for form submission
- searchableOnDemand?: boolean (default true)
- showSymbol?: boolean (default true)
- showShortName?: boolean (default true)
- topOptions?: string[] — commonly used currencies
- placeholder?: string
- className?: string
- disabled?: boolean
- required?: boolean — required will add the `required` attribute to the hidden input

Behavior
- Renders a button that toggles a dropdown list of currencies.
- Clicking the magnifier toggles an in-dropdown search field; searching filters results.
- Quick picks (topOptions) are shown pinned above the full list.
- Renders a hidden `input[name]` with the selected code to support server-side form submission.

Accessibility
- Uses `role="combobox"` + `role="listbox"` and `role="option"` for items.
- Supports keyboard navigation (ArrowUp, ArrowDown, Enter, Esc).
- Announces "No currencies matching" in an `aria-live` polite region when search yields no results.

Notes
- Flags are intentionally omitted for now; they can be added later via SVG assets in `public/flags` if desired.
