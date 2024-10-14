import { defineConfig ,presetUno} from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
export default defineConfig({
   presets: [
    presetUno({
      variablePrefix: 'root-'
     }),
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme:{
    colors:{

    }
  },
})