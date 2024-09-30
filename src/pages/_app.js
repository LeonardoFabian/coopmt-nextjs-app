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

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <AuthProvider>
      <AccountProvider>
        <CartProvider>
          <ApplicationProvider>
            <ToastContainer />
            <Component {...pageProps} />
          </ApplicationProvider>
        </CartProvider>
      </AccountProvider>
    </AuthProvider>
  );
}
