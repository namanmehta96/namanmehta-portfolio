interface SplitCharsProps {
  text: string;
  charClassName?: string;
  /** Per-character transition-delay step in ms (for CSS hover effects). */
  delayStep?: number;
}

/**
 * Splits text into per-character spans (grouped by word so wrapping stays
 * natural). Purely presentational — callers must provide the accessible
 * text themselves (sr-only sibling or aria-label on the parent).
 */
export function SplitChars({ text, charClassName, delayStep = 0 }: SplitCharsProps) {
  let charIndex = 0;
  return (
    <span aria-hidden="true">
      {text.split(" ").map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`}>
          {wordIndex > 0 && " "}
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char) => {
              const i = charIndex++;
              return (
                <span
                  key={i}
                  className={`inline-block ${charClassName ?? ""}`}
                  style={
                    delayStep ? { transitionDelay: `${i * delayStep}ms` } : undefined
                  }
                >
                  {char}
                </span>
              );
            })}
          </span>
        </span>
      ))}
    </span>
  );
}
