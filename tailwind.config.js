/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,pug,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Craftwork Sans', 'system-ui', 'Helvetica', 'Arial', 'sans-serif'],
            serif: ['Craftwork Grotesk', 'serif'],
            caveat: ['Caveat', 'system-ui', 'Helvetica', 'Arial', 'sans-serif'],
        },
        container: {
            center: true, // Центрирование контейнера
            padding: '10px', // Отступы внутри контейнера
        },
        // container: {
        //     center: true, // Выравнивание контейнера по центру
        //     padding: {
        //         DEFAULT: '10px',
        //         'sm': '10px',
        //         'md': '10px',
        //         'lg': '40px',
        //         'xl': '40px',
        //     },
        //     screens: {
        //         'sm': '100%',
        //         'md': '100%', // Ширина контейнера на малых экранах
        //         'lg': '1020px', // Ширина контейнера на средних экранах
        //         'xl': '1240px', // Ширина контейнера на больших экранах
        //     },
        // },
        screens: {
            'xs': '320px',
            'sm': '480px',
            'md': '640px',  // Небольшие устройства
            'lg': '1020px',  // Средние устройства
            'xl': '1240px', // Большие устройства
        },
        extend: {
            colors: {
                blue: {
                    light: '#504895',
                    DEFAULT: '#52479A',
                    dark: '#171F66',
                    800: '#193083',
                    900: '#161F6A',
                },
                primary: '#161F6A',
                // secondary: '#14171A',
                // accent: '#657786',
                // background: '#F5F8FA',
            },
            gridTemplateColumns: {
                'comparisons': 'repeat(auto-fill, minmax(420px, 1fr))',
            }
        },
    },
    plugins: [],
}
