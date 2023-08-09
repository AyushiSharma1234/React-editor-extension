import React, { useState } from "react"
import { useEditor } from "@layerhub-io/react"
import { Block } from "baseui/block"
import { Select, TYPE, Value } from "baseui/select"
import { loadTemplateFonts } from "~/utils/fonts"
import Scrollable from "~/components/Scrollable"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import { useStyletron } from "baseui"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { useSelector } from "react-redux"
import { selectPublicDesigns } from "~/store/slices/designs/selectors"
import { IDesign } from "~/interfaces/DesignEditor"
import { IScene } from "@layerhub-io/types"
import { nanoid } from "nanoid"
import api from "~/services/api"
import { loadVideoEditorAssets } from "~/utils/video"
import useEditorType from "~/hooks/useEditorType"

export default function () {
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const {
    setCurrentScene,
    currentScene,
    setScenes,
    setCurrentDesign,
    categories,
    fetchedTemplates,
    setFetchedTemplates,
    setFilteredTemplates,
    filteredTemplates
  } = useDesignEditorContext()
  const designs = useSelector(selectPublicDesigns)
  const editorType = useEditorType()
  const [category, setCategory] = useState<Value>([])

  // const loadDesignById = React.useCallback(
  //   async (designId: string) => {
  //     if (editor) {
  //       const design = await api.getPublicDesignById(designId)
  //       const loadedDesign = await loadGraphicTemplate(design)
  //       setScenes(loadedDesign.scenes)
  //       setCurrentScene(loadedDesign.scenes[0])
  //       setCurrentDesign(loadedDesign.design)
  //     }
  //   },
  //   [editor, currentScene]
  // )

  const loadGraphicTemplate = async (payload: IDesign) => {
    const scenes = []
    const { scenes: scns, ...design } = payload

    for (const scn of scns) {
      const scene: IScene = {
        name: scn.name,
        frame: payload.frame,
        id: scn.id,
        layers: scn.layers,
        metadata: {},
      }
      const loadedScene = await loadVideoEditorAssets(scene)
      await loadTemplateFonts(loadedScene)
      const preview = (await editor.renderer.render(loadedScene)) as string
      scenes.push({ ...loadedScene, preview })
    }

    return { scenes, design }
  }

  const handleImportTemplate = React.useCallback(
    async (data: any) => {      let template
      if (data.type === "GRAPHIC") {
        template = await loadGraphicTemplate(data)
      }
      //   @ts-ignore
      setScenes(template.scenes)
      //   @ts-ignore
      setCurrentDesign(template.design)
    },
    [editor]
  )

  const filterTemplates = (category:string) => {
    if (category === "Select a category"){
      return setFilteredTemplates(fetchedTemplates)
    }
      const filteredTemps = fetchedTemplates.filter((template) => {
        return template.category === category
      })
    setFilteredTemplates(filteredTemps)

  }
  return (
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Block
        $style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <Block>Templates</Block>

        <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>
      <Scrollable>
        <div style={{ padding: "0 1.5rem" }}>
          <div className="category_dropdown">
            {categories.length>1 ? (
              <Select
                options={categories.map((category) => {
                  return { label: category, category: category }
                })}
                value={category}
                valueKey="category"
                placeholder="Select category"
                onChange={({ value }) => {
                  filterTemplates(value[0].category)
                  setCategory(value)
                }}
              />
            ) : (
              "...Loading categories"
            )}

            {/* {designs
              .filter((d) => d.type === editorType)
              .map((design, index) => {
                return (
                  <>
                    <ImageItem
                      onClick={() => loadDesignById(design.id)}
                      key={index}
                      preview={design.preview && `${design.preview[0].src}?tr=w-320`}
                    />
                  </>
                )
              })} */}
          </div>
          <div className="template_image_row">
            {filteredTemplates &&
              filteredTemplates.map((design, index) => {
                return (
                  <>
                    <div className="template_image_col">
                      {design.imageUrl && (
                        <img
                        key={design.id}
                          onClick={() => {
                            handleImportTemplate(design)
                          }}
                          src={design.imageUrl}
                        />
                      )}
                    </div>
                  </>
                )
              })}
          </div>
        </div>
      </Scrollable>
    </Block>
  )
}

function ImageItem({ preview, onClick }: { preview: any; onClick?: (option: any) => void }) {
  const [css] = useStyletron()
  return (
    <div
      onClick={onClick}
      className={css({
        position: "relative",
        background: "#f8f8fb",
        cursor: "pointer",
        borderRadius: "8px",
        overflow: "hidden",
        "::before:hover": {
          opacity: 1,
        },
      })}
    >
      <div
        className={css({
          backgroundImage: `linear-gradient(to bottom,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.006) 8.1%,
          rgba(0, 0, 0, 0.022) 15.5%,
          rgba(0, 0, 0, 0.047) 22.5%,
          rgba(0, 0, 0, 0.079) 29%,
          rgba(0, 0, 0, 0.117) 35.3%,
          rgba(0, 0, 0, 0.158) 41.2%,
          rgba(0, 0, 0, 0.203) 47.1%,
          rgba(0, 0, 0, 0.247) 52.9%,
          rgba(0, 0, 0, 0.292) 58.8%,
          rgba(0, 0, 0, 0.333) 64.7%,
          rgba(0, 0, 0, 0.371) 71%,
          rgba(0, 0, 0, 0.403) 77.5%,
          rgba(0, 0, 0, 0.428) 84.5%,
          rgba(0, 0, 0, 0.444) 91.9%,
          rgba(0, 0, 0, 0.45) 100%)`,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          height: "100%",
          width: "100%",
          ":hover": {
            opacity: 1,
          },
        })}
      ></div>
      <img
        src={preview}
        className={css({
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          verticalAlign: "middle",
        })}
      />
    </div>
  )
}
