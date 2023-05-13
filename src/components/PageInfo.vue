<template>
   <div class="lg:mx-32">
      <div class="mt-6 lg:mt-11">
         <card-input ref="inpName" v-model="infoName" placeHolder="Karam Fouad">Name</card-input>
      </div>
      <div class="mt-5 lg:mt-10">
         <card-input ref="inpMail" v-model="infoMail" placeHolder="karam.ezz84@gmail.com">Email Adress</card-input>
      </div>
      <div class="mt-5 lg:mt-10">
         <card-input ref="inpTel" v-model="infoTel" placeHolder="+2 01100939334" >Phone Number</card-input>
      </div>
   </div>
</template>


<script setup>
   import { nextTick } from 'vue';
   import store from '../store.js'
   import axios from 'axios'
   import CardInput from './CardInput.vue'
   import { ref, computed } from 'vue'


   const isValid = ref([false,false,false])
   const inpName = ref(null)
   const inpMail = ref(null)
   const inpTel = ref(null)

   const fieldEmpty = "This field is required and must have a valid value"
   const regName = /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=,\d]{1,}$/
   const regMail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/i
   const regTel = /^(\+[0-9]{1,3}|0)[0-9]{3}( ){0,1}[0-9]{7,8}\b/m

   const infoName = computed({
      get() {
         return store.infoName
      },
      set(newValue) {
         inpName.value.setError("")
         store.infoName = newValue
      },
   })
   const infoMail = computed({
      get() {
         return store.infoMail
      },
      set(newValue) {
         inpMail.value.setError("")
         store.infoMail = newValue
      },
   })
   const infoTel = computed({
      get() {
         return store.infoTel
      },
      set(newValue) {
         inpTel.value.setError("")
         store.infoTel = newValue
      },
   })

   const validate = () => {
      if(isValid.value[0] && isValid.value[1] && isValid.value[2]){
         store.pageIsValid[0] = true
      } else {
         if ((store.infoName.length===0) || (regName.test(store.infoName)===false) || (store.infoName.length > 1 && !store.infoName.includes(" ") )){
            inpName.value.setError(fieldEmpty)
         } else {
            inpName.value.setError("")
            isValid.value[0] = true
         }
         if (store.infoMail.length===0 || !regMail.test(store.infoMail)){
            inpMail.value.setError(fieldEmpty)
         } else {
            inpMail.value.setError("")
            isValid.value[1] = true
         }
         if (store.infoTel.length===0 || !regTel.test(store.infoTel)){
            inpTel.value.setError(fieldEmpty)
         } else {
            inpTel.value.setError("")
            isValid.value[2] = true
         }
      }

      if(isValid.value[0] && isValid.value[1] && isValid.value[2]){
         isValid.value = [false,false,false]
         return true
      }
      return false
   }


   onMounted(() => {
      store.piVal=validate
   })

   // use nextTick to wait for the DOM update
   nextTick(() => {
      inpName.value.setError("")
      inpMail.value.setError("")
      inpTel.value.setError("")
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


<style scoped>

</style>