import { VDateInput } from 'vuetify/labs/VDateInput'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const light = {
  dark: false,
  variables: {
    'border-color': '#f0f0f0',
    'carousel-control-size': 10,
    gradient:
      'linear-gradient(250.38deg, #e6f4ff 2.39%, #69b1ff 34.42%, #1677ff 60.95%, #0958d9 84.83%, #002c8c 104.37%)',
    gradient2: 'linear-gradient(to right, rgb(9, 89, 218), rgb(22, 119, 255))',
    'card-shadow': '0px 1px 4px rgba(0, 0, 0, 0.08)',
    'medium-opacity': 0.85,
    'high-opacity': 1,
  },
  colors: {
    primary: '#2570C1',
    secondary: '#B7B3B4',
    info: '#f7c687',
    success: '#52c41a',
    accent: '#FFAB91',
    warning: '#faad14',
    error: '#ff4d4f',
    lightprimary: '#94beea',
    lightsecondary: '#c1bebe',
    lightInfo: '#f7c687',
    lightsuccess: '#EAFCD4',
    lighterror: '#FFE7D3',
    lightwarning: '#FFF6D0',
    darkText: '#212121',
    lightText: '#8c8c8c',
    darkprimary: '#2570C1',
    darksecondary: '#7a7878',
    darkInfo: '#a7620b',
    borderLight: '#e6ebf1',
    inputBorder: '#a1a1a5',
    containerBg: '#fafafb',
    surface: '#fff',
    'on-surface-variant': '#fff',
    facebook: '#4267b2',
    twitter: '#1da1f2',
    linkedin: '#0e76a8',
    gray100: '#f5f5f5',
    primary200: '#a1d2ff',
    secondary200: '#eeeeee',
  },
}

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light,
    },
  },
  components: {
    ...components,
    VDateInput,
  },
  directives,
  display: {
    mobileBreakpoint: 769,
  },
  defaults: {
    VBtn: {},
    VCard: {
      rounded: 'md',
    },
    VTextField: {
      rounded: 'lg',
    },
    VTooltip: {
      // set v-tooltip default location to top
      location: 'top',
    },
  },
})

export default vuetify
