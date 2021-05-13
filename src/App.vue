<template>
  <v-app>
    <main>
      <v-toolbar class="pa-0 mb-4" flat>
        <!-- <v-container
      class="d-inline-flex"
      light
        v-if="show"
      > -->
        <v-toolbar-title class="title-news" color="black"
          >News App</v-toolbar-title
        >

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
          centered
          center-active
          v-if="show"
          slider-color="black"
          show-arrows
        >
          <v-tab v-for="item in categories" :key="item.name">
            <a :href="item.url" class="menu-link">{{
              item.name | lengthLimiter
            }}</a></v-tab
          >
        </v-tabs>
        <v-spacer v-else></v-spacer>
        <v-tabs
          background-color=" black"
          center-active
          show-arrows
          v-if="!show"
          slider-color="white"
          dark
        >
          <v-tab v-for="item in trending" :key="item.name">
            <a :href="item.url" class="menu-link-burger">{{
              item.name | lengthLimiter
            }}</a></v-tab
          >
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
        <!-- <v-spacer
      v-else
    ></v-spacer> -->
        <burger-button
          class="burger"
          :active="isActive"
          @click="
            isActive = !isActive;
            show = !show;
          "
          :bar-height="4"
          :bar-width="35"
        />
      </v-toolbar>

      <router-view></router-view>
      <!-- <v-btn @click="scrollToTop"></v-btn> -->
      <v-btn
        v-scroll="onScroll"
        v-show="fab"
        fab
        fixed
        bottom
        right
        @click="toTop"
      >
        <v-icon color="#000">mdi-arrow-up-bold-circle-outline</v-icon>
      </v-btn>
      <v-footer
        light
        class="custom-footer"
        padless
      >
    <v-card
      class="flex custom-footer"
      flat
      tile
      light
    >
      <v-card-title class="white">
        <strong class="footer-heading pl-3">Get connected with us on social networks!</strong>

        <v-spacer></v-spacer>
        <a :href="icon.href" class="socials"
          v-for="icon in icons"
          :key="icon.href"
         >
          <v-btn
          
          class="mx-auto"
          dark
          icon
          color="black"
        >
          <v-icon size="24px">
            {{ icon.url }}
          </v-icon>
        </v-btn>
        </a>
        
      </v-card-title>

      <v-card-text class="py-2 black--text text-center">
       <strong> {{ new Date().getFullYear() }} — </strong><strong>News App copyright all rights reserved</strong>
      </v-card-text>
    </v-card>
      </v-footer>
    </main>
    <loader></loader>
  </v-app>
</template>

<script>
import "vue-burger-button/dist/vue-burger-button.css";
import Vue from "vue";
import BurgerButton from "vue-burger-button";
import { mapActions, mapState } from "vuex";
import Loader from '@/components/Loader'




Vue.component("burger-button", BurgerButton);
export default {
  name: "App",
  components:{Loader},
  data: () => ({
    // options: ['home', 'articles'],
    // selected: undefined,
    isActive: false,
    show: true,
    fab: false,
    icons: [
      {
        href: 'https://www.linkedin.com/company/techstack-limited/?utm_source=ts_website&utm_medium=link&utm_campaign=ts_website_linkedin&utm_term=linkedin&utm_content=linkedin',
        url:'mdi-linkedin',
      },
      {
        href: 'https://www.facebook.com/techstack/?utm_source=ts_website&utm_medium=link&utm_campaign=ts_website_facebook&utm_term=facebook&utm_content=facebook',
        url:'mdi-facebook',
      },
      {
        href: 'https://www.instagram.com/techstack_ltd/?utm_source=ts_website&utm_medium=link&utm_campaign=ts_website_instagram&utm_term=instagram&utm_content=instagram',
        url:'mdi-instagram',
      }
    ],
    
  }),
  computed: {
    ...mapState(["trending", "categories"]),
  },
  filters: {
    lengthLimiter: function (value) {
      console.log(value);
      if (!value) return "";
      value = value.toString();
      return value.split(":")[0];
    },
  },
  watch: {
    // selected(val) {
    //   this.$router.push({ name: val })
    // }
  },
  methods: {
    ...mapActions({
      getNews: "GET_TRENDING_NEWS",
      getCategories: "GET_CATEGORIES",
    }),
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset ||   e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    }
   // toRouteMenu(item) {
    //   this.$route.name !== item && this.$router.push({ name: item })
    // },
  },
  mounted() {
    this.getNews(), this.getCategories();
  },
  
};
</script>

<style scoped>
main {
  padding: 36px 83px;
  position: relative;
  width: 1152px;
  
  background: #ffffff;
  margin: 0 auto;
}

.v-text-field {
  width: 1px;
}

.categories-links {
  list-style-type: none;
  /* display: inline-flex; */
}
.v-tabs {
  width: 80%;
}
.title-news {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;

  /* line-height: 24px; */
}
.menu-link {
  color: #000;
  text-decoration: none;
  font-size: 10px;
  padding: 0;
}
.menu-link-burger {
  color: #fff;
  text-decoration: none;
  font-size: 10px;
  padding: 0;
}
.menu-link:hover {
  color: rgb(22, 22, 192);
}
.menu-link-burger:hover {
  color: rgb(10, 10, 173);
}
.burger {
  margin-left: 10px;
}
.custom-footer{
  border-top: 1px solid black;
}
.footer-heading{
  color: #000;
  
}
.socials{
  text-decoration: none;
}
</style>