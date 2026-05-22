export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div style={{ paddingTop: "var(--topbar-height)" }}>{children}</div>;
}
