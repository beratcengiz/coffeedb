
<template>
    <div class="card">
        <Menubar :model="items">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                </a>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Menubar from 'primevue/menubar';
import 'primeicons/primeicons.css'
const items = ref([
    {
        label: 'Anasayfa',
        icon: 'pi pi-home',
        route : '/admin'
    },
    {
        label: 'Günün Yemeği',
        icon: 'pi pi-home',
        route : '/mealoftheday'
    },
    {
        label: 'Çıkış Yap',
        icon: 'pi pi-exit',
        route : '/'
    },
]);
const navigate = () => {
    alert('selam')
}
const handleItemClick = (event) => {
    console.log('Tıklanan öğe:', event.item);
}
</script>
