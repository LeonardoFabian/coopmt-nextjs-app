export function getStrapiURL() {
    return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
    // return process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://apicoop.mt.gob.do";
}

export function getStrapiMedia(url: string | null) {
    if (url == null) return null;
    if (url.startsWith("data:")) return url;
    if (url.startsWith("http") || url.startsWith("//")) return url;
    return `${getStrapiURL()}${url}`;
}