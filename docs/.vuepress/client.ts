import { defineClientConfig } from 'vuepress/client'
import CHComponentsWeb from 'ch-components-web'

export default defineClientConfig({
  enhance({ app }) {
    app.use(CHComponentsWeb)
  },
}) 