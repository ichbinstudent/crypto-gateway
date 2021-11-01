import Vue from 'vue'
import { Marked, Renderer } from '@ts-stack/markdown'

Vue.filter('markdown', (value: string) => {
  if (!value) {
    return ''
  }

  let renderer = new Renderer()
  renderer.link = function (href: string, title: string, text: string) {
    let link = Renderer.prototype.link.apply(this, [href, title, text])
    return link.replace('<a', '<a target="_blank" rel="noopener noreferrer"')
  }

  Marked.setOptions({ renderer: renderer })
  return Marked.parse(value)
})
