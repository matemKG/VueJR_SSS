// Include Vue CDN - v3.4.34.
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdn.jsdelivr.net/npm/vue@3.4.34/dist/vue.global.prod.js';

script.onload = function() {
    const { createApp, ref, h } = Vue;

    const MyComponent = {
        setup() {
            const message = ref('Hola!!!');
            const myFunction = () => {
                console.log('Hola!');
            }
            return {
                message,
                myFunction
            };
        },
        template: `
            <div class="bg-blue-200 p-4 rounded-md my-component">
                <h1 class="text-2xl text-blue-800">{{ message }}</h1>
            </div>
        `,
        mounted(){
            const style = document.createElement('style');
            style.textContent = `
                .my-component{
                    border: 1px solid red;
                }
            `;
            document.head.appendChild(style);
        }
    };

    const app = createApp(MyComponent);
    app.mount('#vuePlayground');
};

document.head.appendChild(script);

// Include Tailwind CSS - v3.4.5.
var tailwindCSS = document.createElement('script');
tailwindCSS.type = 'text/javascript';
tailwindCSS.src = 'https://cdn.tailwindcss.com/3.4.5';
document.head.appendChild(tailwindCSS);
