<template>
  
  <v-container class="mx-auto main-container ">
    
    <v-card
    class="custom-card"
    
    v-for="item in categories"
    :key="item.name"
    
    
  ><a :href="item.url" class="card-link">
    <v-img
      class="card-img"
      :src="item.img"
      height="150px"
    ></v-img>
  
    <v-card-title
      class="card-name"
    >
      {{item.name | lengthLimiter | nameLength}}
    </v-card-title>

    <v-card-subtitle class="cards-description"
    >
      {{ item.description}}...
    </v-card-subtitle>
    
    <v-container class="cards-bottom">
      <p class="publication-date">{{ item.date | dateLength }}</p>
      <a :href="item.url" class="read-more" >Read more</a>
      </v-container>
    
  </a>
    

    <!-- <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions> -->

    <!-- <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ item }}
        </v-card-text>
      </div>
    </v-expand-transition> -->
  </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Articles',
  data: () => ({
      show: false,
  }),
  computed: {
    ...mapState(['categories'])
  },
  filters: {
  lengthLimiter: function (value) {
    console.log(value)
    if (!value) return ''
    value = value.toString()
    return value.split(':')[0]
    },
    dateLength: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.slice(0,10)
    },
    nameLength: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.slice(0,68)
    }
  },
  methods:{
    ...mapActions({
        getNews: 'GET_TRENDING_NEWS'
        }),
    
  },
  mounted () {
   this.getNews()
  }
}
</script>

<style scoped>
 
.card-link{
  text-decoration: none;
  color:black;
  overflow: hidden;
}

  .card-name{
    font-size: 16px;
    line-height: 1.5;
  }
  .card-img{
    display: block;
  }
  .custom-card{
    display: inline-flex;
    margin: 12px;
    width:300px;
    height:380px;
  }
  .custom-card:first-child{
    display: block;
    width: 99%  !important;
    height: 300px;
    margin-bottom: 30px;
    padding-bottom: 0;
  }
  .custom-card:nth-child(3n+1) {
    margin-right: 0;
  }
  .publication-date{
    margin-left: 5px;
    font-size: 16px;
    color:rgba(77, 77, 77, 0.917)
  }
  .cards-bottom{
    display: inline-flex;
    justify-content: space-between;
    top: 87%;
    left: 0;
    position: absolute;
    margin-top: 2px;
    padding-bottom: 0;
  }
  .cards-description{
    margin-bottom: 5px;
    padding-bottom: 0;
    
  
  }
  .read-more{
    text-decoration: none;
    color: black;
  }
  .read-more:hover{
    color:darkblue
  }
</style>