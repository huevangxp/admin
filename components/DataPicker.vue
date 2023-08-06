<template>
    <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="date"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          :label="label"
          prepend-inner-icon="mdi-calendar"
          readonly
          hide-details="auto"
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="error" @click="modal = false"> ຍົກເລີກ </v-btn>
        <v-btn text color="primary" @click="saveDate"> ເລືອກ </v-btn>
      </v-date-picker>
    </v-dialog>
  </template>
  <script>
  export default {
    props: {
      label: {
        type: String,
        default: "ວັນທີເລີ່ມ",
      },
      value: {
        type: String,
        default: null,
      },
    },
    data: () => ({
      date: null,
      modal: false,
    }),
    mounted() {
      this.date = this.value;
    },
    methods: {
      saveDate() {
        this.$refs.dialog.save(this.date);
        this.$emit('input', this.date)
      },
    },
  };
  </script>
  