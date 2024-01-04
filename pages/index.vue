<template>
  <div class="pt-10">
    <v-item-group>
      <v-row>
        <v-col v-for="(item, index) in items" :key="index" cols="4">
          <v-item v-slot="{ active, toggle }">
            <v-card
              max-width="200"
              :color="active ? 'primary' : ''"
              @click="selectItem(item.id, toggle)"
            >
              <v-row>
                <v-col cols="4 d-flex justify-center">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-col>
                <v-col cols="8">
                  <v-card-title> {{ item.name }} </v-card-title>
                </v-col>
              </v-row>
            </v-card>
          </v-item>
          
        </v-col>
      </v-row>
    </v-item-group>
    <div class="mt-10">
      <div v-if="check === 1"> 
        <DashboardMinistry/>
      </div>
      <div v-if="check === 2">
      <DashboardProvince/>
      </div>
      <div v-if="check === 3">
      <DashboardCity/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      check: 1, // Initialize as a number
      items: [
        {
          id: 1,
          icon: 'mdi-monitor-dashboard',
          name: 'ຂັ້ນກະຊວງ',
        },
        {
          id: 2,
          icon: 'mdi-monitor-dashboard',
          name: 'ຂັ້ນແຂວງ',
        },
        {
          id: 3,
          icon: 'mdi-monitor-dashboard',
          name: 'ຂັ້ນເມືອງ',
        },
      ],
    };
  },
  methods: {
    selectItem(id, toggle) {
      console.log(id);
      this.check = id; // Update the check data property
      toggle(); // Call the toggle function to manage item selection
    },
    getSelectedText() {
      switch (this.check) {
        case 1:
          return 'ministry';
        case 2:
          return 'province';
        case 3:
          return 'district';
        default:
          return '';
      }
    },
  },
};
</script>
