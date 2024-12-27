const SERVER_HOST =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const API_URL = `${SERVER_HOST}/api`;

export const ENV = {
  SERVER_HOST,
  API_URL,
  ENDPOINTS: {
    MESSAGES: {
      FIND: "messages",
      TYPES: "message-types",
    },
    LOANS: {
      CLASSIFICATIONS: "loan-classifications",
      COLLATERALS: "collaterals",
      DISBURSEMENT_METHODS: "disbursement-methods",
    },
    FORMS: {
      LOANS: {
        APPLICATION: "loan-request-form/schema",
      },
    },
    UPLOAD: "upload",
    OPTIONS: "option",
    HEADER: "header",
    FOOTER: "footer",
    GLOBAL: "global",
    PRICES: "prices",
    EVENTS: {
      FIND: "events",
    },
    AFFILIATION: {
      REQUEST: "affiliation-requests",
      SUBMIT_FORM: "affiliation-request/submit-form",
      STATUS_CHANGE: "affiliation-request-status-history/change-status",
    },
    AUTH: {
      REGISTER: "auth/local/register",
      LOGIN: "auth/local",
      FORGOT_PASSWORD: "auth/forgot-password",
      RESET_PASSWORD: "auth/reset-password",
    },
    RELATIONSHIP_TYPES: "relationship-types",
    EMPLOYMENT_TYPES: "employment-types",
    EMPLOYMENT_SECTORS: "sectors",
    CURRENCIES: "currencies",
    BANKS: {
      FINANCIAL_INSTITUTIONS: "financial-institutions",
      ACCOUNTS: {
        TYPES: "bank-account-types",
      },
    },
    USERS: {
      ME: "users/me",
      UPDATE: "users",
      MARITAL_STATUSES: "marital-statuses",
      PERSONAL_REFERENCES: "personal-references",
      BENEFICIARIES: "beneficiaries",
      EMPLOYMENT_INFORMATION: "employment-informations",
      EMPLOYEE_DATA: "mt-employee-data",
      BANK_ACCOUNTS: "bank-accounts",
      USER_GROUPS: "user-groups",
      GENDERS: "genders",
    },
    MEMBERSHIP: {
      CHECK: "check-membership",
    },
    NOTIFICATIONS: {
      USER_NOTIFICATIONS: "notifications",
      PUBLIC_NOTIFICATIONS: "notifications",
    },
    ACCOUNT: {
      BALANCE: "get-balance",
      TRANSACTIONS: {
        FIND: "get-account-transactions",
        SAVINGS: "get-account-savings-transactions",
        WITHDRAWALS: "get-account-withdrawals-transactions",
        DISCOUNTS: {
          MONTHLY: "get-monthly-discounts",
          CURRENT_YEAR: {
            MONTHLY: "get-current-year-monthly-discounts",
          },
        },
      },
      WITHDRAW: {
        TOTAL: "get-total-withdrawals",
      },
      SAVINGS: {
        TOTAL: "get-total-savings",
        MONTHLY: {
          TOTAL_AMOUNT: "get-last-month-total-contribution-amount",
        },
        HISTORY: {
          LAST_TWO_MONTHS: "get-last-two-month-total-contribution-amount",
        },
      },
      LOANS: {
        ACTIVE: {
          FIND: "get-active-loans",
          FIND_ONE: {
            DETAILS: "get-loan-details",
            AMORTIZATION_SCHEDULE: "get-loan-amortization-schedule",
            INSTALLMENTS: {
              NEXT_ONE: {
                DETAILS: "get-loan-next-installment-details",
              },
            },
          },
          INSTALLMENTS: {
            NEXT_ONE: {
              DETAILS: "get-member-loans-next-installment-details",
            },
            NEXT_ALL: {
              DETAILS: "get-member-active-loans-next-installments-details",
            },
          },
        },

        MONTHLY: {
          TOTAL_AMOUNT: "get-last-month-total-loans-amount",
        },
        HISTORY: {
          LAST_TWO_MONTHS: "get-last-two-month-total-loans-amount",
        },
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
    PHONES: "phones",
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
    QUOTATION_REQUEST: "quotation-requests",
    CONTRIBUTION_CHANGE_REQUEST: "contribution-change-requests",
    CONTRIBUTION_CHANGE_TYPES: "contribution-change-types",
  },
  TOKEN: "COOP_JWT",
  CART: "COOP_CART_PRODUCTS",
  CALCULATOR: "COOP_CALCULATOR",
  APPLICATION: "COOP_APPLICATION",
  COOKIE_CONSENT_NAME: "coop_cookie_consent",
  DB_API_URL: "",
  STRIPE_TOKEN:
    "pk_test_51OtDlgBMA14vrv0loxuhDyc4RfV7DE1bLoAaJy9rVAehOpOWXiNH2ex4R5Pkr72tYRU2zZJfXyzEx6URdG80akcm00xH3xCV9c",
};
