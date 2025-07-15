import { cn } from "@/lib/utils"

export const WizardsChamberIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn(className)}
  >
    <path d="m5 2-3.5 3.5 4 4" />
    <path d="m14 6-4-4 4-4" />
    <path d="m19 13-4-4 4-4" />
    <path d="m22 21-3.5-3.5 4-4" />
    <path d="m13 19-4-4 4-4" />
    <path d="m2 5 4-4" />
    <path d="m6 14 4-4" />
    <path d="m13 22 4-4" />
    <path d="M9 12a3 3 0 1 1-3-3" />
    <path d="M16 19a3 3 0 1 1-3-3" />
  </svg>
)
