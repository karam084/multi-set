<template>
    <div class="lg:mx-32 ">
      <div  class="mt-4 lg:mt-9 lg:flex lg:flex-row  lg:gap-5">
         <plan-card class="mb-2 lg:mb-0" :index="1"></plan-card>
         <plan-card class="mb-2 lg:mb-0" :index="2"></plan-card>
         <plan-card class="mb-6 lg:mb-0" :index="3"></plan-card>
      </div>
      <div class=" lg:mt-10 w-full bg-magnolia rounded-xl">
         <div class="flex flex-row justify-center items-center ">
            <div class="my-4 mr-4 font-bold" :class="{'text-marine_blue' : store.billingPlan==12, 'text-cool_gray' : store.billingPlan==1}">Monthly</div>
            <div class="-mt-3">
               <label class="toggle-control">
                  <input v-model="billingYearly" type="checkbox" checked="checked">
                     <span class="control"></span>
                  </label>               

            </div>
            <div class="my-4 ml-4 font-bold" :class="{'text-marine_blue' : store.billingPlan==1, 'text-cool_gray' : store.billingPlan==12}">Yearly</div>
         </div>
      </div>
   </div>
</template>


<script setup>
   import store from '../store.js'
   import axios from 'axios'
   
   const billingYearly = ref(false)

   watch(() => billingYearly.value, (newVal) => {
       store.billingPlan = newVal === false ? 12 : 1
       if (newVal===false){
         store.priceForPlan /= 10
       } else {
         store.priceForPlan *= 10
       }

   },{immediate:false})

    watch(() => store.billingPlan, (newVal) => {
        billingYearly.value = newVal === 12 ? false : true
    },{immediate:false})

    watch(() => store.priceForPlan, (newVal) => {
        store.priceForPlan = newVal
    },{immediate:false})

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
.toggle-control {
  display: block;
  position: relative;
  padding-left: 50px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}
.toggle-control input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.toggle-control input:checked ~ .control {
  background-color: black;
}
.toggle-control input:checked ~ .control:after {
  left: 30px;
}
.toggle-control .control {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 50px;
  border-radius: 12.5px;
  background-color: black;
  transition: background-color 0.15s ease-in;
}
.toggle-control .control:after {
  content: "";
  position: absolute;
  left: 5px;
  top: 5px;
  width: 15px;
  height: 15px;
  border-radius: 12.5px;
  background: white;
  transition: left 0.15s ease-in;
}
</style>