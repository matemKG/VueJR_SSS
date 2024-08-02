const initDialog = () => {
    // Initialization logic if needed
};

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdn.jsdelivr.net/npm/vue@3.4.34/dist/vue.global.prod.js';

script.onload = function() {
    const { createApp, ref, h, onMounted } = Vue;

    const MyComponent = {
        setup() {
            const message = ref('Testing');
            const fetchedData = ref([]); 
            const myFunction = (event) => {
                if (event) event.stopPropagation(); // Prevent the click from bubbling up
                console.log(message.value);
            };
            
            const handleFetchResponse = (responseObject, isSuccess) => {
                if (isSuccess) {
                    console.log('Data transferred successfully!'); // Log the entire response
                    const getData = responseObject.result.getData; // Access the data
                    fetchedData.value = getData;
                    if (!getData || !getData.length) return [console.log('No data found!'),document.getElementById('fetchButton').innerHTML = 'No data found..'];
                    console.log('Transferred data:', getData); // Log the entire array of items
                } else {
                    console.error('Error fetching data:', responseObject); // Log any errors
                    document.getElementById('fetchButton').innerHTML = responseObject.status + ": " + responseObject.message;
                }
            };
            
            const onFetch = (event) => {
                // if (event) event.stopPropagation(); // Prevent the click from bubbling up
                jr_execute_dialog_function('calcAllowancePHP', {}, 
                    (successReturnObject) => handleFetchResponse(successReturnObject, true), 
                    (errorReturnObject) => handleFetchResponse(errorReturnObject, false)
                );  // Execute the PHP function to fetch all data
            };

            onMounted(async () => {
                initDialog(); // Call initDialog if needed
                onFetch(); // Automatically fetch data when the component is mounted
            });

            return {
                message,
                fetchedData,
                myFunction,
                handleFetchResponse // You can keep this if you want to expose it
            };
        },
        template: `
            <div class="bg-blue-200 p-4 rounded-md my-component">
                <h1 class="text-2xl text-blue-800">{{ message }}</h1>
                <button @click="myFunction" class="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Click Me</button> 
                
                <div class="mt-4">
                    <h2 class="text-xl">User List:</h2>
                    <ul>
                        <li v-for="(item,index) in fetchedData" :key="item.index" class="mt-2">
                            <strong>Name:</strong> {{ item.country }} <br>
                            <strong>Email:</strong> {{ item.day }} <br>
                            <strong>Permission:</strong> {{ item.night }}
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
    app.mount('#fetchButton');
};

document.head.appendChild(script);

// Include Tailwind CSS - v3.4.5.
var tailwindCSS = document.createElement('script');
tailwindCSS.type = 'text/javascript';
tailwindCSS.src = 'https://cdn.tailwindcss.com/3.4.5';
document.head.appendChild(tailwindCSS);
