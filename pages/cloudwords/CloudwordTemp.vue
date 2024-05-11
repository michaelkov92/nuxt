<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import VueWordCloud from 'vuewordcloud'
import type { WordSetItemDTO, WordSetParsed, CloudWord } from '@/data/clouds'
import { getWordCloud } from '@/data/clouds'
// const cloudwordSlug = useRoute().params.cloudword
const data = ref()
const parsedWords = ref<WordSetParsed[]>([])
const filteredWords = ref<CloudWord[]>([])
const loading = ref(false)
const { data: words } = await useFetch<WordSetItemDTO[]>(getWordCloud())
data.value = words
console.log(words.value)
parsedWords.value = parse(words.value)

const uniqueConcepts = new Set<string>()
filteredWords.value = []
parsedWords.value.forEach((item: WordSetParsed) => {
  uniqueConcepts.add(item.entityConcept)
  // filteredWords.value.push({
  //   cloudValue: item.cloudValue,
  //   concept: item.entityConcept
  // })
  filteredWords.value.push(item.cloudValue)
})
console.log(filteredWords.value)
function parse(wordItems: WordSetItemDTO[]) {
  if (!wordItems.length) {
    return []
  }
  return wordItems.reduce((acc: Array<WordSetParsed>, curr: WordSetItemDTO) => {
    const parsedItem: WordSetParsed = {
      entityId: '',
      entityTitle: '',
      entityConcept: '',
      count: 0,
      cloudValue: []
    }
    curr.values.forEach((field) => {
      if (field.key === 'entityId') {
        parsedItem.entityId = field.value
      } else if (field.key === 'entityTitle') {
        parsedItem.entityTitle = field.value
      } else if (field.key === 'entityConcept') {
        parsedItem.entityConcept = field.value.split('#')[1]
      } else if (field.key === 'count') {
        parsedItem.count = +field.value
      }
    })
    parsedItem.cloudValue = [parsedItem.entityTitle, parsedItem.count]
    acc.push(parsedItem)
    return acc
  }, [])
}

const getColorByWeight = (value: Array<number | string>) => {
  const weight = +value[1]
  const colorScale = ['#FF5733', '#FFC300', '#6a9972', '#33AFFF', '#A633FF']
  const index = Math.floor(weight + 10 / 100)
  return colorScale[index % colorScale.length]
}
const updateHandler = (e: any) => {
  if (e.length) {
    loading.value = false
  }
}
// :color="(value: Array<number | string>) => getColorByWeight(value)"
</script>
<template>
  <div class="word-cloud-wrapper">
    <!-- <div v-if="loading">
      loading ...
      <ProgressSpinner class="spinner" />
    </div> -->
    <vue-word-cloud v-if="filteredWords && filteredWords?.length" :words="filteredWords" font-family="Roboto"
      @update:cloud-words="updateHandler">
      <template #default="{ text, weight }">
        {{ text }}, {{ weight }}
      </template>
    </vue-word-cloud>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/colors.scss';

.word-cloud-wrapper {
  height: 100%;
  width: 100%;
}
</style>
