<script lang="ts">
import { GoogleAuthProvider } from 'firebase/auth'
export const googleAuthProvider = new GoogleAuthProvider()
</script>

<script lang="ts" setup>
import {
  signInAnonymously,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  useCurrentUser,
  useFirebaseAuth,
  useIsCurrentUserLoaded,
} from 'vuefire'

const auth = useFirebaseAuth()! // only exists on client side
const route = useRoute()
const isUserLoaded = useIsCurrentUserLoaded()
// display errors if any
const error = ref<Error | null>(null)

function signinPopup() {
  error.value = null
  signInWithPopup(auth, googleAuthProvider).catch((reason) => {
    console.error('Failed signinPopup', reason)
    error.value = reason
  })
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user && !route.query.redirect) {
      navigateTo('/profile')
    }
  })
})
</script>

<template>
  <main>
    <h2>Login</h2>

    <p>Choose a login method:</p>

    <ClientOnly>
      <p v-if="!isUserLoaded">Loading...</p>
    </ClientOnly>

    <ErrorBox v-if="error" :error="error" />

    <!-- We were redirected from a page that required auth -->
    <div v-else-if="route.query.redirect" class="message-box">
      <p>
        Please login to access <code>{{ route.query.redirect }}</code
        >.
      </p>
    </div>

    <button @click="signinPopup()">SignIn with Google</button>
    <button @click="signInAnonymously(auth)">SignIn Anonymously</button>
  </main>
</template>

<style scoped>
.avatar {
  padding: 1em 0;
}

main > button:not(:last-of-type(button)) {
  margin-right: 1em;
}
</style>
