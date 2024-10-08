const SERVER_HOST =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const API_URL = `${SERVER_HOST}/api`;

export const ENV = {
  // SERVER_HOST: "https://apicoop.mt.gob.do:1337",
  // API_URL: "https://apicoop.mt.gob.do:1337/api",
  SERVER_HOST,
  API_URL,

  // SERVER_HOST: "https://coopadmin.up.railway.app",
  // API_URL: "https://coopadmin.up.railway.app/api",
  ENDPOINTS: {
    UPLOAD: "upload",
    OPTIONS: "option",
    HEADER: "header",
    FOOTER: "footer",
    GLOBAL: "global",
    AFFILIATION: {
      REQUEST: "affiliation-requests",
      SUBMIT_FORM: "affiliation-request/submit-form",
      STATUS_CHANGE: "affiliation-request-status-history/change-status",
    },
    AUTH: {
      REGISTER: "auth/local/register",
      LOGIN: "auth/local",
    },
    USERS: {
      ME: "users/me",
      UPDATE: "users",
    },
    // MEMBERSHIP: "membership-applications",
    MEMBERSHIP: {
      CHECK: "check-membership",
    },
    NOTIFICATIONS: {
      USER_NOTIFICATIONS: "notifications",
      PUBLIC_NOTIFICATIONS: "notifications",
    },
    ACCOUNT: {
      BALANCE: "get-balance",
      WITHDRAW: {
        TOTAL: "get-total-withdrawals",
      },
      SAVINGS: {
        TOTAL: "get-total-savings",
      },
      LOANS: {
        ACTIVE: "get-active-loans",
      },
    },
    CATEGORIES: {
      FIND: "categories",
    },
    POST_TYPES: "post-types",
    TAXONOMIES: "taxonomies",
    PRODUCTS: "products",
    WISHLIST: "wishlists",
    SUPPLIERS: "suppliers",
    ADS: "ads",
    COUNTRIES: {
      FIND: "countries",
    },
    STATES: {
      FIND: "states",
    },
    CITIES: {
      FIND: "cities",
    },
    ADDRESSES: {
      FIND: "addresses",
      CREATE: "addresses",
      UPDATE: "addresses",
      DELETE: "addresses",
    },
    SERVICES: "services",
    POSTS: "posts",
    PAGES: "pages",
    HOMEPAGE: "home-page",
    MENU: {
      MAIN: "main-menu",
    },
    PAYMENT_ORDER: "payment-order",
    ORDERS: "orders",
    LOAN_REQUEST: "loan-requests",
  },
  TOKEN: "COOP_JWT",
  CART: "COOP_CART_PRODUCTS",
  CALCULATOR: "COOP_CALCULATOR",
  APPLICATION: "COOP_APPLICATION",
  DB_API_URL: "",
  STRIPE_TOKEN:
    "pk_test_51OtDlgBMA14vrv0loxuhDyc4RfV7DE1bLoAaJy9rVAehOpOWXiNH2ex4R5Pkr72tYRU2zZJfXyzEx6URdG80akcm00xH3xCV9c",
};
