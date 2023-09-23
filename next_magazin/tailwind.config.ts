import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                luxury: {
                    ...require("daisyui/src/theming/themes")["[data-theme=luxury]"],
                    "base-100": "#000",
                    "primary": "#F2C83B",
                },
            },
        ],
    },
}
export default config
