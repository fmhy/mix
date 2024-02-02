import { visit } from 'unist-util-visit'
import type { Node } from 'unist'

export interface Section {
  heading: string
  items: {
    title: string
    url: string
  }[]
}

export function parseSections() {
  const sections: Section[] = []
  let currentHeading = ''
  let currentList = []

  const transformer = (tree: Node) => {
    visit(tree, 'heading', (node) => {
      if (currentHeading && currentList.length > 0) {
        sections.push({ heading: currentHeading, items: currentList })
        currentList = []
      }
      currentHeading = node.children[0].value
    })
  }
  return transformer
}
