<template>
   <div class="lg:mx-32 ">
      <add-on-card class="mt-6 lg:mt-12" :index="1"></add-on-card>
      <add-on-card :index="2"></add-on-card>
      <add-on-card :index="3"></add-on-card>   
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

