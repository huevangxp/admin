<template>
  <div>
    <v-card class="mx-auto" max-width="600" elevation="0">
      <v-card-title class="text-h6 font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
        <v-avatar
          color="primary lighten-2"
          class="subheading white--text"
          size="24"
          v-text="step"
        ></v-avatar>
      </v-card-title>
<!-- {{ chooseProvince.rows }} -->
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <v-select
              :items="chooseProvince.rows"
              v-model="province"
              item-value="id"
              item-text="province_title"
              label="ເລືອກແຂວງ"
              return-object
              outlined
              dense
              class="mt-10"
              hide-details="auto"
              @change="selectDepartment"
            ></v-select>
          </v-card-text>
          <v-card-text>
                <v-select
                  v-model="user.title"
                  :items="departmentDO"
                  item-text="title"
                  item-value="title"
                  dense
                  outlined
                  placeholder="ເລືອກຊື່ພະແນກ"
                  hide-details="auto"
                ></v-select>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="user.user_name"
                  dense
                  outlined
                  placeholder="ຊື່ຂອງ admin ຈັດການທ້ອງຖີ່ນ"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="data"
                  v-model="user.role"
                  item-text="name"
                  item-value="name"
                  label="ເລືອກສິດຂອງ admin"
                  dense 
                  outlined
                  hide-details="auto"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="user.password"
                  dense
                  outlined
                  placeholder="ລະຫັດຜ່ານ"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn :disabled="step === 1" text @click="step--"> Back </v-btn>
        <v-spacer></v-spacer>

        <v-btn v-if="step == 2" color="primary" depressed @click="create">
          ບັກທືນ
        </v-btn>
        <v-btn v-else color="primary" depressed @click="step++"> ບັກທືນ </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: "",
      province: {},
      loading: false,
      user: {},
      departmentDO:[],
      image: "",
      step: 1,
      data: [
        {id: 1, name: "super_admin"},
        {id: 2, name: "ministry_admin"},
        {id: 3, name: "rural_admin"},
      ],
    };
  },
  mounted() {
  this.$store.dispatch('province/getProvince')
  },
  computed: {

    chooseProvince() {
      return this.$store.state.province.province;
    },
    currentTitle() {
      switch (this.step) {
        case 1:
          return "ສ້າງທ້ອງຖີ້ມ";
        default:
          return "ສ້າງ admin ຂອງທ້ອງຖີ້ມ";
      }
    },
  },
  methods: {
    selectDepartment(e) {
      // console.log(e);
      this.$axios
        .get(`/select-prepare-department/${e.id}`)
        .then((res) => {
            // console.log('------------->',res.data);
          this.departmentDO = res?.data;
        });
    },
    async create() {
      try {
        if (!this.province || !this.user.title || !this.user.password || !this.user.user_name || !this.user.role) {
        return  this.$toast.error("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ")
        }
          const data = {
            province_id: this.province.id,
            province_title: this.province.province_title,
            pid: this.province.pid,
            profile:this.province.profile,
            title: this.user.title,
            user_name: this.user.user_name,
            password: this.user.password,
            role: this.user.role,
        };
          // console.log(data);
          await this.$axios.post("/rarul_department", data).then((data) => {
            this.$router.back();
            this.$toast.success("ສ້າງສຳເລັດແລ້ວ");
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
