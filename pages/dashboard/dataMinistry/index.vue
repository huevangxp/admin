<template>
  <div>
    <!-- {{ ministry }}/ -->
    <h1 class="my-10">ຈັດການຂໍ້ມູນຂອງກະຊວງ</h1>

    <v-row>
      <v-col md="6">
        <v-text-field
        v-model="search"
          outlined
          dense
          placeholder="ຄົ້ນຫາກະຊວງ"
        append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col md="6" class="d-flex justify-end">
        <v-btn color="red" class="mx-3 white--text" @click="$router.back()">ຍົກເລິກ</v-btn>

        <v-btn outlined color="primary" dark to="/dashboard/adminMinistry/create"
          >ສ້າງກະຊວງ</v-btn
        >
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="ministry.rows"
      class="elevation-3"
      :search="search"
      :items-per-page="5"
      fixed-header
      
    >
      <!-- @click:row="showDetails" -->
      <template #item.profile="{ item }">
        <div>
          <v-avatar size="70">
            <v-img lazy-src="/loading.gif" :src="item?.profile" alt="profile"></v-img>
          </v-avatar>
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
          <v-btn color="red" icon small @click.stop="openDelete(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn color="primary" icon small @click.stop="$router.push(`/dashboard/adminMinistry/update/${item.id}`)">
            <v-icon>mdi-account-edit</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
        <!-- delete data amdin ministry -->
        <v-dialog
      v-model="deleteDialog"
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
          <v-btn color="red" dark outlined @click="deleteDialog = false"
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
      search: '',
      deleteDialog:false,
      headers: [
        {
          text: "ລ/ດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຮູບພາບ", value: "profile" },
        { text: "ຊື່ກະຊວງ", value: "ministry_title" },
        { text: "ວັນທີສ້າງ", value: "createdAt" },
        { text: "", value: "actions" },
      ],
    };
  },
  computed: {
    ministry() {
      return this.$store.state.ministry.ministry;
    },
  },
  mounted() {
    this.$store.dispatch("ministry/getMinistry");
  },
  methods: {
   async openDelete(item) {
      try {
        this.data = item;
        this.deleteDialog = true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteData() {
      // console.log(id);
      await this.$store.dispatch("ministry/deleteMinistry", this.data.id);
      this.deleteDialog = false;
      this.$toast.success('ສຳເລັດ')
      this.$store.dispatch("ministry/getMinistry");
    },
  },
};
</script>
