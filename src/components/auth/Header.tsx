interface HeaderProps {
  label: string;
  subtitle?: string;
}

export const Header = ({ label, subtitle }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1 className="text-3xl font-semibold">{label}</h1>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
};
