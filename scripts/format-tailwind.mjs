import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const EXTENSIONS = new Set(['.tsx', '.jsx']);

const IGNORE_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage']);

/*
|--------------------------------------------------------------------------
| Configuration
|--------------------------------------------------------------------------
*/

const MIN_CLASSES_FOR_MULTILINE = 7;
const INDENT_SIZE = 2;

/*
|--------------------------------------------------------------------------
| Tailwind Groups
|--------------------------------------------------------------------------
*/

const GROUPS = [
  /*
   * 1. Position
   */
  {
    name: 'position',

    patterns: [
      /^(static|relative|absolute|fixed|sticky)$/,

      /^(inset|inset-x|inset-y)-/,

      /^-?(top|right|bottom|left)-/,

      /^(start|end)-/,

      /^z-/,
    ],
  },

  /*
   * 2. Layout
   */
  {
    name: 'layout',

    patterns: [
      /^(block|inline|inline-block|flex|inline-flex|grid|inline-grid)$/,

      /^flex-/,

      /^items-/,
      /^justify-/,
      /^content-/,
      /^self-/,
      /^place-/,

      /^gap-/,
      /^space-/,

      /^order-/,

      /^grow/,
      /^shrink/,
      /^basis-/,

      /^grid-cols-/,
      /^grid-rows-/,
      /^auto-cols-/,
      /^auto-rows-/,
    ],
  },

  /*
   * 3. Size / spacing
   */
  {
    name: 'size-spacing',

    patterns: [
      /*
       * Width
       */
      /^w-/,
      /^min-w-/,
      /^max-w-/,

      /*
       * Height
       */
      /^h-/,
      /^min-h-/,
      /^max-h-/,

      /*
       * Size
       */
      /^size-/,

      /*
       * Padding
       */
      /^p-/,
      /^px-/,
      /^py-/,
      /^pt-/,
      /^pr-/,
      /^pb-/,
      /^pl-/,
      /^ps-/,
      /^pe-/,

      /*
       * Margin
       */
      /^m-/,
      /^mx-/,
      /^my-/,
      /^mt-/,
      /^mr-/,
      /^mb-/,
      /^ml-/,
      /^ms-/,
      /^me-/,
    ],
  },

  /*
   * 4. Background / visual
   */
  {
    name: 'background-visual',

    patterns: [/^bg-/, /^opacity-/, /^shadow/, /^rounded/, /^border/],
  },

  /*
   * 5. Typography
   */
  {
    name: 'typography',

    patterns: [
      /^whitespace-/,
      /^leading-/,
      /^tracking-/,
      /^font-/,
      /^text-/,

      /^align-/,
      /^break-/,

      /^truncate$/,

      /^decoration-/,

      /^list-/,
    ],
  },

  /*
   * 6. Transition
   */
  {
    name: 'transition',

    patterns: [/^transition/, /^duration-/, /^ease-/, /^delay-/, /^animate-/],
  },

  /*
   * 7. Interaction
   */
  {
    name: 'interaction',

    patterns: [
      /^cursor-/,
      /^select-/,
      /^resize/,
      /^appearance-/,
      /^pointer-events-/,
      /^touch-/,
      /^snap-/,
    ],
  },

  /*
   * 8. Overflow
   */
  {
    name: 'overflow',

    patterns: [/^overflow$/, /^overflow-/, /^overscroll-/, /^scrollbar-/],
  },
];

/*
|--------------------------------------------------------------------------
| State variants
|--------------------------------------------------------------------------
*/

const STATE_VARIANTS = new Set([
  'hover',
  'focus',
  'focus-within',
  'focus-visible',
  'active',
  'visited',
  'target',

  'disabled',
  'enabled',

  'checked',
  'indeterminate',

  'default',

  'required',
  'valid',
  'invalid',

  'in-range',
  'out-of-range',

  'placeholder-shown',
  'autofill',

  'read-only',
  'open',

  'group-hover',
  'group-focus',
  'group-focus-within',

  'peer-checked',
  'peer-focus',
  'peer-hover',
]);

/*
|--------------------------------------------------------------------------
| Responsive variants
|--------------------------------------------------------------------------
*/

const RESPONSIVE_VARIANTS = new Set(['sm', 'md', 'lg', 'xl', '2xl']);

/*
|--------------------------------------------------------------------------
| Exact class sequence
|--------------------------------------------------------------------------
*/

