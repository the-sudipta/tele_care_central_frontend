import "@/styles/globals.css";
import {AuthProvider} from "@/pages/utils/authcontext";
import {IdProvider} from "@/pages/utils/idcontext";
import {StatusBadgeProvider} from "@/pages/utils/StatusBadgeContext";
import {ButtonColorProvider} from "@/pages/utils/ButtonColorContext";

export default function App({ Component, pageProps }) {
  return (
      <AuthProvider>
          <IdProvider>
              <StatusBadgeProvider>
                  <ButtonColorProvider>
                      <Component {...pageProps} />
                  </ButtonColorProvider>
              </StatusBadgeProvider>
          </IdProvider>
      </AuthProvider>
  );
}
