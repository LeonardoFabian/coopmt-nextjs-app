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
import "yet-another-react-lightbox/styles.css";
import "material-symbols";
import {
  MessageBar,
  NotificationToast,
  CookieConsent,
} from "@/components/Layout";
import { Option, Gender, User } from "@/api";
import { useEffect } from "react";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import Script from "next/script";
import ReactGA from "react-ga";

const optionsController = new Option();
const genderController = new Gender();
const userController = new User();

export default function App({ Component, pageProps, googleAnalyticsCode }) {
  useEffect(() => {
    ReactGA.initialize(googleAnalyticsCode);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <>
      {/* Cargar el script de Google Analytics */}
      {/* <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsCode}`}
        strategy="afterInteractive"
      /> */}
      {/* Configuración inicial del script */}
      {/* <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', '${googleAnalyticsCode}');
        `,
        }}
      /> */}

      <AuthProvider>
        <AccountProvider>
          <CartProvider>
            <ApplicationProvider>
              <AnalyticsWrapper googleAnalyticsCode={googleAnalyticsCode}>
                <NotificationToast />
                <MessageBar />
                <ToastContainer />
                <AppContent Component={Component} pageProps={pageProps} />
              </AnalyticsWrapper>
            </ApplicationProvider>
          </CartProvider>
        </AccountProvider>
      </AuthProvider>
    </>
  );
}

function AppContent({ Component, pageProps }) {
  const { user, updateUser } = useAuth();

  const handleAccept = async () => {
    if (typeof window.gtag === "function") {
      window.gtag("config", pageProps.googleAnalyticsCode);
    }
    if (user) {
      await updateConsent("accepted");
    }
  };

  const handleReject = async () => {
    if (typeof window.gtag === "function") {
      window.gtag("config", pageProps.googleAnalyticsCode, {
        anonymize_ip: true,
      });
    }
    if (user) {
      await updateConsent("rejected");
    }
  };

  const updateConsent = async (consentValue) => {
    try {
      if (user) {
        await userController.updateMe(user.id, {
          cookies_consent: consentValue,
        });
        updateUser("cookies_consent", consentValue);
      }
    } catch (error) {
      console.error("Error updating consent in Strapi:", error);
    }
  };

  return (
    <>
      <Component {...pageProps} />
      <CookieConsent
        isLoggedIn={!!user}
        userId={user?.id}
        onAccept={handleAccept}
        onReject={handleReject}
        updateConsent={updateConsent}
      />
    </>
  );
}

function AnalyticsWrapper({ children, googleAnalyticsCode }) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (
        user &&
        typeof window.gtag === "function" &&
        user.cookies_consent === "accepted"
      ) {
        try {
          const genderResponse = await genderController.findOne(user.gender);
          const genderName =
            genderResponse?.data?.attributes?.name || "No Especificado";

          window.gtag("config", googleAnalyticsCode, {
            user_id: user.id,
            custom_map: {
              sexo: genderName,
              edad: user?.birthdate ? calculateUserAge(user?.birthdate) : null,
            },
          });

          window.gtag("set", "user_data", {
            email: user.email,
            phone_number: `+1${user?.defaultPhone?.number}`,
            address: {
              first_name: user?.firstName,
              last_name: user?.lastName,
              street: user?.defaultAddress?.address,
              city: user?.defaultAddress?.city?.name,
              region: user?.defaultAddress?.state?.name,
              postal_code: user?.defaultAddress?.postalCode,
              country: user?.defaultAddress?.country?.code,
            },
            gender: genderName,
            age: user?.birthdate ? calculateUserAge(user?.birthdate) : null,
          });

          window.gtag("event", "page_view", {
            page_title: document.title,
            page_path: window.location.pathname,
            user_id: user?.id || "visitante",
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user, googleAnalyticsCode, router.pathname]);

  return <>{children}</>;
}

function calculateUserAge(birthDate) {
  if (!birthDate) return null;
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

App.getInitialProps = async () => {
  try {
    const optionsResponse = await optionsController.getAll();
    const googleAnalyticsCode =
      optionsResponse?.data?.attributes?.googleAnalyticsCode || "";
    return { googleAnalyticsCode };
  } catch (error) {
    console.error("Error fetching options:", error);
    return { googleAnalyticsCode: "" };
  }
};
