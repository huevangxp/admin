<template>
  <v-data-table :headers="headers" :items="items" @click:row="moveDepartment">
    <template #[`item.actions`]="{ item }">
          <v-btn color="blue" text @click="editItem(item)"> <v-icon>mdi-pencal</v-icon> </v-btn>
          <v-btn color="red" text @click="deleteItem(item)">Delete</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {text:"ID", value:"id"},
        { text: "Image", value: "image" },
        { text: "Name", value: "name" },
        { text: "Last Name", value: "lastname" },
        { text: "Position", value: "position" },
        { text: "Status", value: "status" },
        { text: "", value: "actions" },
      ],
      items: [
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
  methods: {
    moveDepartment(data) {
    // alert(data)
    // console.log(data.id);
      if (!data.id) {
      return alert('no id')
      }
    this.$router.push(`/rural/detail/${data.id}`)
    },
    editItem(item) {
      // Handle edit button click for the given item
    },
    deleteItem(item) {
      // Handle delete button click for the given item
    },
  },
  created() {
    // this.$axios.get('http://localhost:3000/get-user')
    //   .then(response => {
    //     this.users = response.data
    //   })
    //   .catch(error => {
    //     console.error(error)
    //   })
  }
};
</script>
