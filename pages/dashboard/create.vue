<template>
  <div>
    <h1 class="my-10">ຈັດການຂໍ້ມູນຂອງ admin ໃຫຍ່ສຸດຂອງລະບົບ</h1>

    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="search"
          name="search"
          label="search"
          dense
          outlined
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <v-btn color="red" class="mx-3 white--text" @click="$router.back()">ຍົກເລິກ</v-btn>
        <v-btn color="primary" outlined dark @click="dialog = true">ສ້າງສະມາຊິກ</v-btn>
      </v-col>
    </v-row>
    <div>
      <v-data-table
        :headers="headers"
        :items="admin.rows"
        class="elevation-3"
        :footer-props="{ 'items-per-page-options': [10, 25, -1] }"
        fixed-header
        :search="search"
      >
        <template #item.profile="{ item }">
          <div>
            <v-avatar size="70">
              <v-img lazy-src="/loading.gif" :src="item?.profile" alt="profile"></v-img>
            </v-avatar>
          </div>
        </template>
        <template #item.role="{item}">
          <div>
            <span v-if="item.role === 'super_admin'" class="primary--text">ຜູ້ບໍລິຫານສູຸງສຸດ</span>
          </div>
        </template>
        <template #item.idx="{ index }">
          <div>
            {{ index + 1 }}
          </div>
        </template>
        <template #item.createdAt="{ item }">
          <div>
            {{ $moment(item.createdAt).format("DD/MM/YYYY") }}
          </div>
        </template>
        <template #item.actions="{ item }">
          <div>
            <v-btn
              color="red"
              icon
              small
              @click.stop="deleteUserDialog(item.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn color="primary" icon small @click.stop="$router.push(`/dashboard/updateSuperAdmin/${item.id}`)">
              <v-icon>mdi-account-edit</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </div>
    <v-dialog
      v-model="dialog"
      persistent
      fullscreen
      :overlay="false"
      class="mx-16"
      transition="dialog-transition">
      <v-card max-width="400px">
        <v-card-title class="primary white--text"> ສ້າງສະມາຊິກ </v-card-title>
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
        <v-card-text class="pt-2" style="padding-left: 300px; padding-right: 300px;" >
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.name"
                placeholder="ຊື່"
                outlined
                hide-details="auto"
                :rules="[(v) => !!v || '']"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.lastName"
                placeholder="ນາມສະກຸນ"
                outlined
                hide-details="auto"
                :rules="[(v) => !!v || '']"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.phone"
                placeholder="ເບີ"
                outlined
                hide-details="auto"
                :rules="[(v) => !!v || '']"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.email"
                placeholder="ອີເມວ"
                outlined
                hide-details="auto"
                :rules="[(v) => !!v || '']"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.status"
                placeholder="ສະຖານະ"
                :rules="[(v) => !!v || '']"
                outlined
                dense
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :items="items"
                v-model="user.role"
                :rules="[(v) => !!v || '']"
                outlined
                dense
                hide-details="auto"
                label="ສິດ"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.position"
                :rules="[(v) => !!v || '']"
                hide-details="auto"
                placeholder="ຕຳແໜ່ງ"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
              v-model="user.password"
              placeholder="ລະຫັດຜ່ານ"
              outlined
              hide-details="auto"
              dense
              :rules="[(v) => !!v || '']"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions style="padding-left: 300px; padding-right: 300px;">
          <v-spacer></v-spacer>
          <v-btn color="red" outlined @click="dialog = false">ຍົກເລິກ</v-btn>
          <v-btn color="primary white--text" @click="createAdmin()"
            >ບັນທຶກ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deleteDialog"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text"> ລືມຂໍ້ມູນ </v-card-title>
        <v-card-text class="py-6 text-center black--text">
          ທ່ານຕ້ອງການລືບບັນຊີນີ້ບໍ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" small outlined @click="deleteDialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary " small @click="deleteUser(userId)"
            >ລືມຂໍ້ມູນ</v-btn
          >
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
      search:'',
      image: "",
      userId: "",
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
        { text: "ນາມສະກຸນ", value: "last_name" },
        { text: "ເບິ", value: "phone" },
        { text: "ອີເມວ", value: "email" },
        { text: "ສະຖານະ", value: "role" },
        { text: "ວັນທີສ້າງ", value: "createdAt" },
        { text: "", value: "actions" },
      ],
      items: [
        { id: 1, text: "super_admin" },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("user/getAdmin");
  },
  computed: {
    admin() {
      return this.$store.state.user.admin;
    },
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
    async createAdmin() {
      if (!this.user.name || !this.user.user_name || !this.user.password || !this.user.email || !this.user.status || !this.user.role || !this.user.position) {
        return  this.$toast.error("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ")
        }
      await this.$store.dispatch("user/createAdmin", { ...this.user });
      this.$store.dispatch("user/getAdmin");
      this.dialog = false;
    },
    async deleteUser(id) {
      await this.$store.dispatch("user/deleteUser", id);
      this.$store.dispatch("user/getAdmin");
      this.deleteDialog = false;
    },
  },
};
</script>
