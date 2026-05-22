export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div style={{ paddingTop: "var(--topbar-height)" }}>{children}</div>;
}
