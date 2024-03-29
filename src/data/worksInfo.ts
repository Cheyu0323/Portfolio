type item = {
    id: string;
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
        id: 7,
        name: "seaweed",
        title: "seaweed-house",
        types: [{ id: "ty_6_1", item: "design" }],
        url: "https://cheyu0323.github.io/seaweed-house/",
        technologys: [
            { id: "te_6_1", item: "Next.js" },
            { id: "te_6_2", item: "Tailwindcss" },
        ],
        pics: {
            desktop: [
                { id: "pc_7_1", item: "/assets/work/swaweed/swaweed1.png" },
                { id: "pc_7_2", item: "/assets/work/swaweed/swaweed2.png" },
            ],
            mobile: [
                { id: "mb_7_1", item: "/assets/work/swaweed/swaweed3.png" },
                { id: "mb_7_2", item: "/assets/work/swaweed/swaweed4.png" },
                { id: "mb_7_3", item: "/assets/work/swaweed/swaweed5.png" },
            ],
        },
    },
    {
        id: 1,
        name: "SUSHI",
        title: "SUSHI SHOP",
        types: [{ id: "ty_1_1", item: "cover" }],
        url: "https://cheyu0323.github.io/SUSHI/",
        technologys: [
            { id: "te_1_1", item: "React Hooks" },
            { id: "te_1_2", item: "THREE.js" },
            { id: "te_1_3", item: "GreenSock" },
        ],
        pics: {
            desktop: [
                { id: "pc_1_1", item: "/assets/work/sushi/sushi1.png" },
                { id: "pc_1_2", item: "/assets/work/sushi/sushi2.png" },
            ],
            mobile: [
                { id: "mb_1_1", item: "/assets/work/sushi/sushi3.png" },
                { id: "mb_1_2", item: "/assets/work/sushi/sushi4.png" },
                { id: "mb_1_3", item: "/assets/work/sushi/sushi5.png" },
            ],
        },
    },
    {
        id: 6,
        name: "plugin",
        title: "Panotour Pro Plugin",
        types: [{ id: "ty_6_1", item: "design" }],
        url: "https://cheyu0323.github.io/CYs_PanotourPro_Plugin/",
        technologys: [
            { id: "te_6_1", item: "React Hooks" },
            { id: "te_6_2", item: "Material UI" },
        ],
        pics: {
            desktop: [
                { id: "pc_6_1", item: "/assets/work/plugin/plugin1.png" },
                { id: "pc_6_2", item: "/assets/work/plugin/plugin2.png" },
                { id: "pc_6_3", item: "/assets/work/plugin/plugin3.png" },
            ],
            mobile: [
                { id: "mb_6_1", item: "/assets/work/plugin/plugin4.png" },
                { id: "mb_6_2", item: "/assets/work/plugin/plugin5.png" },
                { id: "mb_6_3", item: "/assets/work/plugin/plugin6.png" },
            ],
        },
    },
    {
        id: 2,
        name: "GMDSS",
        title: "GMDSS",
        types: [{ id: "ty_2_1", item: "school" }],
        technologys: [
            { id: "te_2_1", item: "Unity" },
            { id: "te_2_2", item: "Photon" },
        ],
        pics: {
            desktop: [
                { id: "pc_2_1", item: "/assets/work/gmdss/gmdss1.png" },
                { id: "pc_2_2", item: "/assets/work/gmdss/gmdss2.png" },
                { id: "pc_2_3", item: "/assets/work/gmdss/gmdss3.png" },
                { id: "pc_2_4", item: "/assets/work/gmdss/gmdss4.png" },
                { id: "pc_2_5", item: "/assets/work/gmdss/gmdss5.png" },
            ],
        },
    },
    {
        id: 3,
        name: "deepocean",
        title: "藏藍回音",
        types: [{ id: "ty_3_1", item: "school" }],
        technologys: [
            { id: "te_3_1", item: "Unity" },
            { id: "te_3_2", item: "VR" },
        ],
        pics: {
            desktop: [
                { id: "pc_3_1", item: "/assets/work/deepocean/deepocean1.png" },
                { id: "pc_3_2", item: "/assets/work/deepocean/deepocean2.png" },
                { id: "pc_3_3", item: "/assets/work/deepocean/deepocean3.png" },
                { id: "pc_3_4", item: "/assets/work/deepocean/deepocean4.png" },
            ],
        },
    },
    {
        id: 4,
        name: "nursing",
        title: "護理工作車(評估、護理紀畫)",
        types: [{ id: "ty_3_1", item: "school" }],
        technologys: [
            { id: "te_4_1", item: "HTML" },
            { id: "te_4_2", item: "CSS" },
            { id: "te_4_3", item: "JavaScript" },
            { id: "te_4_4", item: "PHP5" },
            { id: "te_4_5", item: "MySQL" },
        ],
        pics: {
            desktop: [
                {
                    id: "pc_4_1",
                    item: "/assets/work/nursingworkcar/nursingworkcar1.png",
                },
                {
                    id: "pc_4_2",
                    item: "/assets/work/nursingworkcar/nursingworkcar2.png",
                },
                {
                    id: "pc_4_3",
                    item: "/assets/work/nursingworkcar/nursingworkcar3.png",
                },
                {
                    id: "pc_4_4",
                    item: "/assets/work/nursingworkcar/nursingworkcar4.png",
                },
                {
                    id: "pc_4_5",
                    item: "/assets/work/nursingworkcar/nursingworkcar5.png",
                },
            ],
        },
    },
    {
        id: 5,
        name: "officialcar",
        title: "公務車申請系統",
        types: [{ id: "ty_5_1", item: "school" }],
        technologys: [
            { id: "te_5_1", item: "HTML" },
            { id: "te_5_2", item: "CSS" },
            { id: "te_5_3", item: "JavaScript" },
            { id: "te_5_4", item: "PHP5" },
            { id: "te_5_5", item: "MySQL" },
        ],
        pics: {
            desktop: [
                { id: "pc_5_1", item: "/assets/work/officialcar/officialcar1.png" },
                { id: "pc_5_2", item: "/assets/work/officialcar/officialcar2.png" },
            ],
        },
    },
];

export default workInfo;
