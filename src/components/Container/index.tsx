type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className='min-h-screen bg-[#f0f4f8] text-[#003F5C]'>
      <div className='mx-auto max-w-screen-lg px-8'>{children}</div>
    </div>
  );
}
