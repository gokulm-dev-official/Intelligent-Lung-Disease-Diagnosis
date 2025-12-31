/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1976D2',
                secondary: '#00897B',
                success: '#4CAF50',
                warning: '#FF9800',
                error: '#F44336',
                dark: '#1E1E2E',
                light: '#F5F5F5',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
