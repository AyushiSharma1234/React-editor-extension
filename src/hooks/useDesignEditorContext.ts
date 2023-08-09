import { useContext } from "react"
import { DesignEditorContext } from "~/contexts/DesignEditor"

const useDesignEditorContext = () => {
  const {
    editorType,
    setEditorType,
    displayPlayback,
    setDisplayPlayback,
    setDisplayPreview,
    displayPreview,
    currentScene,
    setCurrentScene,
    setScenes,
    scenes,
    maxTime,
    setMaxTime,
    contextMenuTimelineRequest,
    setContextMenuTimelineRequest,
    contextMenuSceneRequest,
    setContextMenuSceneRequest,
    currentDesign,
    setCurrentDesign,
    setCategories,
    setFetchedTemplates,
    fetchedTemplates,
    categories,
    filteredTemplates,
    setFilteredTemplates,
  } = useContext(DesignEditorContext)
  return {
    editorType,
    setEditorType,
    displayPlayback,
    setDisplayPlayback,
    setDisplayPreview,
    displayPreview,
    currentScene,
    setCurrentScene,
    setScenes,
    scenes,
    maxTime,
    setMaxTime,
    contextMenuTimelineRequest,
    setContextMenuTimelineRequest,
    contextMenuSceneRequest,
    setContextMenuSceneRequest,
    currentDesign,
    setCurrentDesign,
    setFetchedTemplates,
    setCategories,
    fetchedTemplates,
    categories,
    filteredTemplates,
    setFilteredTemplates,
  }
}

export default useDesignEditorContext
