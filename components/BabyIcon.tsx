export function BabyIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="56" fill="#E8F4FC" />
      <circle cx="60" cy="52" r="28" fill="#FFD6A5" />
      <path
        d="M32 88c6-14 18-22 28-22s22 8 28 22"
        fill="#B8E0F6"
        stroke="#7EC8E3"
        strokeWidth="2"
      />
      <circle cx="50" cy="50" r="3" fill="#4A5568" />
      <circle cx="70" cy="50" r="3" fill="#4A5568" />
      <path
        d="M54 60c3 4 9 4 12 0"
        stroke="#4A5568"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="44" cy="58" r="4" fill="#FFB4B4" opacity="0.5" />
      <circle cx="76" cy="58" r="4" fill="#FFB4B4" opacity="0.5" />
      <path
        d="M60 18c-2 6-8 10-14 10"
        stroke="#7EC8E3"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M60 18c2 6 8 10 14 10"
        stroke="#7EC8E3"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="60" cy="16" r="5" fill="#F9D56E" />
    </svg>
  );
}
