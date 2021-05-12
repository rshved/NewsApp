<template>
  <main>
    
    <v-toolbar
      class="pa-0"
      flat
     
      >
      
      <!-- <v-container
      class="d-inline-flex"
      light
        v-if="show"
      > -->
        <v-toolbar-title class="title-news" color="black">News App</v-toolbar-title>

      <!-- <v-spacer></v-spacer>

      <v-text-field
        
        color="#000000"
        label="Search..."
        hide-details
        prepend-icon="mdi-magnify"
        single-line
      ></v-text-field>
      
      <v-btn
        color="#000"
        class="ma-0 "
        v-for="(item, index) in options"
        :key="index"
        @click="toRouteMenu(item)"
        plain
        >{{ item }}
      </v-btn>
      

      <v-btn icon>
        <v-icon color="#000">mdi-instagram</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon color="#000">mdi-twitter</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon color="#000">mdi-linkedin</v-icon>
      </v-btn> -->
      

      
    <!-- <v-list >
      <v-list-item v-for="item in trending"
      :key=item.name
      class="categories-links"
      >
      <a :href="item.url">{{item.name | lengthLimiter}}</a>
        
      </v-list-item>
    </v-list>  -->
    
    <v-tabs
      background-color=" accent-4"
      center-active
      dark
       v-if="show"
       
    >
    
      <v-tab v-for="item in categories"
      :key=item.name
      >
      <a :href="item.url"
        class="menu-link"
      >{{item.name | lengthLimiter}}</a></v-tab>
      
    </v-tabs>
    <v-spacer
      v-else
    ></v-spacer>
    <v-tabs
      background-color=" black"
      center-active
      align-with-title
       v-if="!show"
       
       
    >
    
      <v-tab v-for="item in trending"
      :key=item.name
      
      >
      <a :href="item.url"
        class="menu-link-burger"
        
      >{{item.name | lengthLimiter}}</a></v-tab>
      
    </v-tabs>
      <!-- </v-container> -->
    
    <!-- <v-list v-if="!show">
      <v-list-item v-for="item in trending"
      :key=item.name
      class="categories-links"
      >
      <a :href="item.url">{{item.name | lengthLimiter}}</a>
        
      </v-list-item>
    </v-list> -->
    <burger-button
        
        :active="isActive"
        @click="
        isActive = !isActive
        show = !show
        "
        :bar-height="4"
        :bar-width="35"
      />
      
    </v-toolbar>
    <router-view></router-view>
  
  </main>
</template>
<script>
 import { mapActions, mapState } from 'vuex'
export default {
  // name: 'Home',
  
  data: () => ({
    // options: ['home', 'articles'],
    // selected: undefined,
    isActive: false,
    show: true
  }),
  computed: {
    ...mapState(['trending', 'categories'])
  },
  filters: {
  lengthLimiter: function (value) {
    console.log(value)
    if (!value) return ''
    value = value.toString()
    return value.split(':')[0]
    }
  },
  watch: {
    // selected(val) {
    //   this.$router.push({ name: val })
    // }
  },
  methods:{
    ...mapActions({
        getNews: 'GET_TRENDING_NEWS',
        getCategories: 'GET_CATEGORIES'
        }),
    // toRouteMenu(item) {
    //   this.$route.name !== item && this.$router.push({ name: item })
    // },
    
  },
  mounted () {
    
   this.getNews(),
   this.getCategories()
    
  }
}
</script>

<style scoped>
  main {
    padding: 36px 83px;
    position: relative;
    width: 1152px;
    height: 1860px;
    background: #FFFFFF;
    margin: 0 auto;
   }

   .v-text-field{
      width: 1px;
    }

    .categories-links {
      list-style-type: none;
      /* display: inline-flex; */
      
    }
    .v-tabs{
      width:80%;
      
    }
    .title-news{
      font-family: Inter;
      font-style: normal;
      font-weight: bold;
      font-size: 32px;
      /* line-height: 24px; */
    }
    .menu-link{
      color: #000;
      text-decoration: none;
      font-size: 10px;
      padding: 0;
    }
    .menu-link-burger{
      color: #fff;
      text-decoration: none;
      font-size: 10px;
      padding: 0;
    }
    .menu-link:hover{
      color:rgb(22, 22, 192)
    }
    .menu-link-burger:hover{
      color: rgb(10, 10, 173)
    }
</style>