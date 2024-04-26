import { ENV } from "@/utils";
import { flattenAttributes } from "@/utils";
import qs from 'qs';

const mainMenuQuery = qs.stringify({
    populate: {
        menuItems: {
            populate: {
                icon: {
                    fields: ["url", "alternativeText"]
                },
                sections: {
                    populate: {
                        links: {
                            populate: {
                                icon: {
                                    fields: ["url", "alternativeText"]
                                }
                            }
                        },
                        components: {
                            populate: {
                                page: {
                                    populate: {
                                        featuredImage: {
                                            fields: ["url", "alternativeText"]
                                        }
                                    }
                                },
                                icon: {
                                    fields: ["url", "alternativeText"]
                                },
                                pages: {
                                    populate: {
                                        featuredImage: {
                                            fields: ["url", "alternativeText"]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});

export class MainMenu {
    async find() {
        const baseUrl = `${ENV.API_URL}/`;
        const path = `${ENV.ENDPOINTS.MENU.MAIN}`;

        const url = new URL(path, baseUrl);
        url.search = mainMenuQuery;
        console.log(url.href);

        try {
            const response = await fetch(url.href, { cache: 'no-store' });
            const result = await response.json();

            const flattenedData = flattenAttributes(result);

            if(response.status !== 200) throw flattenedData;

            return flattenedData;
        } catch (error) {
            throw error;
        }
    }
}