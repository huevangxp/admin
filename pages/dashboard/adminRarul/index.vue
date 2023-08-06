<template>
  <div>
    <h1 class="my-10">ຈັດການຂໍ້ມູນ admin ຂອງທ້ອງຖີ່ນ</h1>
    <v-row>
      <v-col md="6">
        <v-text-field
          v-model="search"
          outlined
          dense
          placeholder="ຄົ້ນຫາ admin ທ້ອງຖີ່ນ"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col md="6" class="d-flex justify-end">
        <v-btn color="red" class="mx-3 white--text" @click="$router.back()">ຍົກເລິກ</v-btn>

        <v-btn outlined color="primary" dark to="/dashboard/adminRarul/create"
          >ສ້າງ admin ຂອງທ້ອງຖີ່ນ</v-btn
        >
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="department.rows"
      class="elevation-3"
      :search="search"
      :items-per-page="5"
      fixed-header
    >
      <template #item.profile="{ item }">
        <div>
          <v-avatar size="70" color="red">
            <v-img :src="item?.profile" alt="profile"></v-img>
          </v-avatar>
        </div>
      </template>
      <template #item.idx="{ index }">
        <div>
          {{ index + 1 }}
        </div>
      </template>
      <template #item.role="{item}">
        <div>
          <span v-if="item.role === 'rural_admin'">admin ບໍລິຫານຂອງພະແນກຂັ້ນທ້ອງຖີ່ນ</span>
        </div>
      </template>
      <template #item.createdAt="{ item }">
        <div>
          {{ $moment(item.createdAt).format("DD/MM/YYYY") }}
        </div>
      </template>
      <template #item.actions="{ item }">
        <div>
          <v-btn color="red" icon small @click.stop="openDeleteEm(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn
            color="primary"
            icon
            small
            @click.stop="
              $router.push(`/dashboard/adminRarul/update/${item.id}`)
            "
          >
            <v-icon>mdi-account-edit</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <!-- delete admin Rural -->
    <v-dialog
      v-model="openDeleteEmData"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text"> ລຶບຂໍ້ມູນ </v-card-title>
        <v-card-text class="py-6 text-center black--text">
          ທ່ານຕ້ອງການລຶບບັນຊີນີ້ບໍ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined @click="openDeleteEmData = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary " @click="deleteEmData">ລຶບຂໍ້ມູນ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      openDeleteEmData: false,
      rid: "",
      headers: [
        {
          text: "ລ/ດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຊື່", value: "user_name" },
        { text: "ສິດ", value: "role" },
        { text: "ພະແນກ", value: "title" },
        { text: "ແຂວງພະແນກ", value: "province_title" },
        { text: "ວັນທີສ້າງ", value: "createdAt" },
        { text: "", value: "actions" },
      ],
    };
  },
  computed: {
    department() {
      return this.$store.state.province.department;
    },
  },
  mounted() {
    this.$store.dispatch("province/getDepartment");
  },
  methods: {
    openDeleteEm(id) {
      this.rid = id;
      this.openDeleteEmData = true;
    },
    async deleteEmData() {
      try {
        await this.$axios
          .delete(`/delete-rural/${this.rid}`)
          .then((res) => {
            console.log(res.data);
            this.openDeleteEmData = false;
            this.$toast.success("ສຳເລັດ");
          })
          .catch((err) => {
            this.$toast.error("ບໍ່ສຳເລັດ");
          });
        this.$store.dispatch("province/getDepartment");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
