// import { AUTO, Game, Scene, Types } from 'phaser'
import { Component } from 'react'
import Vibrant from 'node-vibrant'
import { BlurImage } from 'components/Blur'
import { Link } from 'react-router-dom'
import { PATHS } from 'configs/path'
import { Image } from 'components/Image'

const IMAGE = 'http://192.168.2.29:3000/avatar.png'
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
        <BlurImage hash={IMAGE_HASH} className='w-64 h-48' />
        <div className='w-32 h-screen bg-black'></div>
        <Image className='w-72 h-72' hash={IMAGE_HASH} src={IMAGE} />
      </div>
    )
  }

  componentDidMount() {
    // this.getImageColors()
    // new Game(GAME_CONFIG)
  }
}