<template>
    <div>
      <h1 class="my-10 ml-3">
        ຂໍ້ມູນພະນັກງານທັງໜົດ
    
      </h1>
      <v-card elevation="0" class="mx-3">
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
          <v-col cols="4" class="d-flex justify-end">
            <v-btn color="red" outlined @click="$router.back()">ຍົກເລິກ</v-btn>
        </v-col>
        </v-row>
      </v-card>
      <v-card elevation="0">
        <v-card-text v-if="dataPrepare?.length <= 0">
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
              >
            </v-data-table>
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
        </v-card-text>
        <v-card-text v-else>
  
          <v-data-table
          @click:row="moveCreate"
          :headers="dessertHeaders"
          :items="dataPrepare"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            item-key="id"
            class="elevation-1"
            :search="search"
          >
            <template #item.idx="{ idx, index }">
              <div>
                <span>{{ index + 1 }}</span>
              </div>
            </template>
            <template #item.profile="{ item }">
          <div>
            <v-avatar size="60">
              <v-img lazy-src="/loading.gif" :src="item.profile" alt="alt" />
            </v-avatar>
          </div>
        </template>
          </v-data-table>
        </v-card-text>
      </v-card>
     
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        role: this.$cookies.get("role"),
            title: this.$cookies.get("title"),
            dataPrepare: [],
            search:'',
        dessertHeaders: [
          {
            text: "ລ/ດ",
            align: "start",
            sortable: false,
            value: "idx",
          },
          { text: "ຮູບ", value: "profile" },
          { text: "ຊື່", value: "name" },
          { text: "ນາມສະກຸມ", value: "last_name" },
          { text: "ເບີ", value: "phone" },
          { text: "ຕຳແໜງ", value: "position" },
          { text: "ປະຫັວດ", value: "details" },
     
        ],
      };
    },
    mounted() {
      this.getData();
    },
    computed: {
          id() {
            return this.$route.params.id;
        }
    },
    methods: {
          moveCreate(item) {
            try {
                this.$router.push(`/rural/cityOffice/create/data?id=${this.id}&mId=${item.id}`);
            } catch (error) {
                console.log(error);
            }
        },
      getData() {
          this.$axios.get(`/get-all-member?status=0`).then((res) => {
          this.dataPrepare = res?.data;
        });
      },
  
     
    },
  };
  </script>
  