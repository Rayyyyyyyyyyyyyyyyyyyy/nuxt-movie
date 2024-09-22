/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#409eff",
          light: "#adcdee",
          dark: "#3560f0",
          ccPerson: "#0A7FE6",
          focusBorder: "#409eff",
        },
        secondary: {
          DEFAULT: "#E9EDF0",
          light: "#F6F6F6",
          dark: "#707070",
          borderColor: "#dcdfe6",
        },
        success: {
          DEFAULT: "#8FC69A",
          light: "#52c41a",
        },
        hr: "#ebedf0",
        red: {
          DEFAULT: "#ff0000",
          require: "#f56c6c",
        },
        bg: {
          DEFAULT: "#F5F3F4",
          asideMenu: "#304156",
          asideSubMenu: "#404f62",
          light: "#f0f0f0",
          tree: "#f3f3f3",
          cardHeader: "#576994",
          messagePop: "#d6e0ff",
          smallHr: "#d9d9d9",
          tableActive: "#e6f5ff",
          tableHigh: "#E4E9F2",
        },
        text: {
          DEFAULT: "#000",
          menuText: "#fff",
          light: "#e0e4ef",
          breadcrumb: "#97a8be",
          tabText: "#303133",
          list: "#838383",
          remark: "#00000080",
          labelText: "#606266",
          subLabel: "#a8abb2",
        },
        warning: {
          DEFAULT: "#e2ab00",
          dark: "#FFB96F",
          light: "#FFF3CC",
          orange: "#FC7B41",
          warningText: "#e6a23c",
        },
        menu: {
          hoverBG: "#263445",
          subMenuBg: "#1f2d3d",
          subMenuHover: "#001528",
          collapseMenuActiveBg: "#1f2d3d",
          arrowColor: "#909399",
          headerHoverBg: "#f5f5f5",
        },
      },
    },
  },
  plugins: [],
};
