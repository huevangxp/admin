<template>
  <div>
    <!-- {{ ministry }} -->
    <h1 class="my-10">ຈັດການຂໍ້ມູນສິດ</h1>
    <v-row>
      <v-col md="6">
        <v-text-field
          v-model="search"
          outlined
          dense
          placeholder="ຄົ້ນຫາສິດ"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col md="6" class="d-flex justify-end">
        <v-btn color="red" class="mx-3 white--text" @click="$router.back()"
          >ຍົກເລິກ</v-btn
        >

        <v-btn outlined color="primary" dark @click="dialog = true"
          >ເພີ່ມສິດ</v-btn
        >
      </v-col>
    </v-row>
    <!-- {{ provinceData }} -->
    <v-data-table
      :headers="headers"
      :items="provinceData"
      class="elevation-3"
      :footer-props="{ 'items-per-page-options': [10, 25, -1] }"
      fixed-header
      :search="search"
    >
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
          <v-btn color="primary" icon small @click.stop="openUdate(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title class="primary white--text">ເພີ່ມສິດ</v-card-title>
        <v-divider class="mb-5"></v-divider>

        <v-card-text>
          <v-text-field
            v-model="role"
            label="ປ້ອນສິດ"
            outlined
            dense
            class="mt-10"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="createRole()">ບັນທືກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogUdate"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text">ອັບເດດສິດ</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            v-model="dataUdate.role_title"
            label="ປ້ອນສິດ"
            outlined
            dense
            class="mt-10"
          ></v-text-field>
        </v-card-text>
        <v-card-text> </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialogUdate = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="updateProvince()">ບັນທືກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- delete data amdin ministry -->
    <v-dialog
      v-model="dialogDelete"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text">ລຶບສິດ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-6 text-center black--text">
          ທ່ານຕ້ອງການລືບບັນຊີນີ້ບໍ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" dark outlined @click="dialogDelete = false"
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
      dialog: false,
      role: "",
      updateDataRole: "",
      search: "",
      provinceData: [],
      dialogDelete: false,
      dataUdate: {},
      loading: false,
      dialogUdate: false,
      headers: [
        {
          text: "ລ/ດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ສິດ", value: "role_title" },
        { text: "ວັນທີສ້າງ", value: "createdAt" },
        { text: "", value: "actions" },
      ],
    };
  },

  computed: {},
  mounted() {
    this.$axios.get("/select-roles").then((res) => {
      this.provinceData = res?.data;
    });
  },
  methods: {
    openUdate(item) {
      this.dataUdate = item;
      this.dialogUdate = true;
    },
    openDelete(item) {
      this.dataUdate = item;
      this.dialogDelete = true;
    },

    async updateProvince() {
      const data = {
        role_title: this.dataUdate.role_title,
      };
      await this.$axios
        .put(`/update-role/${this.dataUdate.id}`, data)
        .then((res) => {
          this.dialogUdate = false;
          this.$toast.success("ສຳເລັດ");
        });
      this.$axios.get("/select-roles").then((res) => {
        this.provinceData = res?.data;
      });
    },
    async createRole() {
      try {
        if (!this.role) {
          return this.$toast.error("ກະລຸນາເລືອກຂໍ້ມູນໃຫ້ຄົບ");
        }
        const data = {
          role: this.role,
        };
        await this.$axios.post("/create-role", data).then((res) => {
          this.dialog = false;
          this.$toast.success("ສຳເລັດ");
          this.role = "";
        });
        this.$axios.get("/select-roles").then((res) => {
          this.provinceData = res?.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteData() {
      try {
        await this.$axios
          .delete(`/delete-role/${this.dataUdate.id}`)
          .then((res) => {
            this.$toast.success("ລຶບຂໍ້ມູນສຳເລັດ");
            this.dialogDelete = false;
          })
          .catch((error) => {
            this.$toast.error("ລຶບບໍ່ສຳເລັດ");
          });
        this.$axios.get("/select-roles").then((res) => {
          this.provinceData = res?.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
