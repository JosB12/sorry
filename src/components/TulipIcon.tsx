type Props = { className?: string };

export function TulipIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 64 96" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M32 8 C 20 18, 14 30, 18 40 C 22 48, 30 46, 32 40 C 34 46, 42 48, 46 40 C 50 30, 44 18, 32 8 Z"
            fill="currentColor" opacity="0.9"/>
      <path d="M32 40 L 32 88" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.7"/>
      <path d="M32 70 C 22 68, 16 76, 14 84" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
      <path d="M32 60 C 44 58, 50 66, 52 74" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
    </svg>
  );
}

export function PawIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="14" cy="22" rx="6" ry="8"/>
      <ellipse cx="50" cy="22" rx="6" ry="8"/>
      <ellipse cx="24" cy="10" rx="5" ry="7"/>
      <ellipse cx="40" cy="10" rx="5" ry="7"/>
      <path d="M32 28 C 18 28, 14 44, 22 52 C 28 58, 36 58, 42 52 C 50 44, 46 28, 32 28 Z"/>
    </svg>
  );
}

export function HeartIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 21s-7-4.5-9.5-9C.7 8.6 2.5 4 6.5 4c2 0 3.5 1 5.5 3.2C13.9 5 15.5 4 17.5 4 21.5 4 23.3 8.6 21.5 12 19 16.5 12 21 12 21z"/>
    </svg>
  );
}
