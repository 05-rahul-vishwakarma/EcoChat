import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });
import Provider from "@/components/Providers";
import TopBar from "@/components/TopBar";


export const metadata = {
  title: "EcoChat",
  description: "EcoChat Web Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <Provider>
          <TopBar/>
          {children}
        </Provider>
      </body>
    </html>
  );
}
