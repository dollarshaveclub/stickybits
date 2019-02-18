export default function stickybits(
  target: string | Element | Element[],
  options?: StickyBits.Options,
): StickyBits

export interface StickyBits {
  els: Element[]
  instances: StickyBits.Instance[]

  props: StickyBits.Options
  userAgent: string
  version: string

  cleanup: () => void
  update: (props?: StickyBits.Options) => void
}

export namespace StickyBits {
  export interface Options {
    customStickyChangeNumber?: number | null
    noStyles?: boolean
    stickyBitStickyOffset?: number
    parentClass?: string
    scrollEl?: Element | string
    stickyClass?: string
    stuckClass?: string
    stickyChangeClass?: string
    useStickyClasses?: boolean
    useFixed?: boolean
    useGetBoundingClientRect?: boolean
    verticalPosition?: 'top' | 'bottom'
  }

  export interface Instance {
    el: Element
    parent: Element
    props: StickyBits.Options
  }
}
