<template>
  <v-container fluid>
    <v-card class="mx-auto" max-width="800" elevation="0">
      <v-card-title> create admin for manage system </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="identification"
              id="id"
              dense
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="name"
              id="id"
              dense
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="last name"
              id="id"
              dense
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="identification"
              id="id"
              dense
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="identification"
              id="id"
              dense
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" dark>cancel</v-btn>
        <v-btn color="primary" dark>create admin</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
