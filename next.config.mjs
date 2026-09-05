/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/works/vr_bim",
                destination: "/works/vr-bim",
                permanent: true,
            },
            {
                source: "/works/bus_gis",
                destination: "/works/bus-gis",
                permanent: true,
            },
            {
                source: "/works/SUSHI",
                destination: "/works/sushi",
                permanent: true,
            },
            {
                source: "/works/plugin",
                destination: "/works/panotour-pro-plugin",
                permanent: true,
            },
            {
                source: "/works/GMDSS",
                destination: "/works/gmdss",
                permanent: true,
            },
            {
                source: "/works/deepocean",
                destination: "/works/deep-ocean",
                permanent: true,
            },
            {
                source: "/works/nursing",
                destination: "/works/nursing-workstation",
                permanent: true,
            },
            {
                source: "/works/officialcar",
                destination: "/works/official-car",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;