<template>
   <div class="w-full">
      <label :for="inpId" class="label " >
         <slot></slot>
      </label>
      <input v-if="controlType === 'input'"
         :id="inpId"
         class="rm-Input"
         :type="type"
         :value="modelValue"
         @blur="$emit('update:modelValue', $event.target.value)"
      />
      <textarea v-if="controlType === 'textarea'"
         :id="inpId"
         class="rm-Input"
         :rows="rows"
         :value="modelValue"
         @blur="$emit('update:modelValue', $event.target.value)"
      ></textarea>
   </div>
</template>

<script setup>
   import {useRandom} from '/Users/rainermorgen/MEGA/Server/use/hooks.js' 
   import { onMounted, ref } from 'vue'
   import axios from 'axios';

   defineEmits(['update:modelValue'])
   defineProps({
      type:{
         type: String,
         default: 'text'
      },
      modelValue:{
         type: String,
         default: ''
      },
      controlType:{
         type: String,
         default: 'input'
      },
      rows: {
         type: String,
         default: "5"
      }
   })

   const inpId=ref()
   onMounted(() => {
      inpId.value='ip'+ useRandom()
   })

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


<style  scoped>
   /* Chrome, Safari, Edge, Opera */
   input::-webkit-outer-spin-button,
   input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }

   /* Firefox */
   input[type=number] {
      -moz-appearance: textfield;
   }
   .rm-Input{
      /* @apply bg-gray-50 border border-gray-300 text-gray-900 transition text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full; */
      @apply transition  rounded-lg ;

   }
   .label {
      @apply block mb-0.5 text-base font-medium text-gray-800;
   }
</style>