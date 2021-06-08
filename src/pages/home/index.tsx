// import { AUTO, Game, Scene, Types } from 'phaser'
import { Component } from 'react'
import Vibrant from 'node-vibrant'
import { BlurImage } from 'components/Blur'
import { Link } from 'react-router-dom'
import { PATHS } from 'configs/path'
import { Image } from 'components/Image'
import { Modal } from 'components/Modal'

const IMAGE = `http://192.168.2.29:3000${process.env.PUBLIC_URL}/avatar.png`
const IMAGE_HASH = 'UEHxmSRip3t8~FWBROn%BZsVTLW,=}kWw^oN'

// class Demo extends Scene {
//   // constructor(config: string | Types.Scenes.SettingsConfig) {
//   //   super(config)
//   // }

//   preload() {
//     console.log('onpreload')
//   }

//   create() {
//     console.log('oncreate')
//   }
// }

// const GAME_CONFIG: Types.Core.GameConfig = {
//   type: AUTO,
//   width: 512,
//   height: 512,
//   parent: 'render',
//   physics: {
//     default: 'matter'
//   },
//   scene: [Demo],
// }

/**
 * 首页
 */
export default class HomePage extends Component {
  state = {
    visible: false
  }

  getImageColors = async () => {
    const res = await Vibrant
      .from(IMAGE)
      .maxColorCount(3)
      .getPalette()

    console.log(res.Vibrant?.getHex())
  }

  render() {
    return (
      <div id='render'>
        <Link to={PATHS['dev__blur']}>获取图片哈希</Link>
        <button className='block' onClick={() => this.setState({ visible: true })}>打开弹窗</button>
        <BlurImage hash={IMAGE_HASH} className='w-64 h-48' />
        <div className='w-32 h-screen bg-black'></div>
        <Image className='w-72 h-72' hash={IMAGE_HASH} src={IMAGE} />
        <Modal visible={this.state.visible} closeOnClickOverlay onClose={() => this.setState({ visible: false })}>
          <div className='w-60 h-32 rounded-lg shadow-md bg-white'></div>
        </Modal>
      </div>
    )
  }

  componentDidMount() {
    // this.getImageColors()
    // new Game(GAME_CONFIG)
  }
}