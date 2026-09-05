import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt = "張哲瑜 Cheyu｜副資料工程師・前端工程師作品集";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "90px",
                    background: "#f5f5f5",
                    color: "#202020",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        fontSize: 26,
                        letterSpacing: 8,
                        fontWeight: 300,
                    }}
                >
                    CHEYU
                </div>
                <div
                    style={{
                        display: "flex",
                        marginTop: 60,
                        fontSize: 72,
                        fontWeight: 700,
                        letterSpacing: 6,
                    }}
                >
                    張哲瑜
                </div>
                <div
                    style={{
                        display: "flex",
                        marginTop: 24,
                        fontSize: 30,
                        fontWeight: 400,
                        letterSpacing: 3,
                    }}
                >
                    FRONTEND ENGINEER
                </div>
                <div
                    style={{
                        display: "flex",
                        marginTop: "auto",
                        fontSize: 20,
                        letterSpacing: 2,
                        opacity: 0.6,
                    }}
                >
                    cheyu-portfolio.vercel.app
                </div>
            </div>
        ),
        size
    );
}
