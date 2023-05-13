<template>
   <div v-if="store.activePage<5" class="lg:mx-32 lg:mt-[80px] ">
      <p class="text-[2rem] lg:text-[2.3rem] font-bold"><slot name="header"></slot></p>
      <p class="mt-1 text-cool_gray font-medium text-[1.2rem] lg:text-[1.32rem]"><slot></slot></p>
   </div>
      
</template>


<script setup>
   import store from '../store.js'
   import axios from 'axios'

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