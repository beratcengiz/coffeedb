<template>
    <div class="container-fluid wallpaper-register">
        <div class="row">
            <div class="col-md-4 d-flex flex-column">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card mt-3" style="background-color: #DDF2FD;">
                            <div class="card-body text-center">
                                <div class="d-flex align-items-center justify-content-center">
                                    <img style="position: absolute;" class="logo-img" src="../assets/avasin.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 col-sm-12 col-lg-6" v-for="(item, index) in list" :key="index"
                        style="cursor: pointer;">
                        <div class="card mt-3"
                            :class="{ 'selected-card': index === selectedCardIndex, 'card-color': index !== selectedCardIndex }"
                            @click="cardControls(item, index)">
                            <div class="card-body text-center" :id="item.id">
                                <h6>{{ item.label }}</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="card mt-3 card-color" style="cursor: pointer;"
                            :class="{ 'selected-card': selectedCardIndex === 6, 'card-color': selectedCardIndex !== 6 }">
                            <div class="card-body text-center " @click="cardControls('Nargile')">
                                <h6>Nargile</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-7">
                <div class="row mr-2">
                    <!-- <div class="col-md-12">
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
                    </div> -->
                    <div class="col-md-12" v-for="item in filterProducts">
                        <div class="custom-scroll-container">
                            <Card class="mt-2 opacity-80 " style="color:black;border: 1px solid grey;">
                                <template #title> {{ item.category }} </template>
                                <template #content>
                                    <div class="d-flex">
                                        <img class="opacity-full" alt="user header" style="width: 150px;height: 150px;"
                                            :src="item.image" />
                                        <div class="d-flex flex-column">
                                            <div class="ml-5">
                                                <h3 style="border-bottom: 1px solid black;">{{ item.name }}</h3>
                                            </div>
                                            <div>
                                                <p class="ml-5 mt-3 opacity-100">
                                                    Açıklama : {{ item.description }}
                                                </p>
                                                <p class="ml-5 mt-3 opacity-100">
                                                    Fiyat : {{ item.price }}
                                                </p>
                                            </div>
                                        </div>
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
const a = ref([])
const cardElement = ref('')
const localIndex = ref(null)
onMounted(async () => {
    await getProducts();
    filterProducts.value = products.value.filter(el => el.category == 'Sıcak İçecekler');
})
const getMealOfDay = async () => {
    await axios
        .get(
            "https://mock-data-5ynd.onrender.com/mealofday"
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
            "https://mock-data-5ynd.onrender.com/posts"
        )
        .then((res) => {
            console.log('res', res)
            products.value = res.data;
            a.value = res.data
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
const cardControls = async (item, index) => {
    if (item == 'Nargile') {
        selectedCardIndex.value = 6;
        filterProducts.value = products.value.filter(el => el.category == item);
    } else {
        console.log('cardElement', index)
        selectedCardIndex.value = index;
        console.log('index', index)
        if (index == 5) {
            await getMealOfDay()
        } else {
            filterProducts.value = products.value.filter(el => el.category == item.label);
            // filterProducts.value = products.value
        }
    }
    if (window.innerWidth < 600) {
        window.scrollTo({
            top: 350,
            behavior: 'smooth'
        });
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
    height: 1200px;
    position: absolute;
    background-color: gray;
    width: 100%;
    z-index: -1;
}

.logo-img {
    width: 125px;
    height: 75px;
}

@media only screen and (max-width: 600px) {
    .card {
        height: 89px;
        /* veya diğer uygun boyutlama seçenekleri */
    }

}

.card-color {
    background-color: #DDF2FD;
    ;
}

.selected-card {
    background-color: white
        /* Red background color */
        /* Change the border color as needed */
        /* Add any other styles for the selected card */
}

.opactiy-full {
    opacity: 1 !important;
}

.custom-scroll-container {
    max-height: 750px;
    overflow: auto;
}

.custom-scroll-container::-webkit-scrollbar {
    width: 10px;
    background-color: #d3d3d3;
    /* Gri arka plan rengi */
    border-radius: 50px;
    /* Yuvarlak köşeler */
}

.custom-scroll-container::-webkit-scrollbar-thumb {
    background-color: #fdf9f9;
    /* Gri kaydırma kolunun rengi */
    border-radius: 50px;
    /* Yuvarlak köşeler */
}
</style>