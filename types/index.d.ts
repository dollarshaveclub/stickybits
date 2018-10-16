export default function stickybits(
  target: string | Element | Element[],
  options?: StickyBits.Options,
): StickyBits

export interface StickyBits {
  cleanup: () => void
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
    verticalPosition?: 'top' | 'bottom'
    useFixed?: boolean
  }
}
