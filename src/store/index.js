import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loader: false,
    
  },
  mutations: {
    SET_PROPERTY: (state, payload) => {
      Vue.set(payload.object, payload.propertyName, payload.value)
    },
    LOADER:(state,payload) => {
      state.loader=payload
    }
  },
  actions: {
    async GET_TRENDING_NEWS(context) {
      context.commit('LOADER', true)
      const { value: data } = await (await fetch("https://bing-news-search1.p.rapidapi.com/news/trendingtopics?safeSearch=Off&textFormat=Raw", {
        "method": "GET",
        "headers": {
          "x-bingapis-sdk": "true",
          "x-rapidapi-key": "e9ca6f3dd3msh6702b60fe970ca0p16a9f0jsn2e2f896db587",
          "x-rapidapi-host": "bing-news-search1.p.rapidapi.com"
        }
      })).json()

      const trending = data.map((item) => {
        return { name: item.name, url: item.webSearchUrl}
      })
      console.log(context, 'trending', trending)

      context.commit('SET_PROPERTY', {
        object: context.state,
        propertyName: 'trending',
        value: trending
      })
      console.log(context.state.trending)
      context.commit('LOADER', false)
    },

    async GET_CATEGORIES(context) {
      context.commit('LOADER', true)
      const { value: data } = await (await fetch("https://bing-news-search1.p.rapidapi.com/news?textFormat=Raw&safeSearch=Off", {
        "method": "GET",
        "headers": {
          "x-bingapis-sdk": "true",
          "x-rapidapi-key": "e9ca6f3dd3msh6702b60fe970ca0p16a9f0jsn2e2f896db587",
          "x-rapidapi-host": "bing-news-search1.p.rapidapi.com"
        }
      })).json()
      const categories = data.map((item,index) => {
        console.log(index)
        return { 
          name: item.name,
          url: item.url,
          img: item.image?.thumbnail.contentUrl ?? 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg',
          description: item.description,
          date: item.datePublished
        }
      })
      console.log(context, 'categories', categories)

      context.commit('SET_PROPERTY', {
        object: context.state,
        propertyName: 'categories',
        value: categories
      })
      
      context.commit('LOADER', false)
    }
  },

  modules: {
  }
})
