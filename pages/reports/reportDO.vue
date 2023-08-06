<template>
    <div>
      <h1 class="my-10">ລາຍງານຂອງກົມຈັດຕັ້ງ (<span class="primary--text"> {{ data?.count }} ກົມ </span> )</h1>
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="search"
            name="ຄົ້ນຫາ"
            label="ຄົ້ນຫາ"
            id="id"
            dense
            outlined
            append-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
        <v-col cols="4"> </v-col>
        <v-col cols="4" class="d-flex">
        <v-btn color="red" class="mx-3 white--text" @click="$router.back()">ຍົກເລິກ</v-btn>

          <download-excel
            class="download"
            :header="e_headers"
            worksheet="ລາຍງານ"
            :fetch="download"
            :name="title"
            :before-finish="finishDownload"
          >
            <v-btn color="primary" dark>
              <v-icon left small>mdi-download</v-icon>
              ດາວໂຫຼດ Excel
            </v-btn>
          </download-excel>
        </v-col>
      </v-row>
      <div v-if="data?.length <= 0">
        <v-card elevation="0">
          <v-card-text>
            <v-data-table
              :headers="dessertHeaders"
              :search="search"
              sort-by="index"
              class="elevation-0"
              hide-default-footer
              no-data-text=""
              :header-props="{ sortIcon: null }"
            ></v-data-table>
            <v-row class="justify-center mx-4 mt-4">
              <v-card
                flat
                class=""
                style="font-size: 20px; color: grey; margin-top: 40px"
              >
                <span class="red--text">ຍັງບໍ່ມີຂໍ້ມູນ</span>
              </v-card>
            </v-row>
            <v-skeleton-loader style="margin-top: -125px" class="" type="image">
            </v-skeleton-loader>
          </v-card-text>
        </v-card>
      </div>
      <div v-else>
      <v-data-table
        :headers="dessertHeaders"
        :items="data?.rows"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="id"
        class="elevation-1"
        :search="search"
      >
        <template #item.idx="{ index }">
          <div>
            <p>{{ index + 1 }}</p>
          </div>
        </template>
        <template #item.created_at="{ item }">
          <div>
            {{ $moment(item).format("DD/MM/YYYY") }}
          </div>
        </template>
      </v-data-table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        expanded: [],
        search: "",
        singleExpand: false,
        role: this.$cookies.get("role"),
        title: this.$cookies.get("title"),
        id: this.$cookies.get("userId"),
        data:[],
        search: "",
  
        dessertHeaders: [
          {
            text: "ລ/ດ",
            align: "start",
            sortable: false,
            value: "idx",
          },
          { text: "ຊື່ກົມ", value: "department_organization_title" },
          { text: "ວັນທີ່ສ້າງ", value: "created_at" },
        ],
        e_headers: "ລາຍງານ",
        title:
          "ລາຍງານກົມຂອງສູນກາງ" +
          new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10) +
          ".xls",
        json_meta: [
          [
            {
              key: "charset",
              value: "utf-8",
            },
          ],
        ],
      };
    },
    mounted() {
      this.getData(this.id);
    },
    computed: {},
    methods: {
      async getData(id) {
        await this.$axios
          .get(`/department-organization`)
              .then((res) => {
            // console.log('----------->',res.data);
            this.data = res?.data
          });
      },
  
      download() {
        try {
          var list = [],
            index = 0;
          for (let i = 0; i < this.data.rows.length; i++) {
            var el = this.data.rows[i];
            index = parseInt(i) + 1;
            var obj = {
              idx: index,
              title: el.department_organization_title,
              date: this.$moment(el.created_at).format("DD/MM/YYYY"),
            };
            list.push(obj);
          }
          return list;
        } catch (error) {
          console.log(error);
        }
      },
      finishDownload() {
        this.$toast.success("ດາວໂຫຼດຂໍ້ມູນເຂົ້າ excel ສຳເລັດແລ້ວ...");
      },
    },
  };
  </script>
  