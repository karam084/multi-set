<template>
   <div @click="" class="w-full lg:w-95% py-2 lg:py-6 mb-6 lg:mb-4 addOnBox items-center cursor-pointer  border rounded-lg border-light_gray bg-transparent hover:border-marine_blue" 
         :class="{'bg-magnolia border-marine_blue' : checked }">
        
         <input class="ml-2 lg:ml-8 ring-0 lg:p-[9px] rounded-sm text-purplish_blue" type="checkbox" :id="props.index" v-model="checked" />
         <div @click="" class="justify-self-start lg:ml-3 text-marine_blue text-[20px] font-bold">
            {{getTxt('t')}}
            <span class="block text-[16px] lg:text-[19px] font-medium text-cool_gray">{{getTxt('s')}}</span>
         </div>
         <div class="justify-self-end mr-1 lg:mr-4 text-purplish_blue font-medium">
            {{getPrice()}}
         </div>

      
   </div>
</template>


<script setup>
   import store from '../store.js'
   import axios from 'axios'

   const props = defineProps({
      index : Number
      
   })

   const getTxt = (which) => {
      return store.addOns[props.index-1][which]
   }
   const addOnPrice = computed(()=>{
      return store.billingPlan===1 ? store.priceAddons[props.index-1]*10 : store.priceAddons[props.index-1]
   })
   const getPrice = () => {
      return `+$${addOnPrice.value}/${store.billingPlan === 1 ? 'yr' : 'mo'}` 
   }

   const checked = ref(false)
   watch(() => checked.value, (newVal) => {
       if (newVal){
         store.priceForAddons += addOnPrice.value
         store.selectedAddons[props.index-1] = true
       } else {
         if (store.priceForAddons>0) {
            store.priceForAddons -= addOnPrice.value
            store.selectedAddons[props.index-1] = false
         }
       }
   })

     // Use axios to get data from json file

     const getAddOns = async () => {
      const res = await axios.get('https://api.npoint.io/5abcca6f4e39b4955965')
      store.addOns = res.data
   }
   onMounted(getAddOns)



</script>


<style scoped>
   .addOnBox{
      display: grid;
      grid-template-columns: 12% 1fr 17%;
   }
   @media screen and(min-width: 1061px){
      grid-template-columns: 13% 1fr 15%;
   }
</style>