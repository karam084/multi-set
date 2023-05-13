import { reactive } from "vue";

const  store = reactive({
   version: "1.0.00",
   wWidth:0,
   wHeight:0,
   activePage:1,
   pages:[
      'pageinfo',
      'pageplan',
      'pageaddon',
      'pagesummary',
      'pagecheckout'
   ],
   plans:['Arcade','Advanced','Pro'],
   headers:[{t:"Personal info",s:"Please provide your name, email adress, and phone number."},
            {t:"Select your plan", s:"You have the option of monthly or yearly billing."},
            {t:"Pick add-ons",s:"Add-ons help enhance your gaming experience."},
            {t:"Finishing up",s:"Double-check everything looks OK before confirming."},
            {t:"",s:""}
           ],
   addOns:[{t:"Online Service",s:"Access to multiplayer games"},
           {t:"Larger storage", s:"Extra 1TB of cloud save"},
           {t:"Customizable Profile",s:"Custom theme on your profile"},
          ],
   
   activeComp(){
      return this.pages[this.activePage-1]
   },
   infoName:"",
   infoMail:"",
   infoTel:"",
   selectedPlan:1,
   billingPlan:12,
   pricePlan:[9,12,15],
   priceForPlan:9,
   priceAddons:[1,2,2],
   priceForAddons:0,
   selectedAddons:[false,false,false],

   sum(){
      return this.priceForPlan + this.priceForAddons
   },
   piVal:null // validation function from PageInfo

})

export default store

