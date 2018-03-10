// tools
import React from "react"
import styled from "styled-components"

// components
import { TinyButton } from "./components/Button"
import Link from "./components/Link"
import { makeRelative } from "@roast-cms/react-link-filter/dist/utils"

const UnquoteButton = styled(TinyButton)`
  width: 6em;
  margin: 1.35em -${props => props.theme.size.block.column.safety}em -3.35em 0;
  float: right;
  position: relative;
  z-index: ${props => props.theme.layer.up};
  ${props => props.theme.size.breakpoint.max.m`
    right: ${props => props.theme.size.block.spacing / 2}em;
  `};
`

export const renderNode = props => {
  const { node, attributes, children, isSelected, editor } = props
  const focus = editor.value.isFocused && isSelected
  const focusClassName = focus ? "focus" : "nofocus"

  switch (node.type) {
    case "paragraph":
      return (
        <p {...attributes}>
          {children}
        </p>
      )
    case "heading":
      return (
        <h3>
          {children}
        </h3>
      )
    case "divider":
      return <hr className={focusClassName} />
    case "quote":
      return (
        <div style={{ clear: "both" }}>
          {!props.readOnly &&
            focus &&
            <UnquoteButton
              className="french-press_unquote"
              contentEditable="false"
              spellCheck="false"
              suppressContentEditableWarning
              onClick={event => {
                event.preventDefault()
                editor.onChange(
                  editor.value
                    .change()
                    .setNodeByKey(attributes["data-key"], {
                      type: "paragraph"
                    })
                    .focus()
                )
              }}
              branded
            >
              Unqoute
            </UnquoteButton>}
          <blockquote {...attributes} className={focusClassName}>
            {children}
          </blockquote>
        </div>
      )
    case "image": {
      if (
        props.editor.props.components &&
        props.editor.props.components.Picture
      ) {
        const Picture = props.editor.props.components.Picture
        return <Picture {...props} />
      } else {
        console.warn("<Picture /> component required to render images");
        return null
      }
    }
    case "docket": {
      if (
        props.editor.props.components &&
        props.editor.props.components.PictureDocket
      ) {
        const Picture = props.editor.props.components.PictureDocket
        return <PictureDocket {...props} />
      } else {
        return null
      }
    }
    case "link": {
      const { data } = node
      const href = data.get("href")
      return (
        <Link
          {...attributes}
          to={makeRelative(href, props.editor.props.options.domain)}
        >
          {children}
        </Link>
      )
    }
    default:
      return (
        <p {...attributes}>
          {children}
        </p>
      )
  }
}

export const renderMark = props => {
  const { children, mark } = props
  switch (mark.type) {
    case "bold":
      return (
        <strong>
          {children}
        </strong>
      )
    case "italic":
      return (
        <em>
          {children}
        </em>
      )
    default:
      return { children }
  }
}
