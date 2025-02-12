import RootLayout from "@/components/RootLayout";
import "./globals.css";

export const metadata = {
  title: {
    template: "blog_app",
    default: "It's me, Qiming",
  },
};

export default function Layout({ children }) {
  return (
    <html
      lang="en"
      className="h-full bg-neutral-950 text-base antialiased text-neutral-100"
    >
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
