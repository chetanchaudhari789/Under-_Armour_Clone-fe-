import "@/styles/globals.css";
import "swiper/css";

import Navbar from "@/components/navbar/navbar.component";
import Footer from "@/components/footer/footer.component";
import BottomPromo from "@/components/promo/bottom-promo/bottom-promo.component";
import RouteObserver from "@/lib/route-observer";
import GlobalOverlays from "@/shared/layout/GlobalOverlays";
import ReactQueryProvider from "./ReactQueryProvider";
export const metadata = {
  title: "Under Armour Clone",
  description: "Performance sports apparel & shoes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <base href="/" />
      </head>

      <body>
        <ReactQueryProvider>
          <RouteObserver />
          <Navbar />
          <BottomPromo />
          <main>{children}</main>
          <Footer />
          <GlobalOverlays />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
