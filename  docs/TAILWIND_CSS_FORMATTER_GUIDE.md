# Tailwind CSS Formatter Guide

Vivah Bandh UI uses a custom Tailwind CSS formatter to keep Tailwind utility classes consistently ordered, grouped, and formatted across the project.

The formatter is located at:

```text
scripts/format-tailwind.mjs
```

It works together with Prettier.

### Command

Run the complete formatter with:

```bash
npm run format
```

The `package.json` script is:

```json
{
  "scripts": {
    "format": "prettier . --write && node scripts/format-tailwind.mjs && prettier . --write"
  }
}
```

### Flow

```text
Prettier
   ↓
Formats JavaScript / TypeScript / JSX / TSX
   ↓
Custom Tailwind Formatter
   ↓
Groups and orders Tailwind classes
```

# Tailwind Class Group Order

Tailwind classes must follow this order:

```text
1. Position
2. Layout
3. Size / Spacing
4. Background / Visual
5. Typography
6. Transition
7. Interaction
8. Overflow
9. State
10. Responsive
11. Other / Custom
```

### Example:

```tsx
className="
  fixed top-4 right-6 z-50
  flex items-center justify-between gap-4 shrink-0
  w-full max-w-md h-20 min-h-16 p-4 px-6 m-2 mx-auto
  bg-white opacity-95 shadow-lg rounded-xl border border-gray-200
  whitespace-nowrap leading-6 tracking-wide font-semibold text-gray-600 text-sm
  transition-all duration-300 ease-in-out
  cursor-pointer select-none
  overflow-hidden
  hover:bg-gray-50 focus:outline-none active:scale-95 disabled:opacity-50
  md:w-1/2 lg:max-w-lg
  custom-class
"
```

# 1. Position

Position utilities come first.

### Order

```text
static
relative
absolute
fixed
sticky

inset
inset-x
inset-y

top
right
bottom
left

start
end

z
```

### Example

```tsx
className = 'fixed top-4 right-6 z-50';
```

# 2. Layout

Layout utilities come after positioning.

### Order

```text
display
flex/grid direction
flex wrapping
items
justify
content
self
place
gap
space
order
grow
shrink
basis
grid
```

### Example

```tsx
className = 'flex flex-col items-center justify-between gap-4 shrink-0';
```

# 3. Size / Spacing

### Order

```text
w / min-w / max-w
h / min-h / max-h
size

p
px / py / pt / pr / pb / pl

m
mx / my / mt / mr / mb / ml
```

### Example

```tsx
className = 'w-full max-w-md h-20 min-h-16 p-4 px-6 m-2 mx-auto';
```

# 4. Background / Visual

### Order

```text
bg
opacity
shadow
rounded
border
```

### Example

```tsx
className = 'bg-white opacity-95 shadow-lg rounded-xl border border-gray-200';
```

# 5. Typography

### Order

```text
whitespace
leading
tracking
font
text color
text size
```

### Example

```tsx
className = 'whitespace-nowrap leading-6 tracking-wide font-semibold text-gray-600 text-sm';
```

# 6. Transition

### Order

```text
transition
duration
ease
delay
animate
```

### Example

```tsx
className = 'transition-all duration-300 ease-in-out';
```

# 7. Interaction

### Order

```text
cursor
select
resize
appearance
pointer-events
touch
snap
```

### Example

```tsx
className = 'cursor-pointer select-none';
```

# 8. Overflow

### Order

```text
overflow
overflow-x
overflow-y
overscroll
scrollbar
```

### Example

```tsx
className = 'overflow-hidden overflow-x-auto overflow-y-auto scrollbar-thin';
```

# 9. State

State variants come after the base utility classes.

Common state variants:

```text
hover
focus
focus-within
focus-visible
active
visited
target

disabled
enabled

checked
indeterminate

default

required
valid
invalid

in-range
out-of-range

placeholder-shown
autofill

read-only
open

group-hover
group-focus
group-focus-within

peer-checked
peer-focus
peer-hover
```

### Example

```tsx
className="
  bg-white
  text-gray-800 text-sm
  transition
  hover:bg-gray-50
  focus:outline-none
  active:scale-95
  disabled:opacity-50
"
```

# 10. Responsive

Responsive utilities come after state utilities.

### Order

```text
sm
md
lg
xl
2xl
```

### Example

```tsx
className = 'w-full md:w-1/2 lg:max-w-lg';
```

# 11. Other / Custom Classes

Classes that don't match one of the predefined groups are placed at the end.

Example:

```tsx
className="
  flex items-center
  w-full
  bg-white
  custom-class
"
```

# Short Class Lists

When there are fewer than **10 classes**, keep all classes on a single line.

Example:

```tsx
<span className="flex items-center justify-center shrink-0 w-5">
```

The classes must still follow the defined ordering.

For example:

```tsx
className = 'w-full flex items-center';
```

becomes:

```tsx
className = 'flex items-center w-full';
```

# Long Class Lists

When there are **10 or more classes**, use multiline formatting.

Each logical group should be placed on its own line.

Example:

