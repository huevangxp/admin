<template>
  <div>
      <!-- {{ ministry }} -->
      <h1 class="my-10">ຈັດການຂໍ້ມູນ admin ຂອງກະຊວງ </h1>
      <v-row>
      <v-col md="6">
        <v-text-field
        v-model="search"
          outlined
          dense
          placeholder="ຄົ້ນຫາ admin ຂອງກະຊວງ"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col md="6" class="d-flex justify-end">
        <v-btn color="red" class="mx-3 white--text" @click="$router.back()">ຍົກເລິກ</v-btn>
        <v-btn outlined color="primary" dark to="/dashboard/adminMinistry/create">ສ້າງ admin ຂອງກະຊວງ</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="ministry?.rows"
      class="elevation-3"
      :footer-props="{ 'items-per-page-options': [5,10, 25, -1] }"
      fixed-header 
      :search="search"
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
      <template #item.role="{ item }">
        <div>
          <span v-if="item?.role === 'ministry_admin'">admin ບໍລິຫານກະຊວງ</span>
        </div>
      </template>
      <template #item.createdAt = '{item}'>
        <div>
          {{ $moment(item.createdAt).format('DD/MM/YYYY') }}
        </div>
      </template>
      <template #item.actions="{item}">
        <div>
          <v-btn color="red" icon small @click.stop="openDelete(item.id)">
          <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn color="primary"  icon small @click.stop="$router.push(`/dashboard/adminMinistry/update/${item.id}`)">
            <v-icon>mdi-account-edit</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
        <!-- delete data amdin ministry -->
        <v-dialog
      v-model="deleteAdminDialog"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text">ລຶບຂະແໜງ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-6 text-center black--text">
          ທ່ານຕ້ອງການລືບບັນຊີນີ້ບໍ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" dark outlined @click="deleteAdminDialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" @click="deleteData">ລຶບຂໍ້ມູນ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deleteAdminDialog: false,
      search:'',
      headers: [
        {
          text: "ລ/ດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຊື່ກະຊວງ", value: "ministry_title" },
        { text: "ຊື່", value: "user_name" },
        { text: "ສະຖານະ", value: "role" },
        { text: "ວັນທີສ້າງ", value: "createdAt" },
        { text: "", value: "actions" },
      ],
    };
    
  },
  computed: {
    ministry() {
      return this.$store.state.ministry.ministry
    }
  },
  mounted() {
    this.$store.dispatch('ministry/getMinistry')
  },
  methods: {
    openDelete(id) {
      this.aid = id;
      this.deleteAdminDialog = true;
    },
    async deleteData() {
      // console.log(id);
      await this.$store.dispatch("ministry/deleteMinistry", this.aid);
      this.deleteAdminDialog = false;
      this.$toast.success('ລຶບສຳເລັດ')
      this.$store.dispatch("ministry/getMinistry");
    },
  },
};
</script>
