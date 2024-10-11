<template>
  <div class="relative w-full rounded-lg rounded-md border border-solid  dark:border-gray-700">
    <div class="flex space-x-2 w-full">
      <div class="card h-full border-r">
        <div class="card-header">
          <button class="btn cursor-default font-semibold">
              源代码：
          </button>
          <button class="btn">
              复制
          </button>
          <button @click="runCode" class="btn btn-success float-right">
              点击运行
          </button>
        </div>
          <Codemirror
            ref="codemirror"
            v-model="code"
            :extensions="extensions"
            placeholder="在这输入代码，Enter your code here..."
            :disabled="!props.editable"
            :basic-setup="true"
            :indent-with-tab="true"
            style="height: 100%;font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;"
            theme={githubLight}
            :style="{'max-height': props.maxHeight}"
          />
      </div>
      <div class="card border-l">
        <div class="card-header">
          <button class="btn cursor-default font-semibold">
            运行结果：
          </button>
        </div>
        <div class="py-2 px-4 overflow-auto bg-transparent"
             :style="{'max-height': props.maxHeight}">
          <client-only>
            <span>hello{{ result }}</span>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { python } from '@codemirror/lang-python';
import { Codemirror } from 'vue-codemirror';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
const colorMode = useColorMode()
const slots = useSlots();

const props = defineProps({
  editable: {
    type: Boolean,
    default: true
  },
  maxHeight: {
    type: String,
    default: '24rem',
  },
})
 
// Initial code
const code = ref(slots.default()[0].props.code)
const extensions = ref([python(),githubLight,githubDark])

watch(
   colorMode,
  () => {
    extensions.value = colorMode.value === 'dark' ? [python(), githubDark] : [python(),githubLight]
    console.log(colorMode)
  },
  { immediate: true}
)
</script>

<style>
.btn {
  @apply py-1.5 px-3 rounded-md
}
.btn-success {
background-color: var(--color-primary);
color: white;
}
/* .btn {
@apply px-4 py-2  text-sm font-medium transition-colors duration-150;
} */

/* .btn-outline-secondary {
@apply border border-gray-300 text-gray-700 hover:bg-gray-100;
} */

.card {
  @apply w-1/2 rounded-md border-solid dark:border-gray-700
}

.card-header {
  @apply px-2 py-2 border-b border-gray-200 dark:border-gray-700
}

.btn-outline-dark {
@apply border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white;
}

.btn-success {
@apply bg-green-500 text-white hover:bg-green-600;
}

.btn-warning {
@apply bg-yellow-500 text-white hover:bg-yellow-600;
}

.code-editor {
height: 400px;
}
</style>