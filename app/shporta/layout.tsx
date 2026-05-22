export default function ShportaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div style={{ paddingTop: "var(--topbar-height)" }}>{children}</div>;
}
