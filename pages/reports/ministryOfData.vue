<template>
    <div>
      <!-- {{ ministry }} -->
      <h1 class="my-10">ລາຍງານຂໍ້ມູນຂອງກະຊວງ (<span class="primary--text"> {{ ministry?.count }} ກະຊວງ </span> )</h1>
  
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
      <v-data-table
        :headers="headers"
        :items="ministry.rows"
        class="elevation-3"
        :footer-props="{ 'items-per-page-options': [5,10, 25, -1] }"
        dense
        :search="search"
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
   
      </v-data-table>
      
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        search: '',
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
        download() {
        try {
          var list = [],
            index = 0;
          for (let i = 0; i < this.ministry?.rows?.length; i++) {
            var el = this.ministry?.rows[i];
            index = parseInt(i) + 1;
            var obj = {
              idx: index,
              title: el.ministry_title,
              date: this.$moment(el.createdAt).format("DD/MM/YYYY"),
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
  