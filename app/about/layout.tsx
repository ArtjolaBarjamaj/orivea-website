export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div style={{ paddingTop: "var(--topbar-height)" }}>{children}</div>;
}
