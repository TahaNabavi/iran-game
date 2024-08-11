import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import ContextProvider from "./context/ContextProvider";
import DLCTips from "@/components/modals/dlcTips";
import AuthModal from "@/components/modals/auth";
import WelcomeModal from "@/components/modals/welcome";
import ThemesProvider from "./themeProvider";
import Footer from "./Footer";

const I18nProvider = dynamic(() => import("./i18n/I18nProvider"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Iran Game",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body className="bg-base-300 overflow-x-hidden">
        <script src="http://localhost:8097"></script>
        <ContextProvider>
          <I18nProvider>
            <ThemesProvider>
              <ToastContainer
                position="bottom-center"
                autoClose={8000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                stacked
                theme="dark"
              />

              {/* ========== */}
              <DLCTips />
              <AuthModal />
              <WelcomeModal />
              {/* ========== */}

              <main className="min-h-screen">
                <Sidebar />

                <div className="mRight pb-20 mb-20">{children}</div>
              </main>
              
              <Footer />
            </ThemesProvider>
          </I18nProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
