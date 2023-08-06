<template>
  <div>
    <h1 class="my-10">ຈັດການຂໍ້ມູນກົມຂອງກະຊວງ</h1>
    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model="search"
          name="search"
          label="search"
          id="id"
          dense
          outlined
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col cols="4"> </v-col>
      <v-col cols="4">
        <!-- <v-btn v-if="role !== 'ministry_amdin'" color="primary" @click="openCreate()">ສ້າງກົມຈັດຕັ້ງ</v-btn> -->
      </v-col>
    </v-row>
    <v-data-table
      :headers="dessertHeaders"
      :items="departmentDO.rows"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="id"
      class="elevation-1"
      :search="search"
      @click:row="moveTocreate"
      >
      <!-- show-expand -->
      <template #item.idx="{ idx, index }">
        <div>
          <p>{{ index + 1 }}</p>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex">
          <div>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  small
                  color="red"
                  dark
                  v-on="on"
                  @click="createPhane(item.id)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>ລືບຂໍ້ມູນ</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  small
                  color="green"
                  dark
                  v-on="on"
                  @click="createPhane(item.id)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>ແກ້ໄຂຂໍ້ມູນ</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  small
                  color="primary"
                  dark
                  v-on="on"
                  @click="createPhane(item.id)"
                >
                  <v-icon>mdi-book-plus</v-icon>
                </v-btn>
              </template>
              <span>ສ້າງກົມພະແນກ</span>
            </v-tooltip>
          </div>
        </div>
      </template>
      <!-- <template v-slot:expanded-item="{ headers, item }">
        <td
          :colspan="headers.length"
          :ref="item.id"
          @click="checkMenberDetail(item.id)"
        >
          <v-col
            v-for="data in getDepartment(item.id)"
            :key="data.id"
            cols="12"
          >
            <v-card elevation="0">
              <p style="cursor: pointer">{{ data.department_title }}</p>
            </v-card>
            <v-divider></v-divider>
          </v-col>
        </td>
      </template> -->
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title color="red">ສ້າງພະແນກ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <p class="black--text">ຊື່ພະແນກ</p>
          <v-text-field
            v-model="department_title"
            label="ຊື່ພະແນກ"
            outlined
            dense
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="createDepartment()"
            >ສ້າງພະແນກ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogDO"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text">
          ສ້າງກົມຈັດຕັ້ງ
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <p class="black--text">ຊື່ກົມຈັດຕັ້ງ</p>
          <v-text-field
            v-model="department_organization_title"
            label="ຊື່ກົມຈັດຕັ້ງ"
            outlined
            dense
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialogDO = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="createDO()">ສ້າງກົມຈັດຕັ້ງ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expanded: [],
      singleExpand: false,
      dialog: false,
      dialogDO: false,
      role: this.$cookies.get("token"),
      depId: "",
      search: "",
      department_title: "",
      department_organization_title: "",

      employeeHeaders: [
        {
          text: "ລ/ດ",
          align: "center",
          sortable: false,
          value: "idx",
        },
        { text: "ຮູບພາບ" },
        { text: "ຊື້ແລະນາມສະກຸ່ມ" },
        { text: "ຕຳແໜງ" },
        { text: "ສະໄໝ" },
        { text: "ແຕ່ປີ" },
        { text: "ຫາປີ" },
      ],

      dessertHeaders: [
        {
          text: "ລ/ດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຊື່ກົມ", value: "department_organization_title" },
        { text: "", value: "actions" },
        { text: "", value: "data-table-expand" },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("department/getDepartmentDO");
    this.$store.dispatch("department/getDepartment");
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    departmentDO() {
      return this.$store.state.department.departmentDO;
    },
    department() {
      return this.$store.state.department.department;
    },
  },
  methods: {
    moveTocreate(item) {
      this.$router.push(`/ministry/department/${item.id}`);
    },
    openCreate() {
      this.dialogDO = true;
    },
    createPhane(id) {
      this.depId = id;
      this.dialog = true;
    },
    async createDepartment() {
      const object = {
        department_organization_id: this.depId,
        department_title: this.department_title,
      };

      await this.$store.dispatch("department/createDepartment", { ...object });
      this.$store.dispatch("department/getDepartment");
      this.dialog = false;
    },
    async createDO() {
      const data = {
        department_organization_title: this.department_organization_title,
        ministry_id: this.id,
      };
      await this.$store.dispatch("department/createDepartmentDO", { ...data });
      this.$store.dispatch("department/getDepartmentDO");
      this.dialogDO = false;
    },
    // getDepartment(id) {
    //   if (!this.department.rows) return [];
    //   return this.department.rows.filter(
    //     (el) => el.department_organization_id === id
    //   );
    // },
  },
};
</script>
