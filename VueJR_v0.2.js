var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdn.jsdelivr.net/npm/vue@3.4.34/dist/vue.global.prod.js';

script.onload = function() {
    const { createApp, ref, h, onMounted } = Vue;

    const MyComponent = {
        setup() {
            const message = ref('Hola!!!');
            const users = ref([]); // Reactive array to hold user data

            const myFunction = () => {
                console.log('Hola!');
            }
            onMounted(async () => {
                console.log('Component mounted');
                try {
                    const response = await fetch('https://demo8895593.mockable.io/users');
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    users.value = data;
                } catch (error) {
                    console.error('Fetch error:', error);
                    users.value = [];
                }
            });
            return {
                message,
                myFunction,
                users
            };
        },
        template: `
            <div class="bg-blue-200 p-4 rounded-md my-component">
                <h1 class="text-2xl text-blue-800">{{ message }}</h1>
                <button @click="myFunction" class="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Click Me</button>
                <div class="mt-4">
                    <h2 class="text-xl">User List:</h2>
                    <ul>
                        <li v-for="user in users" :key="user.id" class="mt-2">
                            <strong>Name:</strong> {{ user.name }} <br>
                            <strong>Email:</strong> {{ user.email }} <br>
                            <strong>Permission:</strong> {{ user.permission }}
                        </li>
                    </ul>
                </div>
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
