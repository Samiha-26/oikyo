import { LuCheck, LuDot } from "react-icons/lu";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export default function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumberOrSpecial = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);

  const passedCount = [hasMinLength, hasUppercase, hasLowercase, hasNumberOrSpecial].filter(Boolean).length;

  const strengthLabel =
    passedCount === 0
      ? ""
      : passedCount === 1
      ? "Weak"
      : passedCount === 2
      ? "Fair"
      : passedCount === 3
      ? "Good"
      : "Strong";

  const strengthColor =
    passedCount <= 1
      ? "bg-error"
      : passedCount === 2
      ? "bg-warning"
      : passedCount === 3
      ? "bg-info"
      : "bg-success";

  if (!password) return null;

  return (
    <div className="space-y-2.5 pt-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-base-content/60 font-medium">Password Security</span>
        <span className={`font-bold text-xs ${
          passedCount === 4 ? "text-success" : passedCount >= 2 ? "text-warning" : "text-error"
        }`}>
          {strengthLabel}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 h-1.5">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`rounded-full transition-all duration-300 ${
              step <= passedCount ? strengthColor : "bg-base-300"
            }`}
          ></div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px]">
        <div className={`flex items-center gap-1.5 ${hasMinLength ? "text-success font-semibold" : "text-base-content/50"}`}>
          {hasMinLength ? <LuCheck className="text-xs shrink-0" /> : <LuDot className="text-base shrink-0" />}
          <span>Min. 6 characters</span>
        </div>

        <div className={`flex items-center gap-1.5 ${hasUppercase ? "text-success font-semibold" : "text-base-content/50"}`}>
          {hasUppercase ? <LuCheck className="text-xs shrink-0" /> : <LuDot className="text-base shrink-0" />}
          <span>Uppercase letter (A-Z)</span>
        </div>

        <div className={`flex items-center gap-1.5 ${hasLowercase ? "text-success font-semibold" : "text-base-content/50"}`}>
          {hasLowercase ? <LuCheck className="text-xs shrink-0" /> : <LuDot className="text-base shrink-0" />}
          <span>Lowercase letter (a-z)</span>
        </div>

        <div className={`flex items-center gap-1.5 ${hasNumberOrSpecial ? "text-success font-semibold" : "text-base-content/50"}`}>
          {hasNumberOrSpecial ? <LuCheck className="text-xs shrink-0" /> : <LuDot className="text-base shrink-0" />}
          <span>Number or symbol</span>
        </div>
      </div>
    </div>
  );
}
