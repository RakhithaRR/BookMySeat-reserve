<template>
  <v-app>
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="grey darken-4">
      <v-toolbar-side-icon class="hidden-sm-and-up" @click="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>
        <v-icon dark>directions_bus</v-icon>
        <router-link to="/" tag="span" style="cursor: pointer">BookMySeat</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false,
        menuItems: [
          {icon: 'input', title: 'Add Trips',link: '/addtrips'},
          {icon: 'search', title: 'Search Buses',link: '/searchBus'},
          {icon: 'help', title: 'Support',link: '/reserves'},

//          {icon: 'person_pin', title: 'Sign Up',link: '/signup'},
//          {icon: 'lock_open', title: 'Sign In',link: 'signin'}
        ]
      }
    }
  }
</script>