const CLASS_ORDER = [
  /*
   * ---------------------------------------------------------------
   * 1. Position
   * ---------------------------------------------------------------
   */

  'static',
  'relative',
  'absolute',
  'fixed',
  'sticky',

  'inset',
  'inset-x',
  'inset-y',

  'top',
  'right',
  'bottom',
  'left',

  'start',
  'end',

  'z',

  /*
   * ---------------------------------------------------------------
   * 2. Layout
   * ---------------------------------------------------------------
   */

  'block',
  'inline',
  'inline-block',

  'flex',
  'inline-flex',
  'grid',
  'inline-grid',

  'flex-row',
  'flex-row-reverse',
  'flex-col',
  'flex-col-reverse',

  'flex-wrap',
  'flex-wrap-reverse',
  'flex-nowrap',

  'items',
  'justify',
  'content',
  'self',
  'place',

  'gap',
  'space',

  'order',

  'grow',
  'shrink',
  'basis',

  'grid-cols',
  'grid-rows',
  'auto-cols',
  'auto-rows',

  /*
   * ---------------------------------------------------------------
   * 3. Size / spacing
   * ---------------------------------------------------------------
   */

  'w',
  'max-w',
  'min-w',

  'h',
  'max-h',
  'min-h',

  'size',

  /*
   * Padding
   */
  'p',
  'px',
  'py',
  'pt',
  'pr',
  'pb',
  'pl',
  'ps',
  'pe',

  /*
   * Margin
   */
  'm',
  'mx',
  'my',
  'mt',
  'mr',
  'mb',
  'ml',
  'ms',
  'me',

  /*
   * ---------------------------------------------------------------
   * 4. Background / visual
   * ---------------------------------------------------------------
   */

  'bg',
  'opacity',
  'shadow',
  'rounded',
  'border',

  /*
   * ---------------------------------------------------------------
   * 5. Typography
   * ---------------------------------------------------------------
   */

  'whitespace',
  'leading',
  'tracking',
  'font',

  /*
   * Text color MUST come before text size.
   */
  'text-color',
  'text-size',

  'align',
  'break',
  'truncate',
  'decoration',
  'list',

  /*
   * ---------------------------------------------------------------
   * 6. Transition
   * ---------------------------------------------------------------
   */

  'transition',
  'duration',
  'ease',
  'delay',
  'animate',

  /*
   * ---------------------------------------------------------------
   * 7. Interaction
   * ---------------------------------------------------------------
   */

  'cursor',
  'select',
  'resize',
  'appearance',
  'pointer-events',
  'touch',
  'snap',

  /*
   * ---------------------------------------------------------------
   * 8. Overflow
   * ---------------------------------------------------------------
   */

  'overflow',
  'overflow-x',
  'overflow-y',
  'overscroll',
  'scrollbar',

  /*
   * ---------------------------------------------------------------
   * 9. State
   * ---------------------------------------------------------------
   */

  'hover',
  'focus',
  'focus-within',
  'focus-visible',
  'active',
  'visited',
  'target',

  'disabled',
  'enabled',

  'checked',
  'indeterminate',

  'default',

  'required',
  'valid',
  'invalid',

  'in-range',
  'out-of-range',

  'placeholder-shown',
  'autofill',

  'read-only',
  'open',

  'group-hover',
  'group-focus',
  'group-focus-within',

  'peer-checked',
  'peer-focus',
  'peer-hover',

  /*
   * ---------------------------------------------------------------
   * 10. Responsive
   * ---------------------------------------------------------------
   */

  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
];

/*
|--------------------------------------------------------------------------
| Group sequence
|--------------------------------------------------------------------------
*/

const GROUP_ORDER = [
  'position',
  'layout',
  'size-spacing',
  'background-visual',
  'typography',
  'transition',
  'interaction',
  'overflow',
  'state',
  'responsive',
  'other',
];

/*
|--------------------------------------------------------------------------
| Basic helpers
|--------------------------------------------------------------------------
*/

function normalizeClasses(value) {
  return value.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
}

function getBaseClass(className) {
  return className.split(':').at(-1);
}

function getVariants(className) {
  const parts = className.split(':');

  if (parts.length <= 1) {
    return [];
  }

  return parts.slice(0, -1);
}

/*
|--------------------------------------------------------------------------
| Text utility classification
|--------------------------------------------------------------------------
*/

