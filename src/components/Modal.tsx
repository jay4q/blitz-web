import { createRef, PureComponent } from 'react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { createPortal } from 'react-dom'
import classNames from 'classnames'

type Props = {
  visible: boolean
  closeOnClickOverlay?: boolean
  onClose?: () => void
  className?: string
}

export class Modal extends PureComponent<Props> {
  modalRef = createRef<HTMLDivElement>()

  handleScrollLock = () => {
    if (this.modalRef.current) {
      if (this.props.visible) {
        disableBodyScroll(this.modalRef.current)
      } else {
        enableBodyScroll(this.modalRef.current)
      }
    }
  }

  onOverlayClose = () => {
    if (this.props.closeOnClickOverlay && this.props.onClose) {
      this.props.onClose()
    }
  }

  render() {
    const { visible, className, children } = this.props

    return createPortal(
      // todo: 应该注意的是，这个 this.modalRef 应当作用在可以滑动元素上
      <div ref={this.modalRef} className={classNames('fixed z-50 inset-0 w-full h-full transition-all duration-300', visible ? 'visible' : 'invisible')}>
        <div onClick={this.onOverlayClose} className={classNames('absolute w-full h-full inset-0 backdrop-filter transition-all duration-300', visible ? 'backdrop-blur' : 'backdrop-blur-0')}></div>
        <div className={classNames('absolute transition-all transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', className, visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0')}>
          {children}
        </div>
      </div>,
      document.getElementById('modal')!
    )
  }

  componentDidMount() {
    this.handleScrollLock()
  }

  componentDidUpdate() {
    this.handleScrollLock()
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks()
  }
}