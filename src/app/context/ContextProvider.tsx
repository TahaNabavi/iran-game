"use client";
import { ReactNode } from "react";
import { AppProvider } from "./MyContext";
import ThemesProvider from "../themeProvider";
import dynamic from "next/dynamic";
const I18nProvider = dynamic(() => import("../i18n/I18nProvider"), {
  ssr: false,
});
export default function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <I18nProvider>
        <ThemesProvider>{children}</ThemesProvider>
      </I18nProvider>
    </AppProvider>
  );
}
