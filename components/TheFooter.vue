<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();

const availableLocales = computed(() => {
  return locales.value;
});
const updateLocale = (value) => {
  setLocale(value);
  window.location.reload();
};
</script>

<template>
  <div class="footer-wrapper">
    <el-row align="middle">
      <img
        class="footer-wrapper_logo-movie"
        src="@/assets/images/movies.png"
        alt=""
      />
      <p class="text-xl">Nuxt Movies</p>
    </el-row>

    <el-row align="middle">
      <p class="footer-text-sm">Made with</p>
      <a
        href="https://nuxt.com/"
        target="_blank"
        title="Nuxt 3"
        class="footer-wrapper_logo"
      >
        <nuxt-icon name="IconNuxt3" filled />
      </a>
    </el-row>

    <el-row align="middle">
      <p class="footer-text-sm">Data provided by</p>
      <a
        target="_blank"
        href="https://www.themoviedb.org/"
        title="The Movie Database"
        rel="noopener"
        class="footer-wrapper_logo"
      >
        <nuxt-icon name="IconTMDB" filled />
      </a>
    </el-row>

    <el-row align="middle">
      <p class="footer-text-sm">
        This project uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </el-row>

    <el-row align="middle" class="footer-link">
      <a
        target="_blank"
        href="https://github.com/Rayyyyyyyyyyyyyyyyyyyy?tab=repositories"
        title="github"
        class="mr-4"
      >
        <nuxt-icon name="github" filled />
      </a>

      <a target="_blank" href="https://docs.netlify.com/" title="netlify">
        <nuxt-icon name="netlify" filled />
      </a>

      <div class="lang">
        <p>Language:</p>
        <el-select @change="updateLocale" v-model="locale" class="lang-sel">
          <el-option
            v-for="(loc, ind) in availableLocales"
            :key="ind"
            :label="loc.name"
            :value="loc.code"
          >
          </el-option>
        </el-select>
      </div>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.footer-wrapper {
  @apply w-full p-10 bg-black h-72;
  @apply flex flex-col items-start;
  @apply text-white;

  .footer-text-sm {
    @apply text-sm text-white/40 leading-10;
  }

  &_logo {
    @apply ml-4;

    &-movie {
      @apply mr-4;
      @apply w-6 h-6;
    }

    ::v-deep() {
      .nuxt-icon svg {
        @apply w-20 h-10;
      }
    }
  }
  .footer-link {
    @apply mt-4;

    ::v-deep() {
      .nuxt-icon svg {
        @apply text-xl;
      }
    }
    .lang {
      @apply ml-4;
      @apply flex items-center;

      .lang-sel {
        @apply w-48 ml-4;
      }
    }
  }
}
</style>
