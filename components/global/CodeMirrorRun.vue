<template>
  <div class="relative w-full rounded-lg rounded-md border border-solid  dark:border-gray-700">
    <div class="grid w-full" 
    :class="{'grid-cols-2':!$props.showInCol, 'gap-x-2':!$props.showInCol,
             'grid-cols-1':$props.showInCol, 'gap-y-0':$props.showInCol}">
      <div class="card h-full" :class="{'border-r':!$props.showInCol, 'rounded-sm':$props.showInCol, 'border-b':$props.showInCol}">
        <div class="card-header">
          <button class="btn cursor-default font-semibold">
              源代码：
          </button>
          <button class="btn" @click="copyCodeToClipboard">
              复制
          </button>
          <button @click="executeCode" 
          class="btn float-right"
          :class="{'btn-success': pyodideStore.initialized, 'btn-initializing': !pyodideStore.initialized}">
              {{ pyodideStore.initialized ? '运行代码' : '解释器初始化中'}}
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
            style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;"
            theme={githubLight}
            :style="{'max-height': props.maxHeight}"
          />
      </div>
      <div class="card" :class="{'border-l':!$props.showInCol, 'rounded-sm':$props.showInCol}">
        <div class="card-header">
          <button class="btn cursor-default font-semibold">
            运行结果：
          </button>
        </div>
        <div class="py-4 px-4 bg-transparent overflow-x-auto w-full"
             :style="{'max-height': props.maxHeight}">
          <client-only>
            <div class="text-xs leading-4 m-0 whitespace-pre font-mono">{{ execReturn }}</div>
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
const extensions = ref([python(),githubLight,githubDark])

const pyodideStore = usePyodideStore();

const slots = useSlots();

const props = defineProps({
  editable: {
    type: Boolean,
    default: true
  },
  maxHeight: {
    type: String,
    default: '20rem',
  },
  showInCol: {
    type: Boolean,
    default: false
  }
})
 
// Initial code
const code = ref(slots.default()[0].props.code)
console.log(slots.default()[0].props)
const execReturn = ref('\n')

watch(
   colorMode,
  () => {
    extensions.value = colorMode.value === 'dark' ? [python(), githubDark] : [python(),githubLight]
  },
  { immediate: true }
)

const executeCode = async () => {
  pyodideStore.isRunningPython = true
  try {
    await pyodideStore.runPython(code.value)
    execReturn.value = await pyodideStore.runPython("sys.stdout.getvalue()");
    console.log(execReturn)
  } catch (jsError) {
    execReturn.value = await pyodideStore.runPython("sys.stdout.getvalue()");
    console.log(execReturn)
  }
  pyodideStore.isRunningPython = false
}

// 定义复制代码的函数
const copyCodeToClipboard = () => {
  // 将 code 的值复制到剪贴板
  navigator.clipboard.writeText(code.value)
}
</script>

<style>
.btn {
  @apply px-2 py-1.5 rounded-md text-sm focus:outline-none
}
.btn-success {
  background-color: var(--color-primary);
  color: white;
}
.btn-initializing {
  @apply border cursor-not-allowed
}
/* .btn {
@apply px-4 py-2  text-sm font-medium transition-colors duration-150;
} */

/* .btn-outline-secondary {
@apply border border-gray-300 text-gray-700 hover:bg-gray-100;
} */

.card {
  @apply rounded-md border-solid dark:border-gray-700 bg-[--pre-bg]
}

.card-header {
  @apply px-2 py-2 border-b border-gray-200 dark:border-gray-700 bg-[--bg]
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

.cm-line{
  line-height: 1.5;
}
</style>