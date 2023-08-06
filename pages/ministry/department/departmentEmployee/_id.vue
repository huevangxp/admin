<!-- <template>
  <div>
    <h1 class="my-10">ຈັດການຂໍ້ມູນພະນັກງານຂອງກະຊວງ</h1>
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
      <v-col cols="4">
        <v-btn color="primary" to="/ministry/create">ສ້າງພະນັກງານກະຊວງ</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="employeeHeaders"
      :items="data"
      class="elevation-1"
      @click:row="toDetails"
    >   
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: this.$cookies.get("token"),
      employeeHeaders: [
        {
          text: "ລ/ດ",
          align: "center",
          sortable: false,
          value: "idx",
        },
        { text: "ຮູບພາບ", value:'image' },
        { text: "ຊື້ແລະນາມສະກຸ່ມ", value:'name'},
        { text: "ຕຳແໜງ" , value:'position'},
        // { text: "ສະໄໝ" },
        // { text: "ແຕ່ປີ" },
        // { text: "ຫາປີ" },
      ],
      data: [
          {
            id:'11',
            image: "https://example.com/image.jpg",
            name: "John",
            lastname: "Doe",
            position: "Developer",
            status: "Active",
          },
          {
            id:'22',
            image: "https://example.com/image2.jpg",
            name: "Jane",
            lastname: "Doe",
            position: "Designer",
            status: "Inactive",
          },
          // More data objects go here
        ],
    };
  },
  mounted() {
   
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    toDetails(item) {
      this.$router.push(`/ministry/detail/${item?.id}`)
    }
  },
};
</script> -->
