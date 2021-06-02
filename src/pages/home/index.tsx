import { AUTO, Game, Scene, Types } from 'phaser'
import { Component } from 'react'
import Vibrant from 'node-vibrant'
import { BlurImage } from 'components/Blur'

const IMAGE = 'http://localhost:3000/avatar.png'
const IMAGE_HASH = 'UEHxmSRip3t8~FWBROn%BZsVTLW,=}kWw^oN'

class Demo extends Scene {
  // constructor(config: string | Types.Scenes.SettingsConfig) {
  //   super(config)
  // }

  preload() {
    console.log('onpreload')
  }

  create() {
    console.log('oncreate')
  }
}

const GAME_CONFIG: Types.Core.GameConfig = {
  type: AUTO,
  width: 512,
  height: 512,
  parent: 'render',
  physics: {
    default: 'matter'
  },
  scene: [Demo],
}

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
        <BlurImage hash={IMAGE_HASH} className='w-64 h-48' />
      </div>
    )
  }

  componentDidMount() {
    // this.getImageColors()
    new Game(GAME_CONFIG)
  }
}