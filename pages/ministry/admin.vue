<template>
    <div>
        <!-- {{ items }} -->
        <h1 class="my-10">admin ຂອງທ້ອງຖີ່ມ </h1>
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
            <v-btn class="mx-2" outlined color="primary" to="/ministry/createAdmin">ເພີ່ມ admin</v-btn>
          </v-col>
        </v-row>
        <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-0"
            loading="true"
            :search="search"
        >

        <template #item.idx="{index}">
            <div>
                {{ index +1 }}
            </div>
        </template>
        <template #item.role="{item}">
            <div v-if="item.role == 'ministry_admin'">ຜູ້ໃຊ້ລະບົບສູງສຸດ</div>
        </template>

        <template #item.status="{item}">
            <div>
                <h4 v-if="item.status !== '0'" class="primary--text">ເປິດໃຊ້ງານ</h4>
                <h4 v-else class="red--text">ປິດໃຊ້ງານ</h4>
            </div>
        </template>

        <template #item.created_at="{item}">
            <div>
                {{ $moment(item.created_at).format('DD/MM/YYYY') }}
            </div>
        </template>
            
        </v-data-table>
        <h1 class="my-2">admin ສຳຮອງ </h1>
        <v-data-table
            :headers="adminHeaders"
            :items="admin"
            class="elevation-0"
            loading="true"
            :search="search"
        >

        <template #item.idx="{index}">
            <div>
                {{ index +1 }}
            </div>
        </template>
        <template #item.role="{item}">
            <div v-if="item.role == 'ministry_admin'">ຜູ້ໃຊ້ລະບົບສຳຮອງ</div>
        </template>

        <template #item.status="{item}">
            <div>
                <h4 v-if="item.status == '0'" class="primary--text">ເປິດໃຊ້ງານ</h4>
                <h4 v-else class="red--text">ປິດໃຊ້ງານ</h4>
            </div>
        </template>

        <template #item.created_at="{item}">
            <div>
                {{ $moment(item.created_at).format('DD/MM/YYYY') }}
            </div>
        </template>
        <template #item.actions="{item}">
            <v-btn color="red" icon dark @click.stop="openDelete(item.id)"><v-icon>mdi-delete</v-icon></v-btn>
            <v-btn  icon dark ><v-icon class="primary--text" @click.stop="openUpdate(item)">mdi-pencil</v-icon></v-btn>
        </template>
            
        </v-data-table>
          <!-- delete data sector -->
    <v-dialog
      v-model="deleteDialog"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text">ລຶບຂະແໜງ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-6 text-center black--text">
          ທ່ານຕ້ອງການລືບບັນຊີນີ້ບໍ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" dark outlined @click="deleteDialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" @click="deleteData">ລຶບຂໍ້ມູນ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogUpdate"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text">ອັບເດດ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <!-- <p class="black--text">ຊື່ນະແໜງ</p> -->
          <v-text-field
            class="pt-10"
            v-model="data.username"
            label="ຊື່"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            class="pt-2"
            v-model="password"
            label="ລະຫັດຜ່ານໃໜ່"
            outlined
            dense
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialogUpdate = false"
            >ຍົກເລິກ</v-btn>
          <v-btn color="primary" dark @click="updateData()">ບັນທຶກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$cookies.get('userId'),
            deleteDialog: false,
            dialogUpdate: false,
            items: [],
            admin: [],
            password:"",
            search: '',
            data: {},
            did:'',
            headers: [
                { text: "ລຳດັບ", value: "idx" },
                { text: "ຊື່", value: "user_name" },
                { text: "ສິດ", value: "role" },
                {text:'status', value: "status"},
                { text: "ວັນທີສ້າງ", value: "created_at" },
            ],
            adminHeaders: [
            { text: "", value: "idx" },
                { text: "", value: "username" },
                { text: "", value: "role" },
                {text:'', value: "status"},
                { text: "", value: "created_at" },
                { text: "", value: "actions" },
            ]

        }
    },
    mounted() {
        this.$axios.get(`/ministry/${this.id}`)
            .then((res) => {
            this.items.push(res.data);
        })
            this.getadmin()
       
    },
    methods: {
        getadmin() {
            this.$axios.get(`/get-admin-second/${this.id}`)
            .then((res) => {
            this.admin = res.data
        })
        },
        openDelete(id){
            // console.log(id);
            this.deleteDialog = true
            this.did = id;
        },
        deleteData() {
            this.$axios.delete(`/admin-second-delete/${this.did}`)
                .then(() => {
                    this.getadmin();
                    this.$toast.success('ລຶມຂໍ້ມູນສຳເລັດ')
                    this.deleteDialog = false
                });
        },
        openUpdate(item) {
            // console.log(item);
            this.dialogUpdate = true;
            this.data = item;
        },
        updateData() {
            if (!this.password) {
                return this.$toast.error("ປ້ອນລະຫັດຜ່ານ")
            }
            const data = {
                username: this.data.username,
                password: this.password
            }
            // console.log(data);
            this.$axios.put(`/admin-second-update/${this.data.id}`, data)
                .then(() => {
                    this.getadmin();
                    this.$toast.success('ສຳເລັດ')
                    this.dialogUpdate = false
                    this.password = ''
                });
        }
    }
}
</script>
<!-- <template>
    <div>

        <h1 class="my-10">admin ຂອງ <span class="primary--text" style="border-bottom: 1px solid #000;">{{ items[0]?.ministry_title }}</span></h1>
        <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
            pagination.sync="pagination"
            loading="true"
        >

        <template #item.idx="{index}">
            <div>
                {{ index+1 }}
            </div>
        </template>

        <template #item.created_at="{item}">
            <div>
                {{ $moment(item.created_at).format('DD/MM/YYYY') }}
            </div>
        </template>
            
        </v-data-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$cookies.get('userId'),
            items:[],
            headers: [
                { text: "ລຳດັບ", value: "idx" },
                { text: "ຊື່", value: "user_name" },
                { text: "ສິດ", value: "role" },
                { text: "ວັນທີສ້າງ", value: "created_at" },
            ]
        }
    },
    mounted() {
        this.$axios.get(`/ministry/${this.id}`)
            .then((res) => {
            this.items.push(res.data);
        })
    },
}
</script> -->