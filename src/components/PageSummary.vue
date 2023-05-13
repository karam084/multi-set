<template>
   <div class="lg:mx-32 bg-magnolia rounded-lg">
      <div  class="mt-4 px-4 lg:mt-14 lg:px-8">
         <div class="pt-6 pb-6 flex flex-row justify-between">
            <p class="text-marine_blue font-bold text-[18px]">{{`${store.plans[store.selectedPlan-1]} (${getBillingPeriod(1)})`}}</p>
            <p class="text-marine_blue font-bold  text-[18px]">{{`$${store.priceForPlan}/${getBillingPeriod(2)}`}}</p>
         </div>
         <div v-if="store.priceForAddons>0">
            <hr class="mt-3 mb-4 lg:mt-4 lg:mb-6 text-cool_gray">

            <div class=" " v-for="(item,index) in store.selectedAddons" :key="index">
               <div v-if="item" class="pb-6 lg:pb-8 flex flex-row justify-between">
                  <p class="text-cool_gray font-medium text-[17px]">{{store.addOns[index].t}}</p>
                  <p class="text-marine_blue font-medium text-[17px]">{{`+$${store.priceAddons[index] * (store.billingPlan==1? 12 : 1)}/${getBillingPeriod(2)}` }}</p>
               </div>
            </div>
         </div>   
      </div>
   </div>
   <div class="mt-6 mx-2 lg:mt-8 lg:mx-40 flex flex-row justify-between">
      <p class="text-cool_gray font-medium text-[17px]">{{`Total (per ${getBillingPeriod(3)})`}}</p>
      <p class="text-purplish_blue font-bold text-[24px]">{{`$${store.sum()}/${getBillingPeriod(2)}`}}</p>
   </div>
</template>


<script setup>
   import store from '../store.js'
   import axios from 'axios'

   
   const getBillingPeriod = (which) => {
      let bp = store.billingPlan
      if (which===1){
         return (bp===1 ? 'Yearly' : 'Monthly')
      } else if (which===2) {
         return (bp===1 ? 'yr' : 'mo')
      } else {
         return (bp===1 ? 'year' : 'month')
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


<style scoped>

</style>