<template>
<div class="lg:w-[28.57%] lg:p-4 ">
   <div :style='bgImage' class="w-full h-[240px] lg:h-full  bg-cover bg-center bg-no-repeat relative lg:rounded-2xl  " >
      <div class="pt-10 pl-16 lg:p-8 flex flex-row lg:flex-col text-white">
         <div class="flex flex-row lg:mt-6">
            <nav-number :number=1></nav-number>
            <div class="hidden lg:block ml-6">
               <nav-step>STEP 1</nav-step>
               <nav-text>YOUR INFO</nav-text>   
            </div>
         </div>
         <div class="ml-5 lg:ml-0 lg:flex flex-row lg:mt-10">
            <nav-number :number=2></nav-number>
            <div class="hidden lg:block ml-6">
               <nav-step>STEP 2</nav-step>
               <nav-text>SELECT PLAN</nav-text>
            </div>
         </div>
         <div class="ml-5 lg:ml-0 lg:flex flex-row lg:mt-10">
            <nav-number :number=3></nav-number>
            <div class="hidden lg:block ml-6">
               <nav-step>STEP 3</nav-step>
               <nav-text>ADD-ONS</nav-text>
            </div>
         </div>
         <div class="ml-5 lg:ml-0 lg:flex flex-row lg:mt-10">
            <nav-number :number=4></nav-number>
            <div class="hidden lg:block ml-6">
               <nav-step>STEP 4</nav-step>
               <nav-text>SUMMARY</nav-text>
            </div>
         </div>
      </div>       
   </div>
</div>
</template>


<script setup>
   import store from '../store.js'
   import picDesktop from '/src/assets/img/bg-sidebar-desktop.svg'
   import picMobile from '/src/assets/img/bg-sidebar-mobile.svg'
   import { ref, watch } from 'vue'
   import NavNumber from './NavNumber.vue'
   import NavStep from './NavStep.vue'
   import NavText from './NavText.vue'
   import axios from 'axios'

   const navNumber = NavNumber
   const navStep = NavStep
   const navText = NavText
   

   const bgImage = ref("")
   watch(() => store.wWidth, (newVal) => {
       bgImage.value = newVal > 1060 ? `background-image:url('${picDesktop}')` : `background-image:url('${picMobile}')`
   },{immediate:true})

   const billingYearly = ref(false)

   // user axios to get the price from the server
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