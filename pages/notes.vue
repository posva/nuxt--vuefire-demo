<script lang="ts" setup>
import {
  addDoc,
  serverTimestamp,
  collection,
  limit,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore'

const user = useCurrentUser()
const db = useFirestore()

definePageMeta({
  // only authenticated users can access this page
  middleware: ['authenticated'],
})

const content = useLocalStorage('note-content', '')

const lastNotes = useCollection<{ content: string; createdAt: Timestamp }>(
  query(
    collection(db, 'users', user.value!.uid, 'notes'),
    orderBy('createdAt', 'desc'),
    limit(5)
  ),
  { ssrKey: 'last-notes' }
)

const {
  execute: createNote,
  isLoading: isCreatingNote,
  error,
  // this gives us a loading state while the note is being created
} = useAsyncState(
  () => {
    // avoid empty posts that will fail on Firestore anyway
    if (!content.value || !user.value) {
      return Promise.reject(new Error('Invalid post'))
    }

    return addDoc(collection(db, 'users', user.value.uid, 'notes'), {
      content: content.value,
      createdAt: serverTimestamp(),
    }).then(() => {
      // reset the post content if successful
      content.value = ''
    })
  },
  null,
  // avoid executing the function on mount
  { immediate: false }
)
</script>

<template>
  <main>
    <h2>Create a new Note</h2>

    <p>These notes can only be viewed by yourself.</p>

    <ErrorBox v-if="error" :error="error" />

    <form @submit.prevent="createNote()">
      <fieldset :disabled="isCreatingNote">
        <MyTextarea
          id="content"
          placeholder="The other day I was..."
          v-model="content"
          :maxlength="512"
          required
          @keypress.enter.meta.exact="createNote()"
          @keypress.enter.ctrl.exact="createNote()"
        />

        <input type="submit" value="Save Note" />
      </fieldset>
    </form>

    <section>
      <h3>Last Notes</h3>
      <ul v-if="lastNotes">
        <li v-for="note in lastNotes" :key="note.id">
          <span
            >{{ note.content }} - {{ note.createdAt.toDate().toISOString() }}
          </span>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
fieldset {
  border: none;
}
</style>
