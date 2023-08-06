<template>
  <v-container fluid>
  <v-container fluid>
    <IndexLine/>
  </v-container>
  <div>
  
    </div>
  </v-container>
</template>


<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      dialog: false,
      search: '',
      role: this.$cookies.get("role"),
      title: this.$cookies.get('title'),
      pid: this.$cookies.get('pid'),
      id: this.$cookies.get('userId'),
      lists: [
                {
                    title: "admin ໃຫຍ່",
                    src: "https://pngimg.com/d/book_PNG51090.png",
                    to: "/dashboard/admin"
                },
                {
                    title: "ສ້າງ admin",
                    src: "https://cdn-icons-png.flaticon.com/512/2784/2784403.png",
                    to:"/dashboard/create"
                },
                {
                    title: "ພະນັກງານ",
                    src: "https://static.vecteezy.com/system/resources/thumbnails/011/299/670/small/businessman-and-company-staff-posing-character-3d-character-illustration-png.png",
                },
                
            ],   
    }
  },
  mounted() {
    if (this.role == 'ministry_admin') {
      this.$router.push(`/ministry/department/${this.id}`);
   }
    if (this.role == 'rural_admin') {
      this.$router.push(`/rural/department/departmentType/data?id=${this.id}&pid=${this.pid}`)
   }
  }
}
</script>
