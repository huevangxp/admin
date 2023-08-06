<template>
    <div>
      <h1 class="my-10 ml-3">
        ຈັດການຂໍ້ມູນພະນັກງານທັງໜົດ
        <span class="primary--text" style="border-bottom: 1px solid #000">{{
          title
        }}</span>
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
            <v-btn class="mx-2" outlined color="primary" to="/dashboard/member/create"
              >ສ້າງພະນັກງານ</v-btn>
            <v-btn color="pick" dark to="/dashboard/member/oldMember"
              >ເບີ່ງພະນັກງານເກົ່າ</v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-card elevation="0">
        <v-card-text v-if="departmentDO?.length <= 0">
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
            <template v-slot:item.actions="{ item }">
              <div>
                <div>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        small
                        color="red"
                        dark
                        v-on="on"
                        @click.stop="deleteData(item.id)"
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
                        @click.stop="$router.push(`/dashboard/member/update/${item.id}`)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>ແກ້ໄຂຂໍ້ມູນ</span>
                  </v-tooltip>
                </div>
              </div>
            </template >
            <template #item.status="{item}">
              <div>
                  <span v-if="item.status === '0'" class="primary--text">ໃໜ່</span>
                  <span v-else class="red--text">ເກົ່າ</span>
              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>

      <!-- delete department do -->
      <v-dialog
        v-model="deleteDialog"
        persistent
        :overlay="false"
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-title class="primary white--text"> ລຶບຂໍ້ມູນ </v-card-title>
          <v-card-text class="py-6 text-center black--text">
            ທ່ານຕ້ອງການລຶບບັນຊີນີ້ບໍ?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" outlined @click="deleteDialog = false"
              >ຍົກເລິກ</v-btn
            >
            <v-btn color="primary " @click="deleteDO">ລຶບຂໍ້ມູນ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
  
        deleteDialog: false,
        expanded: [],
        singleExpand: false,
        dialog: false,
        dialogUpdateDO: false,
     
        eid: "",
        mData: {},
        role: this.$cookies.get("role"),
        title: this.$cookies.get("title"),
        doId: "",
        search: "",
        dataPrepare: [],
        department_organization_title: "",
  
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
          { text: "ສະຖະນາ", value: "status" },
          { text: "ປະຫັວດ", value: "details" },
          { text: "", value: "actions" },
        ],
      };
    },
    mounted() {
      this.getData();
    },
    computed: {},
    methods: {
      async deleteDO() {
        try {
          await this.$axios
            .$delete(`/delete-member-prepare/${this.doId}`)
            .then((res) => {
              console.log(res.data);
              this.deleteDialog = false;
              this.$toast.success("ລືບຂໍ້ມູນສຳເລັດ");
            })
            .catch((error) => {
              this.$toast.error("ບໍ່ສຳມາດລຶບໄດ້");
            });
          this.getData();
        } catch (error) {
          console.log(error);
        }
      },
  
      getData() {
          this.$axios.get(`/get-all-member?status=0`).then((res) => {
            console.log(res.data);
          this.dataPrepare = res?.data;
        });
      },
  
      async deleteData(id) {
        // console.log(id);
        this.doId = id;
        this.deleteDialog = true;
      },
    
    },
  };
  </script>
  