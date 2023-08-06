<template>
    <div>
        <div class=" font-weight-bold mb-3" style="font-size:30px">ການລາຍງານ</div>
        <v-row dense>
            <v-col
                v-for="item in lists"
                :key="item.title"
                cols="6"
                md="4"
            >
                <v-card 
                hover shaped raised
                class="white"
                @click="$router.push(item.to)"
                 height="150px"
                  >
                    <v-card-text>
                        <div
                            class="font-weight-bold  d-flex align-center"
                            style="font-size:20px"
                        >
                        <v-btn color="#02735E"  fab small  elevation="0">
                            <v-icon v-if="item.icon" color="white">
                                {{ item.icon }}
                            </v-icon>
                        </v-btn>
                           
                           <span class="#034159--text text-center mx-4" style="opacity: 0.9;"> {{ item.title }}</span>
                        </div>
                        <div class="grey--text text-center text--lighten-1 ml-10 my-4">
                            ເຂົ້າເບີ່ງລາຍລະອຽດ
                        </div>
                    </v-card-text>
                </v-card>
           
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    name: "ReportsRuralMinstryPage",
    data() {
        return {
            lists: [
                {
                    title: "ຂໍ້ມູນຂອງກົມ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-database",
                    to: "/reports/ministry/departmentDO",
                },
                {
                    title: "ຂໍ້ມູນພະນັກງານຂອງກົມ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-account",
                    to: "/reports/ministry/departmentDOE",
                },
                {
                    title: "ຂໍ້ມູນພະແນກຂອງກົມ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-file-import",
                    to: "/reports/ministry/department",
                },
                {
                    title: "ຂໍ້ມູນພະນັກງານຂອງພະແນກ",
                    src: "https://picsum.photos/400/400",
                    icon: "mdi-file-export",
                    to: "/reports/ministry/departmentEM",
                },
            ],
        };
    },
};
</script>