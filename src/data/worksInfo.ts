type item = {
    id: number;
    item: string;
};
interface work {
    id: number;
    name: string;
    title: string;
    types: Array<item>;
    url?: string;
    technologys: Array<item>;
    pics: {
        desktop: Array<item>;
        mobile?: Array<item>;
    };
}

const workInfo: Array<work> = [
    {
        id: 1,
        name: "SUSHI",
        title: "SUSHI SHOP",
        types: [{ id: 1, item: "cover" }],
        url: "https://cheyu0323.github.io/SUSHI/",
        technologys: [
            { id: 1, item: "React Hooks" },
            { id: 2, item: "THREE.js" },
            { id: 3, item: "GreenSock" },
        ],
        pics: {
            desktop: [
                { id: 1, item: "/assets/work/sushi/sushi1.png" },
                { id: 2, item: "/assets/work/sushi/sushi2.png" },
            ],
            mobile: [
                { id: 1, item: "/assets/work/sushi/sushi3.png" },
                { id: 2, item: "/assets/work/sushi/sushi4.png" },
                { id: 3, item: "/assets/work/sushi/sushi5.png" },
            ],
        },
    },
    {
        id: 6,
        name: "plugin",
        title: "Panotour Pro Plugin",
        types: [{ id: 1, item: "design" }],
        url: "https://cheyu0323.github.io/CYs_PanotourPro_Plugin/",
        technologys: [
            { id: 1, item: "React Hooks" },
            { id: 2, item: "Material UI" },
        ],
        pics: {
            desktop: [
                { id: 1, item: "/assets/work/plugin/plugin1.png" },
                { id: 2, item: "/assets/work/plugin/plugin2.png" },
                { id: 3, item: "/assets/work/plugin/plugin3.png" },
            ],
            mobile: [
                { id: 1, item: "/assets/work/plugin/plugin4.png" },
                { id: 2, item: "/assets/work/plugin/plugin5.png" },
                { id: 3, item: "/assets/work/plugin/plugin6.png" },
            ],
        },
    },
    {
        id: 2,
        name: "GMDSS",
        title: "GMDSS",
        types: [{ id: 1, item: "School" }],
        technologys: [
            { id: 1, item: "Unity" },
            { id: 2, item: "Photon" },
        ],
        pics: {
            desktop: [
                { id: 1, item: "/assets/work/gmdss/gmdss1.png" },
                { id: 2, item: "/assets/work/gmdss/gmdss2.png" },
                { id: 3, item: "/assets/work/gmdss/gmdss3.png" },
                { id: 4, item: "/assets/work/gmdss/gmdss4.png" },
                { id: 5, item: "/assets/work/gmdss/gmdss5.png" },
            ],
        },
    },
    {
        id: 3,
        name: "deepocean",
        title: "藏藍回音",
        types: [{ id: 1, item: "School" }],
        technologys: [
            { id: 1, item: "Unity" },
            { id: 2, item: "VR" },
        ],
        pics: {
            desktop: [
                { id: 1, item: "/assets/work/deepocean/deepocean1.png" },
                { id: 2, item: "/assets/work/deepocean/deepocean2.png" },
                { id: 3, item: "/assets/work/deepocean/deepocean3.png" },
                { id: 4, item: "/assets/work/deepocean/deepocean4.png" },
            ],
        },
    },
    {
        id: 4,
        name: "nursing",
        title: "護理工作車(評估、護理紀畫)",
        types: [{ id: 1, item: "School" }],
        technologys: [
            { id: 1, item: "HTML" },
            { id: 2, item: "CSS" },
            { id: 3, item: "JavaScript" },
            { id: 4, item: "PHP5" },
            { id: 5, item: "MySQL" },
        ],
        pics: {
            desktop: [
                {
                    id: 1,
                    item: "/assets/work/nursingworkcar/nursingworkcar1.png",
                },
                {
                    id: 2,
                    item: "/assets/work/nursingworkcar/nursingworkcar2.png",
                },
                {
                    id: 3,
                    item: "/assets/work/nursingworkcar/nursingworkcar3.png",
                },
                {
                    id: 4,
                    item: "/assets/work/nursingworkcar/nursingworkcar4.png",
                },
                {
                    id: 5,
                    item: "/assets/work/nursingworkcar/nursingworkcar5.png",
                },
            ],
        },
    },
    {
        id: 5,
        name: "officialcar",
        title: "公務車申請系統",
        types: [{ id: 1, item: "School" }],
        technologys: [
            { id: 1, item: "HTML" },
            { id: 2, item: "CSS" },
            { id: 3, item: "JavaScript" },
            { id: 4, item: "PHP5" },
            { id: 5, item: "MySQL" },
        ],
        pics: {
            desktop: [
                { id: 1, item: "/assets/work/officialcar/officialcar1.png" },
                { id: 2, item: "/assets/work/officialcar/officialcar2.png" },
            ],
        },
    },
];

export default workInfo;
