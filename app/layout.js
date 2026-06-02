import "./globals.css";

export const metadata = {
  title: "Sunni Bohra Community Heritage | History, Culture & Diaspora",
  description: "Explore the rich history, culture, regional subgroups, and global footprint of the Sunni Bohra community of Gujarat, presented in a premium interactive design.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
