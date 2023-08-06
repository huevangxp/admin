<template>
    <v-container fluid>
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
          <v-btn color="primary" to="/department/detail/create">create ຂະແໜງ</v-btn>
          <!-- <v-btn color="green" dark>Export To excel</v-btn> -->
        </v-col>
      </v-row>
      {{ id }}
      <v-data-table
          :headers="dessertHeaders"
          :items="desserts"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="name"
          class="elevation-1"
          @click:row="moveTodepartmentType"
          >
          <!-- show-expand -->
          <!-- v-if="role !== 'super_admin'" -->
          <template #[`item.actions`] >
            <div class="d-flex" >
              <v-btn color="primary" icon dark>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </div>
          </template>
    
        </v-data-table>
        <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
          <v-card>
            <v-card-title color="red">
              Do you want to delete this admin?
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="mt-3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
              consequuntur alias dignissimos totam temporibus repellendus recusandae
              est possimus nisi sit.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" dark @click="dialog = false"> Cancel</v-btn>
              <v-btn color="primary" dark>Delete</v-btn>
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
        expanded: [],
          singleExpand: false,
          dialog: false,
        search: "",
          role:this.$cookies.get('role'),
          dessertHeaders: [
            {
              text: "ລະຫັດ",
              align: "start",
              sortable: false,
              value: "id",
            },
            { text: "ຊື່ພະແນກ", value: "name" },
            { text: "", value: "actions" },
            { text: "", value: "data-table-expand" },
          ],
          desserts: [
            {
              id: 159,
              name: "ພະແນກການຕ່າງປະເທດ",
            },
            {
              id: 237,
              name: "ພະແນກຍຸຕິທໍາ",
            },
            {
              id: 262,
              name: "ພະແນກພາຍໃນ",
            },
            {
              name: "ພະແນກສຶກສາທິການ ແລະ ກິລາ",
              id: 305,
            },
          ],
          department: [
            {
              id: 159,
              name: "ຂະແໜງ 1",
            },
            {
              id: 237,
              name: "ຂະແໜງ 2",
            },
            {
              id: 262,
              name: "ຂະແໜງ 3",
            },
            {
              name: "ຂະແໜງ 4",
              id: 305,
            },
          ],
      };
    },
    methods: {
      moveTodepartmentType(item) {
         this.$router.push(`/rural/departmentType/${item.id}`)
      },
    },
    computed: {
      id() {
        return this.$route.params.id;
      },
    },
  };
  </script>
  