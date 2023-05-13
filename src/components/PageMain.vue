<template>
   <div class=" lg:bg-white lg:h-full  lg:w-[71.43%] relative">
      <page-header>
         <template #header>{{getHeader('t')}}</template>
         {{getHeader('s')}}
      </page-header>
      <KeepAlive>
         <component  :is=currentComp></component>
      </KeepAlive>
      
      <div v-if="store.activePage > 1 && store.activePage < 5" @click="back()" class="absolute top-[495px] lg:top-[680px] lg:left-[130px]">
         <button class="text-cool_gray font-bold hover:text-marine_blue hover:text-[20px]">Go Back</button>
      </div>
      <div v-if="store.activePage < 5" class="absolute top-[480px] right-[0px] lg:top-[670px] lg:right-[130px]">
         <button v-if="store.activePage < 4" @click="forward()" class="bg-black text-magnolia hover:bg-purplish_blue text-xl font-bold px-9 py-4 rounded-lg">Next Step</button>
         <button v-if="store.activePage == 4" @click="forward()" class="bg-purplish_blue text-magnolia hover:bg-pastel_blue text-xl font-bold px-9 py-4 rounded-lg">Confirm</button>
      </div>
   </div>
      
      
</template>


<script setup>
   import store from '../store.js'
   import pageinfo from '@/components/PageInfo.vue'
   import pageplan from '@/components/PagePlan.vue'
   import pageaddon from '@/components/PageAddOn.vue'
   import pagesummary from '@/components/PageSummary.vue'
   import pagecheckout from '@/components/PageCheckout.vue'
   import axios from 'axios'


   const comps = {
      pageinfo,
      pageplan,
      pageaddon,
      pagesummary,
      pagecheckout
   }

   const currentComp = computed(()=>{
      return comps[store.activeComp()]
   })

   const back = () => {
      store.activePage -= 1
   }

   const forward = () => {
      if (store.activePage == 1){
         if (store.piVal()){
            store.activePage = 2
         } 
      } else {
         store.activePage += 1 
      }
   }

   const getHeader = (which) => {
      return store.headers[store.activePage-1][which]
      
   }

   // Use axios to get the data from the API
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
         console.log(response.data)
      })
      .catch(error => {
         console.log(error)
      })

</script>


<style scoped>

</style>