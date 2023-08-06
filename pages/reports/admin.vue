<template>
  <div>
    <h1 class="my-10">ລາຍງານຂໍ້ມູນຂອງ admin ໃຫຍ່ສຸດຂອງລະບົບ (<span class="primary--text"> {{ admin?.count }} ຄົນ </span> )</h1>
    <v-row> 
      <v-col cols="6">
        <v-text-field
          v-model="search"
          name="search"
          label="search"
          dense
          outlined
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
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
        <!-- <v-btn color="primary" outlined dark @click="dialog = true">ສ້າງສະມາຊິກ</v-btn> -->
      </v-col>
    </v-row>
    <div>
      <v-data-table
        :headers="headers"
        :items="admin?.rows"
        class="elevation-3"
        :footer-props="{ 'items-per-page-options': [10, 25, -1] }"
        fixed-header
        :search="search"
      >
        <template #item.profile="{ item }">
          <div>
            <v-avatar size="70">
              <v-img
                lazy-src="/loading.gif"
                :src="item?.profile"
                alt="profile"
              ></v-img>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "ລ/ດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຮູບ", value: "profile" },
        { text: "ຊື່", value: "name" },
        { text: "ນາມສະກຸນ", value: "last_name" },
        { text: "ເບິ", value: "phone" },
        { text: "ອີເມວ", value: "email" },
        { text: "ສະຖານະ", value: "role" },
        { text: "ວັນທີສ້າງ", value: "createdAt" },
        { text: "", value: "actions" },
      ],
      items: [
        { id: 1, text: "super_admin" },
        { id: 2, text: "ministry_admin" },
        { id: 3, text: "rural_admin" },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("user/getAdmin");
  },
  computed: {
    admin() {
      return this.$store.state.user.admin;
    },
  },

  methods: {
    download() {
      try {
        var list = [],
          index = 0;
        for (let i = 0; i < this.admin?.rows?.length; i++) {
          var el = this.admin?.rows[i];
          index = parseInt(i) + 1;
          var obj = {
            idx: index,
            name: el.name,
            last_name: el.last_name,
            phone: el.phone,
            email: el.email,

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
