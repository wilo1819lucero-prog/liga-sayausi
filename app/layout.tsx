import "./globals.css";

export const metadata = {
  title: "Liga Sayausí",
  description: "App Liga Sayausí",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
