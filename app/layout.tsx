"use client"
// app/layout.tsx

import ReduxProvider from "../redux/provider";
import ApiLoading from "./components/loading/apiLoading";
import "./../styles/global.css"

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
