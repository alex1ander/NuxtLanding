<template>

    <input
        type="text"
        v-model="searchQuery"
        @input="onInputChange"
        placeholder="Введите больше 3 символов"
    />
    <div v-if="loading">Загрузка...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="data">
        <ul>
            <li v-for="city in data" :key="city.Ref" @click="selectCity(city)">{{ city.DescriptionRu }}</li>
        </ul>
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
        };
    },
    methods: {
        onInputChange() {
            if (this.searchQuery.length >= 3) {
                this.fetchData(this.searchQuery);
            }
        },
        
        async fetchData(searchQuery) {
            const requestBody = {
                apiKey: "e348455c5f819ef38233382994714e31",
                modelName: "Address",
                calledMethod: "getCities",
                methodProperties: {
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
        selectCity(city) {
            document.cookie = `city=${city.DescriptionRu}; path=/;`;
            document.cookie = `cityRef=${city.Ref}; path=/;`;
            this.$router.push({ name: 'warehouses' });
        }


    },
  };
  </script>
  