```tsx
<div
  className="
    fixed top-4 right-6 z-50
    flex items-center justify-between gap-4 shrink-0
    w-full max-w-md h-20 min-h-16 p-4 px-6 m-2 mx-auto
    bg-white opacity-95 shadow-lg rounded-xl border border-gray-200
    whitespace-nowrap leading-6 tracking-wide font-semibold text-gray-600 text-sm
    transition-all duration-300 ease-in-out
    cursor-pointer select-none
    overflow-hidden
    hover:bg-gray-50 focus:outline-none active:scale-95 disabled:opacity-50
    md:w-1/2 lg:max-w-lg
    custom-class
  "
>
```

# JSX `className` Placement

### 1. className as the Only Attribute

When `className` is the only JSX attribute and the class list is short, keep it inline.

Correct:

```tsx
<div className="flex-1 min-w-0">
```

Avoid:

```tsx
<div
  className="flex-1 min-w-0"
>
```

### 2. className with Other Attributes

When an element has other JSX attributes, `className` should be aligned with those attributes.

Correct:

```tsx
<button
  type="button"
  onClick={handleClearAll}
  disabled={draftSelectedFilterCount === 0}
  className="flex items-center gap-1"
>
```

Incorrect:

```tsx
<button
  type="button"
  onClick={handleClearAll}
  disabled={draftSelectedFilterCount === 0}

  className="flex items-center gap-1"
>
```

There should be **no blank line before `className`**.

### 3. Long className with Other Attributes

```tsx
<button
  type="button"
  onClick={handleModalOpen}
  aria-label={title}
  className="
    flex items-center gap-2 shrink-0
    h-10 px-3
    rounded-lg border
    whitespace-nowrap font-semibold text-gray-800 text-sm
    transition
    hover:bg-gray-50
  "
>
```

The structure should be:

```text
<element
  attribute
  attribute
  className="
    Tailwind classes
  "
>
```

### 4. React Component Formatting

The same rules apply to custom React components.

Example:

```tsx
<ChevronDown size={16} strokeWidth={2} className="shrink-0 text-gray-600" />
```

Example:

```tsx
<motion.div
  role="dialog"
  aria-modal="true"
  aria-labelledby={`${title}-dialog-title`}
  initial={{ y: '100%' }}
  animate={{ y: 0 }}
  exit={{ y: '100%' }}
  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
  onClick={(event) => event.stopPropagation()}
  className="
    relative
    flex flex-col
    w-full h-[88dvh] max-h-[88dvh] min-h-0
    bg-white shadow-2xl rounded-t-2xl
    overflow-hidden
    sm:w-200 sm:h-142 sm:max-h-[calc(100dvh-32px)] sm:rounded-xl
  "
>
```

`className` should always have the same indentation as the other JSX attributes.

### 5. Dynamic className

Dynamic classes should use the same grouping and indentation rules.

Example:

```tsx
<button
  type="button"
  onClick={handleModalOpen}
  aria-label={title}
  className={`
    flex items-center gap-2 shrink-0
    h-10 px-3
    rounded-lg border
    whitespace-nowrap font-semibold text-gray-800 text-sm
    transition
    ${
      hasSelectedFilters || isModalOpen
        ? 'border-gray-500 bg-gray-200 text-gray-800'
        : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50'
    }
  `}
>
```

### 6. Conditional class Formatting

Conditional expressions should use this structure:

```tsx
${
  condition
    ? 'class-a'
    : 'class-b'
}
```

Example:

```tsx
className={`
  flex items-center
  ${
    isActive
      ? 'bg-blue-500 text-white'
      : 'bg-gray-100 text-gray-800'
  }
`}
```

### 7. No Blank Lines Around className

Incorrect:

```tsx
<button
  type="button"
  onClick={handleClick}


  className="
    flex items-center
  "
>
```

Correct:

```tsx
<button
  type="button"
  onClick={handleClick}
  className="
    flex items-center
  "
>
```

# Indentation Rules

For a JSX element:

```tsx
<motion.div
  role="dialog"
  className="
    relative
    flex flex-col
  "
>
```

The indentation hierarchy is:

```text
<element
  attribute
  className="
    Tailwind class
  "
>
```

The closing quote/backtick should align with `className`.

# Formatter Script

The custom formatter is located at:

```text
scripts/format-tailwind.mjs
```

Do not manually reorder classes when the formatter is available.

Instead run:

```bash
npm run format
```

# Recommended Development Workflow

Before committing code:

```bash
npm run format
npm run lint
npm run type-check
```

Recommended workflow:

```text
Write code
    ↓
npm run format
    ↓
npm run lint
    ↓
npm run type-check
    ↓
Commit
```

# Formatting Rules Summary

```text
Position
    ↓
Layout
    ↓
Size / Spacing
    ↓
Background / Visual
    ↓
Typography
    ↓
Transition
    ↓
Interaction
    ↓
Overflow
    ↓
State
    ↓
Responsive
    ↓
Other / Custom
```

# Golden Rules

1. Do not manually reorder Tailwind classes.
2. Run `npm run format` before committing.
3. Fewer than 10 classes → single line.
4. 10 or more classes → grouped multiline.
5. `className` must align with other JSX attributes.
6. Never leave a blank line before `className`.
7. Text color comes before text size.
8. State variants come after base utilities.
9. Responsive variants come after state variants.
10. Custom/unknown classes come at the end.
11. Keep JSX indentation consistent.
12. Keep the custom formatter in `scripts/format-tailwind.mjs`.
