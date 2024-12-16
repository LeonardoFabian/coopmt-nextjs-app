import "semantic-ui-css/semantic.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "@/scss/global.scss";
import {
  AuthProvider,
  CartProvider,
  ApplicationProvider,
  AccountProvider,
} from "@/contexts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "material-symbols";
import { MessageBar } from "@/components/Layout";
import { Option } from "@/api";

const optionsController = new Option();

export default function App({ Component, pageProps, googleAnalyticsCode }) {
  return (
    <AuthProvider>
      <AccountProvider>
        <CartProvider>
          <ApplicationProvider>
            <MessageBar />
            <ToastContainer />
            {/* codigo de Google Analytics */}
            <script dangerouslySetInnerHTML={{ __html: googleAnalyticsCode }} />
            <Component {...pageProps} />
          </ApplicationProvider>
        </CartProvider>
      </AccountProvider>
    </AuthProvider>
  );
}

App.getInitialProps = async () => {
  try {
    const optionsResponse = await optionsController.getAll();
    const googleAnalyticsCode =
      optionsResponse?.data?.attributes?.googleAnalyticsCode || "";
    return { googleAnalyticsCode };
  } catch (error) {
    console.error("Error fetching options: ", error);
    return { googleAnalyticsCode: "" };
  }
};
