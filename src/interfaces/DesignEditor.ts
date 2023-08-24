import { IFrame, IScene } from "@layerhub-io/types"

export interface Page {
  id: string
  name: string
  preview: string
}

export type DesignType = "GRAPHIC"

export interface ContextMenuTimelineRequest {
  id: string
  top: number
  left: number
  visible: boolean
}

export interface ContextMenuSceneRequest {
  id: string
  top: number
  left: number
  visible: boolean
}

export interface IDesign {
  id: string
  name: string
  frame: IFrame
  frameInInches: IFrame
  type: string
  scenes: any[]
  preview: { id: string; src: string }[] | null
  metadata: {}
  published?: boolean
  imageUrl?:string | null
  category?:string | null
}

export interface IComponent extends Omit<IScene, "preview"> {
  published: boolean
  preview: { src: string }
}
