import AOS from "aos";
import "aos/dist/aos.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", () => {
    if (nuxtApp.$isClient) {
      AOS.init({
        // 自定义选项
        delay: 200,
        duration: 1000,
        once: true, // 是否只执行一次动画
      });
    }
  });
  nuxtApp.hook("page:finish", () => {
    if (nuxtApp.$isClient) {
      AOS.refresh();
    }
  });
});
