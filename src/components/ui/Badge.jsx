export default function Badge({ children, variant = 'default', className = '' }) {
  const base = 'inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium';
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    accent: 'bg-emerald-100 text-emerald-800',
    primary: 'bg-blue-100 text-blue-800',
    dark: 'bg-[var(--primary-900)]/80 text-white',
  };
  return <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>;
}
