import { Howl } from 'howler'
import { AUDIOS } from 'configs/constant'
import create from 'zustand'

type State = {
  isPlaying: boolean
  togglePlaying: (isPlaying: boolean) => void
  togglePlay: (isPlay: boolean) => void
}

/**
 * 全站唯一的音频播放实例
 */
export class GlobalAudioPlayer {
  private static instance: GlobalAudioPlayer

  private _howler?: Howl

  constructor() {
    if (!this._howler) {
      this._howler = new Howl({
        src: AUDIOS.bg,
        autoplay: true,
        loop: true,
        volume: 0.5,
        // 解决ios不能播放的问题
        // https://github.com/goldfire/howler.js/issues/1407
        html5: true,
        onloaderror: e => {
          console.log(e)
        },
        onpause: () => {
          useAudioPlayer.getState().togglePlaying(false)
        },
        onplay: () => {
          useAudioPlayer.getState().togglePlaying(true)
        },
        onunlock: () => {
          // 解决ios首次播放无法生效的问题
          this._howler?.play()
        },
        onplayerror: e => {
          console.log(e)
        }
      })
    }
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new GlobalAudioPlayer()
    }
    return this.instance
  }

  public get howler() {
    return this._howler!
  }
}

export const useAudioPlayer = create<State>((set, get) => {
  // 懒加载/初始化
  let player = GlobalAudioPlayer.getInstance()

  return {
    isPlaying: false,
    togglePlay: isPlay => {
      if (isPlay) {
        if (!get().isPlaying) {
          player.howler.play()
        }
      } else {
        if (get().isPlaying) {
          player.howler.pause()
        }
      }
    },
    togglePlaying: isPlaying => {
      set({ isPlaying })
    }
  }
})