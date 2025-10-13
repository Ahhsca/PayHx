enum TypographyVariant {
  Paragraph = "paragraph",
  H1 = "h1",
  H2 = "h2",
}
type TypographyProps = {
  variant: TypographyVariant;
  children: React.ReactNode;
};
export const Typography = ({ variant, children }: TypographyProps) => {
  switch (variant) {
    case TypographyVariant.H1: {
      return <p className="text-sm">{children}</p>;
    }
    case TypographyVariant.H2: {
    }
    case TypographyVariant.Paragraph: {
    }
  }
  return <></>;
};
