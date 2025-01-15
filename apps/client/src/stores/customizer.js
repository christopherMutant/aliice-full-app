import { defineStore } from 'pinia'
import { ref } from 'vue'
const useCustomizerStore = defineStore('customizer', () => {
  const Sidebar_drawer = ref(true)
  const mini_sidebar = ref(false)
  const actTheme = ref('light')
  const fontTheme = ref('PublicSansBold')

  const SET_SIDEBAR_DRAWER = () => {
    Sidebar_drawer.value = !Sidebar_drawer.value
  }
  const SET_MINI_SIDEBAR = (payload) => {
    mini_sidebar.value = payload
  }
  const SET_THEME = (payload) => {
    actTheme.value = payload
  }
  const SET_FONT = (payload) => {
    fontTheme.value = payload
  }
  return {
    Sidebar_drawer,
    mini_sidebar,
    actTheme,
    fontTheme,
    SET_SIDEBAR_DRAWER,
    SET_MINI_SIDEBAR,
    SET_THEME,
    SET_FONT,
  }
})

export default useCustomizerStore
