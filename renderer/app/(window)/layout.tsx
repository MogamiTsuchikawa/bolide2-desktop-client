import "../../global.css";
import "7.css/dist/7.scoped.css";

export const metadata = {
  title: "Title",
  description: "Setting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <div className="win7">{children}</div>
      </body>
    </html>
  );
}
