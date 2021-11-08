/**
 * --------------------------------------------
 * AdminLTE control-sidebar.ts
 * License MIT
 * --------------------------------------------
 */

import {
  domReady
} from './util/index'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const CLASS_NAME_CONTROL_SIDEBAR_INIT = 'control-sidebar-init'
const CLASS_NAME_CONTROL_SIDEBAR_MINI = 'control-sidebar-mini'
const CLASS_NAME_CONTROL_SIDEBAR_MINI_HAD = 'control-sidebar-mini-had'
// const CLASS_NAME_CONTROL_SIDEBAR_HORIZONTAL = 'sidebar-horizontal'
const CLASS_NAME_CONTROL_SIDEBAR_COLLAPSE = 'control-sidebar-collapse'
const CLASS_NAME_CONTROL_SIDEBAR_CLOSE = 'control-sidebar-close'
const CLASS_NAME_CONTROL_SIDEBAR_OPEN = 'control-sidebar-open'
const CLASS_NAME_CONTROL_SIDEBAR_COLLAPSING = 'control-sidebar-is-collapsing'
// const CLASS_NAME_CONTROL_SIDEBAR_CLOSING = 'control-sidebar-is-closing'
const CLASS_NAME_CONTROL_SIDEBAR_OPENING = 'control-sidebar-is-opening'
// const CLASS_NAME_CONTROL_SIDEBAR_IS_HOVER = 'sidebar-is-hover'
const CLASS_NAME_LAYOUT_MOBILE = 'layout-mobile'

const SELECTOR_CONTROL_SIDEBAR_INIT = `.${CLASS_NAME_CONTROL_SIDEBAR_INIT}`
const SELECTOR_CONTROL_SIDEBAR = '.control-sidebar'
// const SELECTOR_NAV_SIDEBAR = '.nav-sidebar'
// const SELECTOR_NAV_ITEM = '.nav-item'
// const SELECTOR_NAV_TREEVIEW = '.nav-treeview'
const SELECTOR_MINI_TOGGLE = '[data-lte-toggle="control-sidebar-mini"]'
const SELECTOR_FULL_TOGGLE = '[data-lte-toggle="control-sidebar-full"]'
const SELECTOR_CONTROL_SIDEBAR_SM = `.${CLASS_NAME_LAYOUT_MOBILE}`
const SELECTOR_CONTENT_WRAPPER = '.content-wrapper'

const Defaults = {
  onLayoutMobile: 992
}

/**
 * Class Definition
 * ====================================================
 */

class ControlSidebar {
  _element: HTMLElement | null
  _config: null
  _bodyClass: DOMTokenList
  constructor(element: HTMLElement | null, config: null) {
    this._element = element

    const bodyElement = document.body as HTMLBodyElement
    this._bodyClass = bodyElement.classList

    this._config = config
  }

  sidebarOpening(): void {
    this._bodyClass.add(CLASS_NAME_CONTROL_SIDEBAR_OPENING)
    setTimeout(() => {
      this._bodyClass.remove(CLASS_NAME_CONTROL_SIDEBAR_OPENING)
    }, 1000)
  }

  sidebarColllapsing(): void {
    this._bodyClass.add(CLASS_NAME_CONTROL_SIDEBAR_COLLAPSING)
    setTimeout(() => {
      this._bodyClass.remove(CLASS_NAME_CONTROL_SIDEBAR_COLLAPSING)
    }, 1000)
  }

  // menusClose(): void {
  //   const navTreeview = document.querySelectorAll<HTMLElement>(SELECTOR_NAV_TREEVIEW)
  //
  //   for (const navTree of navTreeview) {
  //     navTree.style.removeProperty('display')
  //     navTree.style.removeProperty('height')
  //   }
  //
  //   const navSidebar = document.querySelector(SELECTOR_NAV_SIDEBAR)
  //   const navItem = navSidebar?.querySelectorAll(SELECTOR_NAV_ITEM)
  //
  //   if (navItem) {
  //     for (const navI of navItem) {
  //       navI.classList.remove(CLASS_NAME_MENU_OPEN)
  //     }
  //   }
  // }

  expand(): void {
    this.sidebarOpening()

    this._bodyClass.remove(CLASS_NAME_CONTROL_SIDEBAR_CLOSE)
    this._bodyClass.remove(CLASS_NAME_CONTROL_SIDEBAR_COLLAPSE)
    this._bodyClass.add(CLASS_NAME_CONTROL_SIDEBAR_OPEN)
  }

  collapse(): void {
    this.sidebarColllapsing()

    this._bodyClass.add(CLASS_NAME_CONTROL_SIDEBAR_COLLAPSE)
  }

  close(): void {
    this._bodyClass.add(CLASS_NAME_CONTROL_SIDEBAR_CLOSE)
    this._bodyClass.remove(CLASS_NAME_CONTROL_SIDEBAR_OPEN)
    // this._bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSE)

    // if (this._bodyClass.contains(CLASS_NAME_SIDEBAR_HORIZONTAL)) {
    //   this.menusClose()
    // }
  }

