<template>
   <div class="w-full">
      <div class="flex flex-row justify-between">
         <label :for="inpId" class="block mb-1.5 font-medium text-marine_blue" :class="labelOffsetLeft" >
            <slot></slot>
         </label>
         <div class="text-strawberry_red font-bold">
            {{errorMessage}}
         </div>
      </div>

      <input
         :id="inpId"
         class="h-12 lg:h-16 transition rounded-md  w-full text-marine_blue font-bold placeholder:text-cool_gray placeholder:font-medium placeholder:text-[1.3rem] "
         :class="[errorFlag ? 'border-[#ff5252] focus:ring-[#ff5252]' : 'border-gray-300 focus:ring-purplish_blue']"
         :type="type"
         :value="modelValue"
         :placeholder="placeHolder"
         :maxlength=maxLength
         @input="$emit('update:modelValue', $event.target.value)"
         @blur="$emit('blurred',$event.target.value)"
      />
   </div>
</template>

<script setup>
   import { onMounted, ref } from 'vue'
   // import axios
   import axios from 'axios'
   import { defineProps, defineEmits, defineExpose } from 'vue'

   defineEmits(['update:modelValue','blurred'])
   
   const props=defineProps({
      type:{
         type: String,
         default: 'text'
      },
      modelValue:{
         type: String,
         default: ''
      },
      placeHolder:{
         type: String,
         default:""
      },
      labelOffsetLeft:{
         type: String,
         default:""
      },
      maxLength:{
         type: String,
         default:"100"
      },
      
   })

   let errorMessage = ref("")
   const errorFlag = ref(false)
   const setError = (errMessage) => {
      errorFlag.value = errMessage.length>0
      errorMessage.value= errMessage
   }

   const inpId=ref()
   onMounted(() => {
      inpId.value='ip'+ useRandom()
   })
   defineExpose({
      setError
   })

   const useRandom = () => {
      return Math.random().toString(36).substr(2, 9)
   }
   
   // use axios to get data from server
    const getData = async () => {
         try {
               const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
               console.log(response.data)
         } catch (error) {
               console.error(error)
         }
      }
      

</script>


<style  scoped>
   input::-webkit-outer-spin-button,
   input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }

   input[type=number] {
      -moz-appearance: textfield;
   }
</style>