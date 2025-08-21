import clsx from 'clsx';

type ButtomVariantsColors = 'default' | 'ghost' | 'danger';
type ButtomVariantsSize = 'sm' | 'md' | 'lg';

type ButtomProps = {
  variant?: ButtomVariantsColors;
  size?: ButtomVariantsSize;
} & React.ComponentProps<'button'>;

export function Buttom({
  variant = 'default',
  size = 'sm',
  ...props
}: ButtomProps) {
  const variantColors = {
    default: clsx('bg-blue-600 text-blue-100', 'hover:bg-blue-800'),
    ghost: clsx('bg-slate-300 text-slate-900', 'hover:bg-slate-400'),
    danger: clsx('bg-red-600 text-red-100', 'hover:bg-red-800'),
  };
  const variantSizes = {
    sm: clsx(
      'px-2 py-1',
      'text-xs/tight rounded-sm',
      '[&_svg]:h-3 [&_svg]:w-3 gap-1',
    ),
    md: clsx(
      'px-4 py-2',
      'text-sm/tight rounded-md',
      '[&_svg]:h-4 [&_svg]:w-4 gap-2',
    ),
    lg: clsx(
      'px-6 py-3',
      'text-base/tight rounded-lg',
      '[&_svg]:h-5 [&_svg]:w-5 gap-3',
    ),
  };

  /* console.log(variantClasses[variant]); */
  const buttomColors = clsx(
    variantColors[variant],
    variantSizes[size],
    'cursor-pointer',
    'flex items-center justify-center',
    'transition',
    'disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400',
    props.className,
  );

  return <button {...props} className={buttomColors} />;
}
