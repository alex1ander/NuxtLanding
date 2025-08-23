<template>
    <div>
        <input
            type="text"
            v-model="searchQuery"
            @input="onInputChange"
            placeholder="Введите больше 3 символов"
        />
        <h2>Информация о складах для города: {{ cityName }}{{ cityRef }}</h2>
        <div v-if="loading">Загрузка...</div>
        <div v-if="error" class="error">{{ error }}</div>

        <div v-if="data">
            <ul>
                <li v-for="warehouse in data" :key="warehouse.Ref">{{ warehouse.DescriptionRu }}</li>
            </ul>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
        return {
        searchQuery: '', // Строка для ввода
        data: null, // Ответ от API
        loading: false, // Индикатор загрузки
        error: null, // Ошибка запроса
        cityName: '',
        cityRef: '',
        };
    },

    created() {
        const city = this.getCookie('city');
        const cityRef = this.getCookie('cityRef');
        if (city && cityRef) {
            this.cityName = city;
            this.cityRef = cityRef;
        }
    },

    methods: {
        onInputChange() {
            if (!isNaN(this.searchQuery)) {
                this.fetchData(this.searchQuery);
            }
        },
        
        async fetchData(searchQuery) {

            searchQuery = 'Відділення №' + searchQuery;

            const requestBody = {
                apiKey: "e348455c5f819ef38233382994714e31",
                modelName: "Address",
                calledMethod: "getWarehouses",
                methodProperties: {
                    CityRef: this.cityRef,
                    FindByString: searchQuery, // Например, можно изменить значение динамически
                },
            };
    
            this.loading = true;
            this.error = null;
    
            try {
                const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody), // Передаем тело запроса в формате JSON
                });
        
                if (!response.ok) {
                    throw new Error('Ошибка запроса');
                }
    
                const result = await response.json();
                if(result.success && result.data.length > 0){
                    this.data = result.data;
                }else{
                    this.data = 'Ничего не найдено';
                }
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        }
    },
  };
  </script>
  