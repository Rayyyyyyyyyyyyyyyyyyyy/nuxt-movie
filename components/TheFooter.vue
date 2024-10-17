<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
let availableLocales = [];
if (process.client) {
  availableLocales = locales.value;
}

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
      <NuxtLink
        class="mr-4"
        target="_blank"
        to="https://github.com/Rayyyyyyyyyyyyyyyyyyyy/nuxt-init/tree/dev"
      >
        <nuxt-icon name="github" filled />
      </NuxtLink>

      <NuxtLink target="_blank" to="https://docs.netlify.com">
        <nuxt-icon name="netlify" filled />
      </NuxtLink>

      <div class="lang" v-if="availableLocales.length > 0">
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

  @media screen and (max-width: 450px) {
    @apply h-auto;
  }

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

      @media screen and (max-width: 450px) {
        @apply ml-0;
      }

      .lang-sel {
        @apply w-48 ml-4;
      }
    }
  }
}
</style>
