// app/layout.tsx

import ReduxProvider from "../redux/provider";
import ApiLoading from "./components/loading/apiLoading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
          </ReduxProvider>
      </body>
    </html>
  );
}
