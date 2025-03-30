// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const SectionSeparator = ({
  children,
  bgColor = 'var(--bg-color)',
  marginTop = 'mt-12',
  pbSm = 'sm:pb-16',
  pbLg = 'lg:pb-20',
  pbXl = 'xl:pb-24',
  minHeight = 'h-[100vh]',
}) => {
  return (
    <div className="relative w-full flex items-center justify-center">
      <section
        className={`${minHeight} ${pbSm} ${pbLg} ${pbXl} bg-[${bgColor}] ${marginTop}`}
      >
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="relative">{children}</div>
        </div>
      </section>
    </div>
  );
};

export { SectionSeparator };
