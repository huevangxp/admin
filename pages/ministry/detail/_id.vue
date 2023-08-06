<template>
  <v-container fluid>
    <!-- {{ id }} -->
    <div class="d-flex justify-space-between mx-10">
      <div>
      <div class="d-flex justify-space-between">

        <v-card max-width="200" height="250" elevation="0">
          <v-img src="/huevang.jpeg" style="height: 100%; width: 100%"></v-img>
        </v-card>
        <v-card class="mx-4 " elevation="0">
         <div class="mx-4 my-3">
          <span style=" font-weight: bold">
            ຊື່:
          </span><br>
          <span>- Mr.huevang</span>
         </div>
         <div class="mx-4 my-3">
          <span style=" font-weight: bold">
            ເບີ:
          </span><br>
          <span >- 020 78849378</span>
         </div>
         <div class="mx-4 my-3">
          <span style=" font-weight: bold">
            ຕຳແໜງ:
          </span><br>
          <span>- ຫົວນ້າກົມປານຊາການ</span>
         </div>
        </v-card>
      </div>
      <v-card max-width="100%" elevation="0">
       <v-card-text style="width: 380px">
       <span class="black--text"> ທີ່ຢູ່: </span>
       <p>testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest</p>
       </v-card-text> 
       <v-card-text style="width: 380px">
        <span class="black--text">ປະຫວັດຫຍໍ້:</span>
        <p>testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest</p>
       </v-card-text> 
      </v-card>
      </div>
      <div class="flex-1">
        <v-timeline dense clipped>
          <v-timeline-item
            fill-dot
            class="white--text mb-12"
            color="primary"
            small
          >
            <template v-slot:icon>
              <v-avatar size="40" color="primary">
                <v-img :src="profile" alt="alt"></v-img>
              </v-avatar>
            </template>
            <v-text-field
            style="width: 400px"
              v-model="input"
              hide-details
              flat
              label="ເຮັດກິດຈະກຳຕ່າງໆໆໆ"
              
              solo
              @keydown.enter="comment"
            >
              <template v-slot:append>
                <v-btn class="mx-0" color="red" dark icon depressed @click="comment"> <v-icon>mdi-checkbox-marked-circle</v-icon> </v-btn>
              </template>
            </v-text-field>
          </v-timeline-item>
          <v-slide-x-transition group>
            <v-timeline-item
              v-for="event in timeline"
              :key="event.id"
              class="mb-4"
              color="primary"
              small
            >
              <v-card hover raised>
                <div class="d-flex"> 
                  <v-btn class="mt-5 ml-3 " color="yellow" elevation="0" small icon>

                    <v-icon>mdi-check-decagram</v-icon>
                  </v-btn>
                  <!-- <span style="font-size:39px" class="mx-2">:</span> -->
              <v-card-title
                  style="width: 400px"
                  v-text="event.text"
                > 
              </v-card-title>
              </div>
                <v-card-text v-text="event.time"></v-card-text>
              </v-card>
            </v-timeline-item>
          </v-slide-x-transition>
        </v-timeline>
      </div>
    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      events: [],
      input: null,
      nonce: 0,
      profile:this.$cookies.get('profile')
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    timeline() {
      return this.events.slice().reverse();
    },
  },
  methods: {
    comment() {
      const time = new Date().toTimeString();
      this.events.push({
        id: this.nonce++,
        text: this.input,
        time: time.replace(
          /:\d{2}\sGMT-\d{4}\s\((.*)\)/,
          (match, contents, offset) => {
            return ` ${contents
              .split(" ")
              .map((v) => v.charAt(0))
              .join("")}`;
          }
        ),
      });

      this.input = null;
    },
  },
};
</script>
