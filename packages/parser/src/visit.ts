import { select } from 'unist-util-select'
import type { Node } from 'unist'

export interface Section {
  heading: string
  items: {
    title: string
    url: string
  }[]
}

export function extractSections(ast: any): Section[] {
  const sections: Section[] = []

  let currentSection: Section | null = null

  ast.children.forEach((node: Node) => {
    if (node.type === 'heading') {
      currentSection = {
        heading: node.children![0].value as string,
        items: []
      }
      sections.push(currentSection)
    } else if (currentSection && node.type === 'list') {
      extractItems(node, currentSection.items)
    }
  })

  return sections
}

export function extractItems(
  node: any,
  items: { title: string; url: string }[]
): void {
  node.children.forEach((li: any) => {
    const linkNode = select('link', li)
    if (linkNode) {
      const title = linkNode.children[0].value as string
      const url = linkNode.url as string
      items.push({ title, url })
    }
  })
}
