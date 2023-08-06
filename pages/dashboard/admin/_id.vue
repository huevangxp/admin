<template>
    <div>
        <!-- {{ admin }} -->
    <v-card max-width="600" class="mx-auto" elevation="0">
      <div class="d-flex ">

        <v-card max-width="200" height="250" elevation="0">
          <v-img :src="admin?.profile" style="height: 100%; width: 100%"></v-img>
        </v-card>
        <v-card class="mx-4 " elevation="0">
         <div class="mx-4 my-3">
          <span style=" font-weight: bold">
            ຊື່:
          </span><br>
          <span>- {{ admin?.name }} {{ admin?.lastName }}</span>
         </div>
         <div class="mx-4 my-3">
          <span style=" font-weight: bold">
            ເບີ:
          </span><br>
          <span >- {{admin?.phone}}</span>
         </div>
         <div class="mx-4 my-3">
          <span style=" font-weight: bold">
            ຕຳແໜງ:
          </span><br>
          <span>- {{ admin?.position }}</span>
         </div>
         <div class="mx-4 my-3">
          <span style=" font-weight: bold">
            ວັນທີສ້າງ:
          </span><br>
          <span>- {{ $moment(admin?.createdAt).format('DD/MM/YYYY') }}</span>
         </div>
        </v-card>
      </div>
      
    </v-card>
    <v-card max-width="600" class="mx-auto" elevation="0">
       <v-card-text >
       <span class="black--text"> ອີເມວ: </span><br>
       <span>{{ admin?.email }}</span>
       </v-card-text>  
       <v-card-text >
       <span class="black--text"> ທີ່ຢູ່: </span>
       <p>testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest</p>
       </v-card-text> 
       <v-card-text >
        <span class="black--text">ປະຫວັດຫຍໍ້:</span>
        <p>testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest</p>
       </v-card-text> 
      </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            admin:{}
        }
    },
    computed: {
        id() {
            return this.$route.params.id
        }
    },
   async mounted() {
       await this.$axios.get(`/user/${this.id}`)
           .then((data) => {
        //   console.log(data.data);
        this.admin = data?.data  
        })
    }
}
</script>