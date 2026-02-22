export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  ...props
}) {
  const base = 'rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center';
  const variants = {
    primary: 'bg-[var(--primary-600)] hover:bg-blue-700 text-white focus:ring-blue-500 px-6 py-3',
    accent: 'bg-[var(--accent-500)] hover:bg-emerald-600 text-white focus:ring-emerald-500 px-6 py-3',
    ghost: 'bg-transparent hover:bg-white/10 text-white border border-white/30 focus:ring-white/50 px-6 py-3',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-400 px-6 py-3',
    kakao: 'bg-[#FEE500] hover:bg-[#f5dc00] text-[#191919] focus:ring-yellow-400 px-6 py-3',
  };
  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
  };
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          처리 중...
        </>
      ) : (
        children
      )}
    </button>
  );
}