function isTextSizeClass(baseClass) {
  return /^text-(xs|sm|base|lg|xl|\d+xl)$/.test(baseClass);
}

function isTextColorClass(baseClass) {
  return (
    /^(text-(white|black|transparent|current|inherit))$/.test(baseClass) ||
    /^text-(gray|slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-/.test(
      baseClass,
    ) ||
    /^text-\[/.test(baseClass) ||
    /^text-\(--/.test(baseClass) ||
    /^text-(primary|secondary|muted|foreground|background|success|warning|danger|error)$/.test(
      baseClass,
    )
  );
}

/*
|--------------------------------------------------------------------------
| Get group
|--------------------------------------------------------------------------
*/

function getGroup(className) {
  const variants = getVariants(className);

  /*
   * Responsive classes
   */
  if (variants.some((variant) => RESPONSIVE_VARIANTS.has(variant))) {
    return 'responsive';
  }

  /*
   * State classes
   */
  if (variants.some((variant) => STATE_VARIANTS.has(variant))) {
    return 'state';
  }

  const baseClass = getBaseClass(className);

  for (const group of GROUPS) {
    if (group.patterns.some((pattern) => pattern.test(baseClass))) {
      return group.name;
    }
  }

  return 'other';
}

/*
|--------------------------------------------------------------------------
| Get exact class order
|--------------------------------------------------------------------------
*/

function getClassOrder(className) {
  const baseClass = getBaseClass(className);

  /*
   * text-size
   */
  if (isTextSizeClass(baseClass)) {
    return CLASS_ORDER.indexOf('text-size');
  }

  /*
   * text-color
   */
  if (isTextColorClass(baseClass)) {
    return CLASS_ORDER.indexOf('text-color');
  }

  const index = CLASS_ORDER.findIndex(
    (prefix) => baseClass === prefix || baseClass.startsWith(`${prefix}-`),
  );

  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

/*
|--------------------------------------------------------------------------
| Group + sort classes
|--------------------------------------------------------------------------
*/

function groupClasses(classes) {
  const groups = new Map();

  for (const className of classes) {
    const group = getGroup(className);

    if (!groups.has(group)) {
      groups.set(group, []);
    }

    groups.get(group).push(className);
  }

  return GROUP_ORDER.filter((group) => groups.has(group)).map((group) => {
    const sorted = groups.get(group).sort((a, b) => {
      const orderA = getClassOrder(a);

      const orderB = getClassOrder(b);

      return orderA - orderB;
    });

    return sorted.join(' ');
  });
}

/*
|--------------------------------------------------------------------------
| JSX indentation helpers
|--------------------------------------------------------------------------
*/

function getLineStart(source, index) {
  return source.lastIndexOf('\n', index - 1) + 1;
}

function getLineIndent(source, index) {
  const lineStart = getLineStart(source, index);

  const line = source.slice(lineStart, index);

  return line.match(/^[ \t]*/)?.[0] ?? '';
}

/*
 * Find the actual JSX opening element.
 *
 * This works with:
 *
 * <div
 * <button
 * <motion.div
 * <AnimatePresence
 * <ChevronDown
 * <Component.SubComponent
 */
function getJsxElementIndent(source, classNameStart) {
  const before = source.slice(0, classNameStart);

  let index = before.lastIndexOf('<');

  while (index >= 0) {
    const after = before.slice(index);

    /*
     * Valid JSX opening tag:
     *
     * <div
     * <motion.div
     * <Component
     */
    if (/^<[A-Za-z_$][\w$.-]*/.test(after)) {
      /*
       * Make sure this isn't a closing
       * tag.
       */
      if (!after.startsWith('</')) {
        return getLineIndent(source, index);
      }
    }

    index = before.lastIndexOf('<', index - 1);
  }

  /*
   * Fallback.
   */
  return getLineIndent(source, classNameStart);
}

function getClassNameIndent(source, classNameStart) {
  const elementIndent = getJsxElementIndent(source, classNameStart);

  return elementIndent + ' '.repeat(INDENT_SIZE);
}

/*
|--------------------------------------------------------------------------
| Detect other attributes
|--------------------------------------------------------------------------
*/

function hasOtherAttributes(source, classNameStart) {
  const before = source.slice(0, classNameStart);

  let openTagStart = before.lastIndexOf('<');

  const closeTagStart = before.lastIndexOf('>');

  /*
   * Find the current JSX opening tag.
   */
  while (openTagStart >= 0 && openTagStart < closeTagStart) {
    openTagStart = before.lastIndexOf('<', openTagStart - 1);
  }

  if (openTagStart < 0) {
    return false;
  }

  const openingPart = source.slice(openTagStart, classNameStart);

  /*
   * Remove element name.
   */
  const attributes = openingPart.replace(/^<[\w$.-]+/, '');

  return attributes.trim().length > 0;
}

/*
|--------------------------------------------------------------------------
| Template literal parser
|--------------------------------------------------------------------------
*/

function extractTemplateParts(value) {
  const parts = [];

  let cursor = 0;

  while (cursor < value.length) {
    const expressionStart = value.indexOf('${', cursor);

    if (expressionStart === -1) {
      const staticPart = value.slice(cursor);

      if (staticPart.trim()) {
        parts.push({
          type: 'static',
          value: staticPart,
        });
      }

      break;
    }

    const staticPart = value.slice(cursor, expressionStart);

    if (staticPart.trim()) {
      parts.push({
        type: 'static',
        value: staticPart,
      });
    }

    let depth = 1;

    let index = expressionStart + 2;

    let quote = null;

    while (index < value.length && depth > 0) {
      const char = value[index];

      if (quote) {
        if (char === quote && value[index - 1] !== '\\') {
          quote = null;
        }
      } else if (char === "'" || char === '"' || char === '`') {
        quote = char;
      } else if (char === '{') {
        depth++;
      } else if (char === '}') {
        depth--;
      }

      index++;
    }

    parts.push({
      type: 'expression',
      value: value.slice(expressionStart, index),
    });

    cursor = index;
  }

  return parts;
}

/*
|--------------------------------------------------------------------------
| Ternary formatter
|--------------------------------------------------------------------------
*/

function formatTernary(expression, indent) {
  const value = expression.trim();

  const match = value.match(/^\$\{\s*(.+?)\s*\?\s*(.+?)\s*:\s*(.+?)\s*\}$/);

  if (!match) {
    return `${indent}${value}`;
  }

  const condition = match[1].trim();

  const trueValue = match[2].trim();

  const falseValue = match[3].trim();

  const nestedIndent = indent + ' '.repeat(INDENT_SIZE);

  return [
    `${indent}\${${condition}`,
    `${nestedIndent}? ${trueValue}`,
    `${nestedIndent}: ${falseValue}`,
    `${indent}}`,
  ].join('\n');
}

/*
|--------------------------------------------------------------------------
| Build multiline className
|--------------------------------------------------------------------------
*/

function buildMultilineClassName({ source, start, groups, expressions = [], template = false }) {
  const classNameIndent = getClassNameIndent(source, start);

  const contentIndent = classNameIndent + ' '.repeat(INDENT_SIZE);

  const lines = [];

  /*
   * Static Tailwind groups
   */
  for (const group of groups) {
    lines.push(`${contentIndent}${group}`);
  }

  /*
   * Dynamic expressions
   */
  for (const expression of expressions) {
    if (expression.includes('?')) {
      lines.push(formatTernary(expression, contentIndent));
    } else {
      lines.push(`${contentIndent}${expression}`);
    }
  }

  let replacement;

  if (template) {
    replacement = `className={\`\n` + lines.join('\n') + `\n${classNameIndent}\`}`;
  } else {
    replacement = `className="\n` + lines.join('\n') + `\n${classNameIndent}"`;
  }

  return {
    replacement,
    classNameIndent,
  };
}

/*
|--------------------------------------------------------------------------
| Format normal className
|--------------------------------------------------------------------------
*/

function formatNormalClassName(source, start, value) {
  const classes = normalizeClasses(value);

  const groups = groupClasses(classes);

  /*
   * Fewer than 10 classes:
   *
   * One line.
   */
  if (classes.length < MIN_CLASSES_FOR_MULTILINE) {
    return {
      replacement: `className="${groups.join(' ')}"`,

      collapse: true,
    };
  }

  /*
   * 10+ classes:
   *
   * Multiline.
   */
  return {
    ...buildMultilineClassName({
      source,
      start,
      groups,
      template: false,
    }),

    collapse: false,
  };
}

/*
|--------------------------------------------------------------------------
| Format template className
|--------------------------------------------------------------------------
*/

function formatTemplateClassName(source, start, value) {
  const parts = extractTemplateParts(value);

  const staticClasses = [];

  const expressions = [];

  for (const part of parts) {
    if (part.type === 'static') {
      staticClasses.push(...normalizeClasses(part.value));
    }

    if (part.type === 'expression') {
      expressions.push(part.value.trim());
    }
  }

  const groups = groupClasses(staticClasses);

  /*
   * Fewer than 10 classes and
   * no dynamic expressions.
   */
  if (staticClasses.length < MIN_CLASSES_FOR_MULTILINE && expressions.length === 0) {
    return {
      replacement: `className="${groups.join(' ')}"`,

      collapse: true,
    };
  }

  return {
    ...buildMultilineClassName({
      source,
      start,
      groups,
      expressions,
      template: true,
    }),

    collapse: false,
  };
}

/*
|--------------------------------------------------------------------------
| Remove blank lines before className
|--------------------------------------------------------------------------
*/

function removeWhitespaceBeforeClassName(value) {
  /*
   * Remove ALL whitespace-only lines
   * immediately before className.
   *
   * Example:
   *
   * onClick={...}
   *
   *
   * className
   *
   * becomes:
   *
   * onClick={...}
   * className
   */
  return value.replace(/(?:[ \t]*\n[ \t]*)+$/, '');
}

/*
|--------------------------------------------------------------------------
| Process file
|--------------------------------------------------------------------------
*/

function processFile(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');

  /*
   * Matches:
   *
   * className="..."
   *
   * className={`...`}
   */
  const regex = /className\s*=\s*(?:"([\s\S]*?)"|{`([\s\S]*?)`})/g;

  const matches = [...source.matchAll(regex)];

  if (matches.length === 0) {
    return;
  }

  let result = '';

  let cursor = 0;

  let changed = false;

  for (const match of matches) {
    const start = match.index;

    if (start === undefined) {
      continue;
    }

    const fullMatch = match[0];

    const end = start + fullMatch.length;

    const normalValue = match[1];

    const templateValue = match[2];

    const formatted =
      normalValue !== undefined
        ? formatNormalClassName(source, start, normalValue)
        : formatTemplateClassName(source, start, templateValue);

    if (!formatted) {
      continue;
    }

    let before = source.slice(cursor, start);

    /*
     * ---------------------------------------------------------------
     * Fewer than 10 classes
     * ---------------------------------------------------------------
     */

    if (formatted.collapse) {
      const otherAttributes = hasOtherAttributes(source, start);

      /*
       * className is the ONLY attribute.
       *
       * Example:
       *
       * <div
       *   className="..."
       * >
       *
       * becomes:
       *
       * <div className="...">
       */
      if (!otherAttributes) {
        before = before.replace(/[ \t]*\n[ \t]*$/, ' ');

        result += before;

        result += formatted.replacement;
      } else {
        /*
         * Other attributes exist.
         *
         * className must be on its
         * own attribute line.
         */
        before = removeWhitespaceBeforeClassName(before);

        const classNameIndent = getClassNameIndent(source, start);

        result += before;

        result += '\n';

        result += classNameIndent;

        result += formatted.replacement;
      }

      cursor = end;

      changed = true;

      continue;
    }

    /*
     * ---------------------------------------------------------------
     * 10+ classes
     * ---------------------------------------------------------------
     */

    /*
     * Remove ALL existing blank lines
     * immediately before className.
     */
    before = removeWhitespaceBeforeClassName(before);

    const classNameIndent = getClassNameIndent(source, start);

    /*
     * Exactly ONE newline before
     * className.
     */
    result += before;

    result += '\n';

    result += classNameIndent;

    result += formatted.replacement;

    cursor = end;

    changed = true;
  }

  if (!changed) {
    return;
  }

  /*
   * Add remaining source.
   */
  result += source.slice(cursor);

  /*
   * Write only if changed.
   */
  if (result !== source) {
    fs.writeFileSync(filePath, result, 'utf8');

    console.log(`Tailwind formatted: ${path.relative(ROOT, filePath)}`);
  }
}

/*
|--------------------------------------------------------------------------
| Walk project
|--------------------------------------------------------------------------
*/

function walk(directory) {
  const entries = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);

      continue;
    }

    if (EXTENSIONS.has(path.extname(entry.name))) {
      processFile(fullPath);
    }
  }
}

/*
|--------------------------------------------------------------------------
| Run
|--------------------------------------------------------------------------
*/

walk(ROOT);
