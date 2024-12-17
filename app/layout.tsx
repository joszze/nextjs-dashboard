import "@/app/ui/global.css";
import { Monitoring } from "react-scan/monitoring/next";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";

import { inter } from "@/app/ui/fonts";
import "@mantine/core/styles.css";
import { theme } from "@/theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <Monitoring
        apiKey="AYSbA-hau_p3YYy-iaVg_fewpWRK1sB-"
        url="https://monitoring.react-scan.com/api/v1/ingest"
      />
      <body className={`${inter.className} antialiased`}>
        {" "}
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
