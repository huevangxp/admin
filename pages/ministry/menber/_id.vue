<template>
  <div>
    <v-dialog
      v-model="dialogEmployee"
      max-width="500px"
      fullscreen
      transition="dialog-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-avatar class="mx-2" size="40" color="white">
            <v-icon color="primary">mdi-account</v-icon>
          </v-avatar>
          <v-toolbar-title>ພະນັກງານນອງກົມ</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialogEmployee = false"> ປິດ </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="mt-5 mx-5">
          <v-row>
            <v-col
              v-for="(item, index) in employeeDepartmentDO.rows"
              :key="index"
              cols="12"
            >
              <v-row>
                <v-col cols="2">
                  <v-img
                    :src="item.profile"
                    style="width: 100%; height: 200px; object-fit: contain"
                  ></v-img>
                </v-col>
                <v-col cols="10">
                  <div>
                    <div class="d-flex justify-space-between">
                      <h2>
                        ທ່ານ {{ item.name }} {{ item.last_name }} (
                        {{ item.position }} )
                      </h2>
                      <v-speed-dial
                        v-model="fab"
                        :direction="direction"
                        :open-on-hover="hover"
                        :transition="transition"
                      >
                        <template v-slot:activator>
                          <v-btn v-model="fab" color="blue darken-2" icon dark>
                            <v-icon v-if="fab"> mdi-close </v-icon>
                            <v-icon v-else> mdi-dots-vertical </v-icon>
                          </v-btn>
                        </template>
                        <v-btn
                          icon
                          dark
                          small
                          color="red"
                          @click.stop="deleteEm(item.id)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        <v-btn icon dark small color="green" @click.stop="updateEm(item.id)">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </v-speed-dial>
                    </div>

                    <div class="mt-2">
                      <!-- <p class="black--text">ຕຳແໜງ: </p> -->
                      <p class="black--text">ເບີໂທ: {{ item.phone }}</p>
                      <p class="black--text">ທີ່ຢູ່: {{ item.address }}</p>
                    </div>
                    <p class="black--text">
                      ປະຫັວດ:
                      {{ item.details }}
                    </p>
                  </div>
                </v-col>
              </v-row>
              <v-divider class="mt-2"></v-divider>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogEmployee: false,
      direction: "bottom",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      transition: "slide-y-reverse-transition",
      eid: "",
      mData: {},
    }
  },
  methods: {
    async  deleteEm(id) {
     await this.$axios.delete(`/department-member/${id}`)
        .then((res) => {
          console.log(res.data);
          this.$toast.success('ສຳເລັດ')
        })
        await this.$axios.get(`/get-organization-member/${this.mid}`).then((res) => {
        this.employeeDepartmentDO = res?.data;
      });
    },
    updateEm(id) {
      this.$router.push(`/ministry/department/update/${id}`);
    },
    async openEmployee(id) {
      this.mid = id;
      await this.$axios.get(`/get-organization-member/${id}`).then((res) => {
        this.employeeDepartmentDO = res?.data;
      });
      this.dialogEmployee = true;
    },
  },
}

</script>
<!-- <template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-text-field
          name="search"
          label="search"
          dense
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <v-btn color="primary" dark @click="dialog = true">ສ້າງສະມາຊິກ</v-btn>
      </v-col>
    </v-row>
    <div>
      <v-data-table
      :headers="headers"
      class="elevation-3"
      :footer-props="{ 'items-per-page-options': [10, 25, -1] }"
      dense
      fixed-header 
    >
    <template #item.profile= "{item}">
      <div>
        <v-avatar
          size="70"
          color="red"
        >
          
        <v-img
      
         :src="item?.profile" alt="profile"></v-img>
        </v-avatar>
      </div>
    </template>
      <template #item.idx="{  index }">
        <div>
          {{ index + 1 }}
        </div>
      </template>
      <template #item.createdAt = '{item}'>
        <div>
          {{ $moment(item.createdAt).format('DD/MM/YYYY') }}
        </div>
      </template>
      <template #item.actions="{item}">
        <div>
          <v-btn color="red" icon small @click="deleteUserDialog(item.id)">
          <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn color="primary"  icon small>
            <v-icon>mdi-account-edit</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    </div>
    <v-dialog
      v-model="dialog"
      persistent
      :overlay="false"
      max-width="500px"
     transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text">
          ສ້າງສະມາຊິກ
        </v-card-title>
        <v-card-title class="d-flex justify-center">
          <v-card-text class="d-none">
            <v-file-input
              id="picture"
              v-model="user.images"
              @change="uploadImage"
            ></v-file-input>
          </v-card-text>
          <v-avatar size="150" v-if="image">
            <v-img :src="image" alt="profile"></v-img>
          </v-avatar>
          <v-avatar size="150" color="primary" @click="getImage" v-else>
            <v-icon size="70" color="white">mdi-file-image-plus-outline</v-icon>
          </v-avatar>
        </v-card-title>
        <v-card-text class="pt-2">
          <v-text-field v-model="user.name" placeholder="ຊື່" outlined dense></v-text-field>
          <v-text-field v-model="user.lastName" placeholder="ນາມສະກຸນ" outlined dense></v-text-field>
          <v-text-field v-model="user.phone" placeholder="ເບີ" outlined dense></v-text-field>
          <v-text-field v-model="user.email" placeholder="ອີເມວ" outlined dense></v-text-field>
          <v-text-field v-model="user.status" placeholder="ສະຖານະ" outlined dense></v-text-field>
          <v-text-field v-model="user.position" placeholder="ຕຳແໜ່ງ" outlined dense></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined @click="dialog = false">ຍົກເລິກ</v-btn>
          <v-btn color="primary white--text" @click="createAdmin()">ສ້າງສະມາຊິກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deleteDialog"  
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text">
          ລືມຂໍ້ມູນ
        </v-card-title>
        <v-card-text class="py-6 text-center black--text">
          ທ່ານຕ້ອງການລືບບັນຊີນີ້ບໍ?
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" small outlined @click='deleteDialog = false'>ຍົກເລິກ</v-btn>
        <v-btn color="primary " small  @click='deleteUser(userId)'>ລືມຂໍ້ມູນ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      deleteDialog: false,
      image: "",
      userId:'',
      user: {},
      headers: [
      {
          text: "ລ/ດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຮູບ", value: "profile" },
        { text: "ຊື່", value: "name" },
        { text: "ນາມສະກຸນ", value: "lastName" },
        { text: "ເບິ", value: "phone" },
        { text: "ອີເມວ", value: "email" },
        { text: "ສະຖານະ", value: "role" },
        { text: "ວັນທີສ້າງ", value: "createdAt" },
        { text: "", value: "actions" },
      ],
    
    };
  },
  mounted() {
   
  },

  computed: {
    id() {
      return this.$route.params.id;
    }
  },

  methods: {
    deleteUserDialog(id) {
      this.userId = id;
      this.deleteDialog = true;
    },
    uploadImage(e) {
      this.url = URL.createObjectURL(e);
      this.image = this.url;
    },
    getImage() {
      document.getElementById("picture").click();
    },
  
    
  },
};
</script> -->
