<template>
  <h2>Daily Counter</h2>

  <p>
    This page is rendered on the server with
    <a href="https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering"
      >SWR</a
    >. Try incrementing the counter and immediately reload the page, you might
    notice it shows an older count. This is because the cached page was served
    while an updated version was being computed.
  </p>

  <DailyCounter />
</template>
