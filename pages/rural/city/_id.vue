<template>
  <v-container fluid>
    <h1 class="my-10">ຈັດການຂໍ້ມູນຂອງເມືອງ</h1>
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
        <v-btn color="red" class="mx-3 white--text" @click="$router.back()"
          >ຍົກເລິກ</v-btn
        >
        <v-btn
          v-if="role === 'rural_admin'"
          outlined
          color="primary"
          @click="getCity"
          >ສ້າງເມືອງ</v-btn
        >
      </v-col>
    </v-row>
    <v-card elevation="0">
      <v-card-text v-if="getCityData?.length <= 0">
        <v-card elevation="0">
          <v-card-text>
            <v-data-table
              :headers="headers"
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
      </v-card-text>
      <v-card-text v-else>
        <v-data-table
          :headers="headers"
          :items="getCityData"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          :search="search"
          item-key="name"
          class="elevation-1"
          @click:row="moveToCityOffice"
        >
          <template #[`item.idx`]="{ index }">
            <div>
              {{ index + 1 }}
            </div>
          </template>
          <template #item.created_at="{ item }">
            <div>
              {{ $moment(item.created_at).format("DD/MM/YYYY") }}
            </div>
          </template>
          <template #[`item.actions`]="{ item }">
            <div v-if="role === 'rural_admin'" class="d-flex">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    small
                    color="red"
                    dark
                    v-on="on"
                    @click.stop="openDelete(item)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>ລືບ</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    small
                    color="primary"
                    dark
                    v-on="on"
                    @click.stop="openUdate(item)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>ແກ້ໄຂຂໍ້ມູນ</span>
              </v-tooltip>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title class="primary white--text">ສ້າງເມືອງ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <v-text-field  class="pt-10" hide-details="auto" v-model="office_title" dense outlined label="ປ້ອນຊື່ຫ້ອງການ"></v-text-field>
          <v-select
           hide-details="auto"
           class="pt-4"
            v-model="title"
            label="ເລືອກຊື່ເມືອງ"
            :items="city"
            item-text="dn"
            item-value="dn"
            outlined
            dense
          ></v-select>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="createCity()">ສ້າງເມືອງ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogUdate"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text">ແກ້ໄຂເມືອງ</v-card-title>
        <v-divider class="pb-7"></v-divider>
        <v-card-text>
          <v-text-field
            class="py-4"
            outlined
            dense
            v-model="cityData.district_title"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialogUdate = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="updateCity()">ສ້າງເມືອງ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="openDeleteData"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text"> ລືມຂໍ້ມູນ </v-card-title>
        <v-card-text class="py-6 text-center black--text">
          ທ່ານຕ້ອງການລືບບັນຊີນີ້ບໍ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined @click="openDeleteData = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary " @click="deleteCity">ລືມຂໍ້ມູນ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "CityPage",
  data() {
    return {
      expanded: [],
      openDeleteData: false,
      singleExpand: false,
      dialogUdate: false,
      dialog: false,
      search: "",
      title: "",
      office_title:"",
      cityData: {},
      role: this.$cookies.get("role"),
      city: [],
      getCityData: [],
      headers: [
        {
          text: "ລຳດັບ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຫ້ອງການ", value: "office_title" },
        { text: "ເມືອງ", value: "district_title" },
        { text: "ວັນທີ່ສ້າງ", value: "created_at" },
        { text: "", value: "actions" },
      ],
    };
  },
  mounted() {
    this.$axios.get(`/district/${this.id}`).then((res) => {
      this.getCityData = res?.data;
    });
  },
  methods: {
    openDelete(item) {
      console.log(item);
      this.cityData = item;
      this.openDeleteData = true;
    },
    openUdate(item) {
      this.dialogUdate = true;
      this.cityData = item;
    },
    updateCity() {
      const data = {
        title: this.cityData.district_title,
      };
      this.$axios.put(`/district/${this.cityData.id}`, data).then((res) => {
        this.$toast.success("ສຳເລັດ");
        this.dialogUdate = false;
      });
    },
    async deleteCity() {
      try {
        await this.$axios
          .delete(`/district/${this.cityData.id}`)
          .then((res) => {
            this.openDeleteData = false;
          });
        this.$axios.get(`/district/${this.id}`).then((res) => {
          console.log(res.data);
          this.getCityData = res?.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
    async createCity() {
      try {
        const data = {
          province_departments_id: this.id,
          title: this.title,
          office_title:this.office_title
        };
        await this.$axios.post("/district", data).then((res) => {
          this.dialog = false;
        });
        this.$axios.get(`/district/${this.id}`).then((res) => {
          // console.log(res.data);
          this.getCityData = res?.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
    moveToCityOffice(item) {
      this.$router.push(`/rural/cityUnit/${item.id}`);
    },
    async getCity() {
      let id = this.pid;
      await this.$axios.get(`/address/city/${id}`).then((res) => {
        this.city = res?.data;
      });
      this.dialog = true;
    },
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    pid() {
      return this.$route.query.pid;
    },
  },
};
</script>
