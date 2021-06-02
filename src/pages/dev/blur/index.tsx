import classNames from 'classnames'
import { BlurImage } from 'components/Blur'
import { getBlurhash } from 'components/Blur/helper'
import { Fragment, FunctionComponent, InputHTMLAttributes, PureComponent, useRef } from 'react'
import { Helmet } from 'react-helmet'

const Upload: FunctionComponent<{ loading: boolean, onSelect: (file: File) => void | Promise<void> }> = (({ onSelect, loading }) => {
  const inputRef = useRef<any>()

  const onClick = () => {
    if (loading) return

    const el = inputRef.current
    if (el) {
      el.click()
    }
  }

  const onChange: InputHTMLAttributes<HTMLInputElement>['onChange'] = e => {
    const { files } = e.target

    // 单次只处理一个图片
    if (files?.length !== 1) {
      return
    } else {
      onSelect(files[0])
    }
  }

  return (
    <Fragment>
      <button onClick={onClick} className={classNames('h-10 w-32 mb-4 flex items-center justify-center rounded-[4.5rem] text-sm text-white font-bold bg-black', loading && 'opacity-50')}>
        {loading ? '处理中...' : '上传图片'}
      </button>
      <input ref={inputRef} type='file' accept='image/*' className='hidden' onChange={onChange} />
    </Fragment>
  )
})

/**
 * 生成图片哈希
 */
export default class Index extends PureComponent {
  readonly state = {
    loading: false,
    img: '',
    hash: '',
  }

  onSelect = async (file: File) => {
    this.setState({ loading: true })
    const url = URL.createObjectURL(file)
    const hash = await getBlurhash(url)

    if (hash) {
      this.setState({
        loading: false,
        img: url,
        hash,
      })
    } else {
      this.setState({
        loading: false
      })
    }
  }

  render() {
    const { img, hash } = this.state

    return (
      <div className='w-full h-full inline-flex flex-col items-center justify-center'>
        <Helmet>
          <title>开发｜生成图片哈希</title>
        </Helmet>
        <div className='flex items-center'>
          {
            img && (
              <img alt='' className='block w-48 h-auto border-2 border-black mb-4 mr-4' src={img} />
            )
          }
          {
            hash && (
              <BlurImage hash={hash} className='w-48 h-48 mb-4 border-2 border-black' />
            )
          }
        </div>
        <Upload onSelect={this.onSelect} loading={this.state.loading} />
        {
          hash && (
            <span className='font-bold text-sm'>{hash}</span>
          )
        }
      </div>
    )
  }
}