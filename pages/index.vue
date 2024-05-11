<script setup lang="ts">
import { getPostsUrl } from '@/data/posts'
import type { Post } from '@/data/posts'
const { data: posts } = await useFetch<Array<Post>>(getPostsUrl())
console.log(posts)
</script>
<template>
  <div>
    <h1>Nuxt.js Examples</h1>
    <div>
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>
