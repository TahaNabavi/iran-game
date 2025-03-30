import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./layout/Sidebar";
import ContextProvider from "./context/ContextProvider";
import DLCTips from "@comp-modals/dlcTips";
import AuthModal from "@comp-modals/auth";
import WelcomeModal from "@comp-modals/welcome";
import ThemesProvider from "./themeProvider";
import Footer from "./layout/Footer";
import DIR from "@comp-global/dir";
import { WEBSITE_DIR, WEBSITE_DOMIN, WEBSITE_LANG, WEBSITE_LOCALE } from "conf";
import { getMainMetaData } from "@comp-action/metadata";
import { ToastContainer } from "react-toastify";
import I18nProvider from "./i18n/I18nProvider";


export async function generateMetadata(): Promise<Metadata> {
  const data = await getMainMetaData();
  return {
    title: {
      default: data.title,
      template: data.title_tempalte,
    },
    description: data.description,
    metadataBase: new URL(WEBSITE_DOMIN),
    openGraph: {
      title: data.title,
      description: data.description,
      url: WEBSITE_DOMIN,
      siteName: data.website_name,
      images: [
        {
          url: data.banner,
          width: 1200,
          height: 630,
          alt: data.website_name,
        },
      ],
      locale: WEBSITE_LOCALE,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [data.logo],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: data.logo,
    },
    keywords: data.keywords,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={WEBSITE_LANG} dir={WEBSITE_DIR} data-theme="dark">
      <body className="bg-base-300 overflow-x-hidden">
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

                <div
                  className={DIR(
                    "md:p-[10px_130px_10px_30px]",
                    "md:p-[10px_30px_10px_130px]",
                    "p-[10px] w-full pb-20 mb-20"
                  )}
                >
                  {children}
                </div>
              </main>

              <Footer />
            </ThemesProvider>
          </I18nProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
