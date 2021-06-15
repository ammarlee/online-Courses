// import Vue from "vue";
// import Vuetify from "vuetify/lib";

// Vue.use(Vuetify);

// export default new Vuetify({});


import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            // #0C213A
            primary: '#0C213A',
            secondary: '#424242',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
                    },
          dark: {
            primary: '#0C213A',
            secondary: colors.grey.darken1,
            accent: colors.shades.black,
            error: colors.red.accent3,
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
          },
        
        },
      },
});
