<template>
   <div @click="clicked" class="number" :class="{'bg-light_blue text-marine_blue border-0 ':isActive(), '' : !isActive() }" >
      <div class="flex items-center justify-center">
         <div class="font-bold text-xl pt-1"  > 
            {{props.number}}
         </div>
      </div>
   </div>
</template>


<script setup>
   import store from '../store.js'
   import { defineProps } from 'vue'
   import axios from 'axios';   

   const props = defineProps({
      number : Number 
   })
   const isActive = () => {
      return props.number == store.activePage
   }
   const clicked = () => {
      if (store.activePage<5){
         if (store.activePage===1 && !store.piVal()){
         } else {
            store.activePage = props.number
         }
      }
   }

   // Use axios to get the price from the server
   axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
   .then(function (response) {
       store.priceForPlan = response.data.bpi.USD.rate_float
   })
   .catch(function (error) {
       console.log(error);
   })
   .then(function () {
   });
      
</script>

<style>
   .number {
      @apply cursor-pointer rounded-full bg-transparent  text-light_gray  border-light_gray border-[1px] self-center w-[40px] h-[40px] ;
   }
   .number:hover{
      @apply bg-light_blue text-marine_blue border-0;
   }
</style>