  // sidebarHover(): void {
  //   const selSidebar = document.querySelector(SELECTOR_SIDEBAR)
  //
  //   if (selSidebar) {
  //     selSidebar.addEventListener('mouseover', () => {
  //       this._bodyClass.add(CLASS_NAME_SIDEBAR_IS_HOVER)
  //     })
  //
  //     selSidebar.addEventListener('mouseout', () => {
  //       this._bodyClass.remove(CLASS_NAME_SIDEBAR_IS_HOVER)
  //     })
  //   }
  // }

  addSidebaBreakPoint(): void {
    const bodyClass = document.body.classList
    const widthOutput = window.innerWidth

    if (widthOutput < Defaults.onLayoutMobile) {
      bodyClass.add(CLASS_NAME_LAYOUT_MOBILE)
    }

    if (widthOutput >= Defaults.onLayoutMobile) {
      bodyClass.remove(CLASS_NAME_LAYOUT_MOBILE)
      if (!this._bodyClass.contains(CLASS_NAME_CONTROL_SIDEBAR_CLOSE) &&
        !this._bodyClass.contains(CLASS_NAME_CONTROL_SIDEBAR_COLLAPSE)) {
        this.expand()
      }
    }
  }

  removeOverlaySidebar(): void {
    const bodyClass = document.body.classList
    if (bodyClass.contains(CLASS_NAME_LAYOUT_MOBILE)) {
      bodyClass.remove(CLASS_NAME_CONTROL_SIDEBAR_OPEN)
      bodyClass.remove(CLASS_NAME_CONTROL_SIDEBAR_COLLAPSE)
      bodyClass.add(CLASS_NAME_CONTROL_SIDEBAR_CLOSE)
    }
  }

  closeSidebar(): void {
    const widthOutput: number = window.innerWidth
    if (widthOutput < Defaults.onLayoutMobile) {
      document.body.classList.add(CLASS_NAME_CONTROL_SIDEBAR_CLOSE)
    }
  }

  toggleFull(): void {
    if (this._bodyClass.contains(CLASS_NAME_CONTROL_SIDEBAR_CLOSE)) {
      this.expand()
    } else {
      this.close()
    }

    if (this._bodyClass.contains(CLASS_NAME_CONTROL_SIDEBAR_MINI)) {
      this._bodyClass.remove(CLASS_NAME_CONTROL_SIDEBAR_MINI)
      this._bodyClass.add(CLASS_NAME_CONTROL_SIDEBAR_MINI_HAD)
    }
  }

  toggleMini(): void {
    if (this._bodyClass.contains(CLASS_NAME_CONTROL_SIDEBAR_MINI_HAD)) {
      this._bodyClass.remove(CLASS_NAME_CONTROL_SIDEBAR_MINI_HAD)
      this._bodyClass.add(CLASS_NAME_CONTROL_SIDEBAR_MINI)
    }

    if (this._bodyClass.contains(CLASS_NAME_CONTROL_SIDEBAR_COLLAPSE)) {
      this.expand()
    } else {
      this.collapse()
    }
  }

  init() {
    if (document.querySelector(SELECTOR_CONTROL_SIDEBAR_INIT)) {
      return
    }

    if (!document.querySelector(SELECTOR_CONTROL_SIDEBAR)) {
      return
    }

    this.addSidebaBreakPoint()
    // this.sidebarHover()

    const selSidebarSm = document.querySelector(SELECTOR_CONTROL_SIDEBAR_SM)
    const selContentWrapper = selSidebarSm?.querySelector(SELECTOR_CONTENT_WRAPPER)

    if (selContentWrapper) {
      selContentWrapper.addEventListener('touchstart', this.removeOverlaySidebar)
      selContentWrapper.addEventListener('click', this.removeOverlaySidebar)
    }

    this.closeSidebar()

    document.body.classList.add(SELECTOR_CONTROL_SIDEBAR_INIT)
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

domReady(() => {
  const data = new ControlSidebar(null, null)
  data.init()

  window.addEventListener('resize', () => {
    data.init()
  })

  const fullBtn = document.querySelectorAll(SELECTOR_FULL_TOGGLE)

  for (const btn of fullBtn) {
    btn.addEventListener('click', event => {
      event.preventDefault()

      let button = event.currentTarget as HTMLElement | null | undefined

      if (button?.dataset.lteToggle !== 'control-sidebar-full') {
        button = button?.closest(SELECTOR_FULL_TOGGLE)
      }

      if (button) {
        const data = new ControlSidebar(button, null)
        data.toggleFull()
      }
    })
  }

  const miniBtn = document.querySelectorAll(SELECTOR_MINI_TOGGLE)

  for (const btn of miniBtn) {
    btn.addEventListener('click', event => {
      event.preventDefault()

      let button = event.currentTarget as HTMLElement | null | undefined
      if (button?.dataset.lteToggle !== 'control-sidebar-mini') {
        button = button?.closest(SELECTOR_MINI_TOGGLE)
      }

      if (button) {
        const data = new ControlSidebar(button, null)
        data.toggleMini()
      }
    })
  }
})

export default ControlSidebar
