<script lang="ts" setup>
const renderedAt = useState('render-date', () => new Date())
</script>

<template>
  <main>
    <h2>Welcome!</h2>

    <p>
      Hey there, check out this cool demo powered by VueFire and Nuxt! We've got
      a bunch of demos to explore up there, including the awesome
      <NuxtLink to="/counter">Daily Counter</NuxtLink>. One cool thing to notice
      is that some pages are pre-rendered (just like this one), while others
      aren't. This is all about showing off the various rendering modes of Nuxt.
      If you want a complete example with other Firebase Services like Storage
      and Realtime Database, check out
      <a href="https://vuefire.vuejs.org/nuxt/deployment.html#Deployment"
        >the VueFire Documentation</a
      >.
    </p>

    <p>
      Check out
      <a href="https://vuefire.vuejs.org" target="_blank">VueFire docs</a> or
      click the Logos above to learn more
    </p>

    <p>
      This page was rendered during generation
      <ClientOnly>
        <time :datetime="renderedAt.toISOString()">{{
          renderedAt.toString()
        }}</time>
        <template #fallback>...</template>
      </ClientOnly>
    </p>
  </main>
</template>
