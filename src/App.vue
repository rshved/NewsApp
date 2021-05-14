<template>
  <v-app>
    <main>
      <v-toolbar class="pa-0 mb-4" flat>
        <v-toolbar-title class="title-news" color="black"
          >News App</v-toolbar-title
        >

        <v-spacer></v-spacer>
        <div class="tabs-wrap">
          <v-tabs
            class="tabs-width"
            centered
            center-active
            v-if="showMenu"
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
            class="tabs-width"
            background-color=" black"
            center-active
            show-arrows
            v-if="!showMenu"
            slider-color="white"
            dark
          >
            <v-tab v-for="item in trending" :key="item.name">
              <a :href="item.url" class="menu-link-burger-click">{{
                item.name | lengthLimiter
              }}</a></v-tab
            >
          </v-tabs>
        </div>

        <v-btn icon @click="showSearch = !showSearch"
          ><v-icon color="black">mdi-magnify</v-icon></v-btn
        >
        <burger-button
          class="burger"
          :active="isActive"
          @click="
            isActive = !isActive;
            showMenu = !showMenu;
          "
          :bar-height="4"
          :bar-width="35"
        />
      </v-toolbar>
      <v-card color="grey darken-4" dark v-if="showSearch" class="search-card">
        <v-card-title class="headline grey darken-3 search-card-header">
          <p>Search in DATA</p>
          <v-btn icon @click="showSearch = !showSearch"
            ><v-icon color="white">mdi-close</v-icon></v-btn
          >
        </v-card-title>

        <v-card-text>
          <v-autocomplete
            v-model="model"
            :items="searchData"
            :loading="isLoading"
            :search-input.sync="search"
            color="white"
            hide-no-data
            hide-selected
            item-text="Description"
            placeholder="Start typing to Search"
            prepend-icon="mdi-database-search"
            return-object
          ></v-autocomplete>
        </v-card-text>
        <v-divider></v-divider>
        <v-expand-transition>
          <v-list v-if="model" class="white">
            <v-list-item>
              <a
                :href="searchResponseBody.link"
                class="search-card-result-link"
              >
                {{ searchResponseBody.description }}</a
              >
            </v-list-item>
          </v-list>
        </v-expand-transition>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!model" color="grey darken-3" @click="model = null">
            Clear
            <v-icon right> mdi-close-circle </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>

      <router-view></router-view>

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
      <v-footer light class="custom-footer" padless>
        <v-card class="flex custom-footer" flat tile light>
          <v-card-title class="white">
            <strong class="footer-heading pl-3"
              >Get connected with us on social networks!</strong
            >

            <v-spacer></v-spacer>
            <a
              :href="icon.href"
              class="socials"
              v-for="icon in icons"
              :key="icon.href"
            >
              <v-btn class="mx-auto" dark icon color="black">
                <v-icon size="24px">
                  {{ icon.url }}
                </v-icon>
              </v-btn>
            </a>
          </v-card-title>

          <v-card-text class="py-2 black--text text-center">
            <strong> {{ new Date().getFullYear() }} — </strong
            ><strong>News App copyright all rights reserved</strong>
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
import Loader from "@/components/Loader";

Vue.component("burger-button", BurgerButton);
export default {
  name: "App",
  components: { Loader },
  data: () => ({
    isActive: false,
    showMenu: true,
    showSearch: false,
    fab: false,
    icons: [
      {
        href:
          "https://www.linkedin.com/company/techstack-limited/?utm_source=ts_website&utm_medium=link&utm_campaign=ts_website_linkedin&utm_term=linkedin&utm_content=linkedin",
        url: "mdi-linkedin",
      },
      {
        href:
          "https://www.facebook.com/techstack/?utm_source=ts_website&utm_medium=link&utm_campaign=ts_website_facebook&utm_term=facebook&utm_content=facebook",
        url: "mdi-facebook",
      },
      {
        href:
          "https://www.instagram.com/techstack_ltd/?utm_source=ts_website&utm_medium=link&utm_campaign=ts_website_instagram&utm_term=instagram&utm_content=instagram",
        url: "mdi-instagram",
      },
    ],

    entries: [],
    isLoading: false,
    model: null,
    search: null,
  }),
  computed: {
    ...mapState(["trending", "categories"]),

    searchResponseBody() {
      if (!this.model) return [];
      return { description: this.model.description, link: this.model.url };
    },

    searchData() {
      return this.categories?.map((entry) => {
        const Description = entry.name;
        return Object.assign({}, entry, { Description });
      });
    },
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
    search() {},
  },
  methods: {
    ...mapActions({
      getNews: "GET_TRENDING_NEWS",
      getCategories: "GET_CATEGORIES",
    }),
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
    querySelections(v) {
      this.loading = true;
      setTimeout(() => {
        this.searchData;
        console.log(v);
        this.loading = false;
      }, 500);
    },
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
}
.v-tabs {
  width: 80%;
}
.title-news {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
}
.menu-link {
  color: #000;
  text-decoration: none;
  font-size: 10px;
  padding: 0;
}
.menu-link-burger-click {
  color: #fff;
  text-decoration: none;
  font-size: 10px;
  padding: 0;
}
.menu-link:hover {
  color: rgb(22, 22, 192);
}
.menu-link-burger-click:hover {
  color: rgb(10, 10, 173);
}
.burger {
  margin-left: 10px;
}
.custom-footer {
  border-top: 1px solid black;
}
.footer-heading {
  color: #000;
}
.socials {
  text-decoration: none;
}
.tabs-wrap {
  width: 75%;
}
.tabs-width {
  width: 100%;
}
.search-card-header {
  display: flex;
  justify-content: space-between;
}
.search-card {
  width: 50%;
  margin: 0 auto;
}

.search-card-result-link {
  color: #000;
  text-decoration: none;
}
.search-card-result-link:hover {
  color: blue;
}
</style>