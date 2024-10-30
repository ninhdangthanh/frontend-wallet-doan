"use client"
// app/layout.tsx

import ReduxProvider from "../redux/provider";
import ApiLoading from "./components/loading/apiLoading";
import "./../styles/global.css"
import { WebSocketProvider } from "./context/WebSocketContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <WebSocketProvider>
          {children}
          </WebSocketProvider>
          </ReduxProvider>
      </body>
    </html>
  );
}
