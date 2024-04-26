export const ENV = {
    SERVER_HOST: "http://localhost:1338",
    API_URL: "http://localhost:1338/api",
    ENDPOINTS: {
        GLOBAL: "global",
        AUTH: {
            REGISTER: "auth/local/register",
            LOGIN: "auth/local",
        },
        USERS: {
            ME: "users/me",
            UPDATE: "users"
        },
        CATEGORIES: {
            FIND: "categories"
        },
        COUNTRIES:{
            FIND: "countries"
        },
        STATES: {
            FIND: "states"
        },
        CITIES: {
            FIND: "cities"
        },
        ADDRESSES: {
            FIND: "addresses",
            CREATE: "addresses",
            UPDATE: "addresses",
            DELETE: "addresses",
        },
        SERVICES: "services",
        POSTS: "posts",
        HOMEPAGE: "home-page",
        MENU: {
            MAIN: "main-menu"
        }
    },
    TOKEN: "COOP_JWT",
    DB_API_URL: "",
}