<template>
    <div>
     <div class="font-weight-bold mb-10 mt-5" style="font-size: 30px">ຈັດການຂໍ້ມູນຂອງພະແນກ</div>
     <v-row dense>
       <v-col cols="12" sm="4" md="3">
         <v-card  @click="$router.push(`/rural/sector/${id}`)">
           <v-card-text>
             <div
               class="font-weight-bold d-flex align-center"
               style="font-size: 20px"
             >
               <v-icon left color="primary">
                 mdi-vector-circle
               </v-icon>
               <span class="text-center">ຂະແໜງ</span>
             </div>
             <div class="grey--text text--lighten-1 ml-10 my-4">
               ເຂົ້າເບີ່ງລາຍລະອຽດ
             </div>
           </v-card-text>
         </v-card>
       </v-col>
       <v-col cols="12" sm="4" md="3">
         <v-card  @click="$router.push(`/rural/cityOffice/data?id=${id}&pid=${pid}`)">
           <v-card-text>
             <div
               class="font-weight-bold d-flex align-center"
               style="font-size: 20px"
             >
               <v-icon  left color="primary">
                 mdi-city
               </v-icon>
               <span class="text-center">ເມືອງ</span>
             </div>
             <div class="grey--text text--lighten-1 ml-10 my-4">
               ເຂົ້າເບີ່ງລາຍລະອຽດ
             </div>
           </v-card-text>
         </v-card>
       </v-col>
     </v-row>
    </div>
   </template>
   
   <script>
   export default {
     data() {
       return {
       };
     },
     computed: {
       id() {
         return this.$route.query.id;
       },
          pid() {
        return this.$route.query.pid
       }
     },
     methods: {
       // moveToCreateD
     }
   };
   </script>
   