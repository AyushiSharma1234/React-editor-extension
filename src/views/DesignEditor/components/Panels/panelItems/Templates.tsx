import React, { useState } from "react"
import { useEditor } from "@layerhub-io/react"
import { Block } from "baseui/block"
import { Select, Value } from "baseui/select"
import { loadTemplateFonts } from "~/utils/fonts"
import Scrollable from "~/components/Scrollable"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { IDesign } from "~/interfaces/DesignEditor"
import { IScene } from "@layerhub-io/types"
import { loadVideoEditorAssets } from "~/utils/video"

export default function () {
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const {
    setScenes,
    setCurrentDesign,
    categories,
    fetchedTemplates,
    setFilteredTemplates,
    filteredTemplates
  } = useDesignEditorContext()

  const [category, setCategory] = useState<Value>([])

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
