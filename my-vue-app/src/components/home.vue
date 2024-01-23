<template>
    <div class="wallpaper-register"></div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4 d-flex flex-column">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card mt-3">
                            <div class="card-body text-center">
                                <h4>Cafe</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6" v-for="(item, index) in list" :key="index" style="cursor: pointer;">
                        <div class="card mt-3" :class="{ 'selected-card': index === selectedCardIndex }"
                            @click="cardControls(item, index)">
                            <div class="card-body text-center" :id="item.id">
                                <h6>{{ item.label }}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-7">
                <div class="row mr-2">
                    <div class="col-md-12">
                        <div class="card mt-3" >
                            <Menubar :model="items">
                                <template #item="{ item, props, hasSubmenu, root }">
                                    <a v-ripple class="flex align-items-center" v-bind="props.action" style="color:black"
                                        @click="getMenuItem(item)">
                                        <span :class="item.icon" />
                                        <span class="ml-2">{{ item.label }}</span>
                                        <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }"
                                            :value="item.badge" />
                                        <span v-if="item.shortcut"
                                            class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{
                                                item.shortcut }}</span>
                                        <i v-if="hasSubmenu"
                                            :class="['pi pi-angle-down text-primary', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
                                    </a>
                                </template>
                            </Menubar>
                        </div>
                    </div>
                    <div class="custom-scroll-container">
                        <div class="col-md-12" v-for="item in filterProducts">
                            <Card class="mt-2 opacity-80" style="color:black;border: 1px solid grey;width:930px;">
                                <template #title> {{ item.name }} </template>
                                <template #content>
                                    <div class="d-flex">
                                        <img class="opacity-full" alt="user header" style="width: 150px;height: 75px;border-radius:30%" :src="item.image" />
                                        <p class="ml-5 mt-3 opacity-100">
                                            Açıklama : {{ item.description }}
                                        </p>
                                        <p class="ml-5 mt-3 opacity-100">
                                            Fiyat : {{ item.price }}
                                        </p>
                                    </div>
                                </template>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
const products = ref([]);
const selectedCardIndex = ref(null)
const filterProducts = ref([])
const cardElement = ref('')
const localIndex = ref(null)
onMounted(async () => {
    await getProducts();
    filterProducts.value = products.value.filter(el => el.category == 'Sıcak İçecekler');
})
const getMealOfDay = async () => {
        await axios
            .get(
                "https://shy-rose-armadillo-fez.cyclic.app/mealofday"
            )
            .then((res) => {
                console.log('res', res)
                filterProducts.value = res.data;
            })
            .catch((error) => console.log(error));
    };
const getProducts = async () => {
    await axios
        .get(
            "https://shy-rose-armadillo-fez.cyclic.app/posts"
        )
        .then((res) => {
            console.log('res', res)
            products.value = res.data;
        })
        .catch((error) => console.log(error));
};
const items = ref([
    {
        label: 'Sıcak İçecekler',
        icon: 'pi pi-home'
    },
    {
        label: 'Soğuk İçecekler',
        icon: 'pi pi-star'
    },
    {
        label: 'Atıştırmalıklar',
        icon: 'pi pi-home'
    },
    {
        label: 'Tatlılar',
        icon: 'pi pi-star'
    },
    {
        label: 'Nargile',
        icon: 'pi pi-star'
    },
    {
        label: "Yemekler",
        icon: 'pi pi-star'
    },
]);
const list = ref([
    {
        label: 'Sıcak İçecekler',
        icon: 'pi pi-home',
    },
    {
        label: 'Soğuk İçecekler',
        icon: 'pi pi-star',
    },
    {
        label: 'Atıştırmalıklar',
        icon: 'pi pi-home',
    },
    {
        label: 'Tatlılar',
        icon: 'pi pi-star',
    },
    {
        label: 'İletişim',
        icon: 'pi pi-star',
    },
    {
        label: 'Günün Menüsü',
        icon: 'pi pi-star',
    },

])
const cardControls = async(item, index) => {
    console.log('cardElement', index)
    selectedCardIndex.value = index;
    console.log('index',index)
    if(index == 5) {  
        await getMealOfDay()
    } else {
        filterProducts.value = products.value.filter(el => el.category == item.label);
    }
}
const getMenuItem = (item) => {
    selectedCardIndex.value = -1;
    console.log('products', products.value)
    console.log('item', item)
    filterProducts.value = products.value.filter(el => el.category == item.label);
}
</script>
<style>
.wallpaper-register {
    background: url('../assets/pexels-chevanon-photography-324028.jpg') no-repeat center center;
    background-size: cover;
    height: 100%;
    position: absolute;
    background-color: gray;
    width: 100%;
    z-index: -1;
}
.selected-card {
  background-color: rgb(232, 236, 240);
   /* Red background color */ /* Change the border color as needed */
  /* Add any other styles for the selected card */
}
.opactiy-full {
    opacity: 1 !important;
}
.custom-scroll-container {
  max-height: 600px;
  overflow: auto;
}

.custom-scroll-container::-webkit-scrollbar {
  width: 10px;
  background-color: #d3d3d3; /* Gri arka plan rengi */
  border-radius: 50px; /* Yuvarlak köşeler */
}

.custom-scroll-container::-webkit-scrollbar-thumb {
  background-color: #fdf9f9; /* Gri kaydırma kolunun rengi */
  border-radius: 50px; /* Yuvarlak köşeler */
}
</style>