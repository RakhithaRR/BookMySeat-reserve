<template>
  <v-layout>
    <v-flex xs12 sm8 offset-sm2>
      <v-card
        hover
        ripple
        class="mt-1 mb-1"
        v-for ="trip in Trips"
        :key = "trip.id">
        <v-layout row>
          <v-flex md4>
            <v-card-title primary-title>
              <div>
                <h6 class="mb-0 mt-0">{{trip.route}} {{trip.start}} - {{trip.end}}</h6>
              </div>
            </v-card-title>
          </v-flex>
          <v-flex md4 class="mt-4 ml-4">
            Leaving time: {{trip.time}}
          </v-flex>
          <v-flex md4>
            <v-card-actions>
              <v-btn outline flat color="blue" class="mt-2 ml-3">Reserve</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex md4 class="ml-3">
            Starting from: {{trip.start}}
          </v-flex>
          <v-flex>
            Bus type: {{trip.type}}
          </v-flex>
          <v-flex class="ml-4">
            Available seats: {{trip.seats}}
          </v-flex>
        </v-layout>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  const axios = require('axios');
  export default {
    name: 'results',
    data() {
      return {
        Trips: []
      }
    },
    mounted () {
      var result = JSON.parse(localStorage.getItem('searchResult'));
//      result.pop();
      console.log(result);
      this.Trips = result;
//
    },
    methods: {

    }
  }
</script>

//      axios({
//        method: 'get',
//        url: 'http://localhost:3000/results',
//        headers: {'Content-Type': 'application/json'}
//      }).then((response) => {
//        console.log(response.data);
//        this.Trips = response.data[0];
//      }).catch((err) => {
//        console.log('Error: '+ err);
//      });
