import React from "react";
import { TypeAnimation } from "react-type-animation";

const CodeAnimation = () => {
    const codeSnippet = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<link rel="icon" type="image/svg+xml" href="/vite.svg" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Vite + React</title>
</head>
<body>
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
</body>
</html>
`;

    return (
        <div className="lg:w-1/2 flex text-white p-4 rounded-lg w-full ">
            <div className="text-center flex flex-col w-[10%] text-gray-400 font-mono font-bold pr-2">
                {Array.from({ length: codeSnippet.split("\n").length }).map((_, i) => (
                    <p key={i}>{i + 1}</p>
                ))}
            </div>

            <div className="w-[90%] flex flex-col gap-2 font-mono">
                <pre className="whitespace-pre-wrap">
                    <TypeAnimation
                        sequence={[
                            codeSnippet,
                            1000,
                            ""
                        ]}
                        repeat={Infinity}
                        style={
                            {
                                fontSize: "14px",
                                fontFamily: "monospace",
                                lineHeight: "1.5",
                                whiteSpace: "pre-wrap",
                                display: "block",
                            }
                        }
                        omitDeletionAnimation={true}
                    />
                </pre>
            </div>
        </div>
    );
};

export default CodeAnimation;
