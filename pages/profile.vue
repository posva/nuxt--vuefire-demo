<script lang="ts" setup>
import { signOut } from 'firebase/auth'
definePageMeta({
  middleware: 'authenticated',
})

const auth = useFirebaseAuth()! // only exists on client side
const user = useCurrentUser()
</script>

<template>
  <h2>👋 {{ user?.displayName }}</h2>

  <section>
    <img
      class="avatar"
      v-if="user?.photoURL"
      :src="user?.photoURL"
      referrerpolicy="no-referrer"
    />

    <br />

    <strong
      >{{ user?.isAnonymous ? '🥸' : '' }} {{ user?.displayName }}.</strong
    >

    <br />

    <p>Here is your login provider data:</p>

    <pre><code>{{ user?.providerData }}</code></pre>
  </section>

  <button @click="signOut(auth)">Logout</button>
</template>
