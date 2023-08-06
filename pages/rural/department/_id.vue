<template>
  <v-container fluid>
    <h1 class="my-10">
      ຈັດການຂໍ້ມູນພະແນກ
      <span class="primary--text" style="border-bottom: 1px solid #000">{{
        title
      }}</span>
    </h1>

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
      <v-col cols="4" class="d-flex justify-content-end">
       
      </v-col>
    </v-row>
    <v-data-table
      :headers="dessertHeaders"
      :items="provinceDepartment?.rows"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="name"
      class="elevation-1"
      :search="search"
      @click:row="moveTodepartmentType"
    >
      <!-- show-expand -->
      <!-- v-if="role !== 'super_admin'" -->
      <template #[`item.idx`]="{ index }">
        <div>
          {{ index + 1 }}
        </div>
      </template>

  
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title color="red">ສ້າງພະແນກ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <p class="black--text">ຊື່ພະແນກ</p>
          <v-text-field
            v-model="titleName"
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
          <v-btn color="primary" dark @click="createRuralDepartment()"
            >ສ້າງພະແນກ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "DetailRuralPage",
  data() {
    return {
      title: this.$cookies.get("title"),
      expanded: [],
      singleExpand: false,
      dialog: false,
      titleName:'',
      search: "",
      role: this.$cookies.get("role"),
      provinceDepartment:[],
      dessertHeaders: [
        {
          text: "ລະຫັດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຊື່ພະແນກ", value: "title" },
        { text: "", value: "actions" },
        { text: "", value: "data-table-expand" },
        { text: "", value: "employee" },
      ],
     
    
    };
  },
  mounted() {
    this.$axios.get(`/rarul_department/${this.id}`)
      .then((res) => {
      console.log(res.data);
      this.provinceDepartment = res?.data
    })
  },
  methods: {
    moveTodepartmentType(item) {
      this.$router.push(`/rural/department/departmentType/data?id=${item.id}&pid=${item.pid}`);
    },
    createRuralDepartment() {
      const data = {
        title: this.titleName,
        province_id: this.id
      }
      this.$axios.post('/rarul_department', data)
        .then((res) => {
          console.log(res.data);
          this.dialog = false
        })
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
   
  },
};
</script>
