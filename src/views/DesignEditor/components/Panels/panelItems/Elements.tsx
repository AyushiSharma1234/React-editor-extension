import React from "react"
import { useEditor } from "@layerhub-io/react"
import { useStyletron } from "baseui"
import { Block } from "baseui/block"
import { Button, SIZE } from "baseui/button"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
import { callouts, complexShapes, emojis, graphics } from "~/constants/mock-data"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"

const Elements = () => {
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const addObject = React.useCallback(
    (item: any) => {
      if (editor) {
        editor.objects.add(item)
      }
    },
    [editor]
  )

   const addEmojies = React.useCallback(
     (url: any) => {
       if (editor) {
         const options = {
           type: "StaticImage",
           src: url,
         }
         editor.objects.add(options)
       }
     },
     [editor]
   )

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
        <Block>Shapes</Block>

        <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>
      <Scrollable>
        {/* <Block padding={"0 1.5rem"}>
          <Button
            size={SIZE.compact}
            overrides={{
              Root: {
                style: {
                  width: "100%",
                },
              },
            }}
          >
            Computer
          </Button>
        </Block> */}
        <Block>
          <Block
            $style={{
              display: "flex",
              flexWrap: "wrap",
              background: " #f8f8fb",
              padding: "0 0px 0 30px",
            }}
          >
            <Block $style={{ width: "100%" }}>
              {graphics.map((graphic) => graphic.shapes).filter((shape, index, arr) => arr.indexOf(shape) === index)}
            </Block>
            {graphics.map((graphic, index) => (
              <ImageItem onClick={() => addObject(graphic)} key={index} preview={graphic.preview} />
            ))}
            <Block $style={{ width: "100%" }}>
              {callouts.map((callout) => callout.shapes).filter((shape, index, arr) => arr.indexOf(shape) === index)}
            </Block>
            {callouts.map((callout, index) => (
              <ImageItem onClick={() => addObject(callout)} key={index} preview={callout.preview} />
            ))}

            <Block $style={{ width: "100%" }}>
              {complexShapes
                .map((complexShape) => complexShape.shapes)
                .filter((shape, index, arr) => arr.indexOf(shape) === index)}
            </Block>
            {complexShapes.map((complexShape, index) => (
              <ImageItem onClick={() => addObject(complexShape)} key={index} preview={complexShape.preview} />
            ))}

            <Block $style={{ width: "100%" }}>
              {emojis.map((emoji) => emoji.shapes).filter((shape, index, arr) => arr.indexOf(shape) === index)}
            </Block>
            {emojis.map((emoji, index) => (
              <ImageItem onClick={() => addEmojies(emoji.preview)} key={index} preview={emoji.preview} />
            ))}
          </Block>
        </Block>
      </Scrollable>
    </Block>
  )
}

const ImageItem = ({ preview, onClick }: { preview: any; onClick?: (option: any) => void }) => {
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
        maxWidth: "calc(25% - 30px)",
        flex: "0 0 calc(25% - 30px)",
        margin: " 10px 0px",
        display: " flex",
        flexWrap: "wrap",
        padding: "0 30px 0 0 ;",
        ":hover": {
          opacity: 0.8,
        },
      })}
    >
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

export default Elements
