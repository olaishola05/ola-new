import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { Menu } from "@mantine/core";
import { InfoIcon, Lightbulb, AlertTriangle, BookOpen } from 'lucide-react';
import "./callout-styles.css";

export const calloutTypes = [
  {
    title: "Note",
    value: "note",
    icon: InfoIcon,
    color: "#3b82f6", // blue
    backgroundColor: {
      light: "#f0f7ff",
      dark: "#1e3a8a",
    },
  },
  {
    title: "Tip",
    value: "tip",
    icon: Lightbulb,
    color: "#16a34a", // green
    backgroundColor: {
      light: "#f0fdf4",
      dark: "#14532d",
    },
  },
  {
    title: "Warning",
    value: "warning",
    icon: AlertTriangle,
    color: "#ea580c", // orange
    backgroundColor: {
      light: "#fff7ed",
      dark: "#7c2d12",
    },
  },
  {
    title: "Important",
    value: "important",
    icon: BookOpen,
    color: "#8b5cf6", // purple
    backgroundColor: {
      light: "#f5f3ff",
      dark: "#4c1d95",
    },
  },
] as const;

export const Callout = createReactBlockSpec(
  {
    type: "callout",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      type: {
        default: "note",
        values: ["note", "tip", "warning", "important"],
      },
    },
    content: "inline",
  },
  {
    render: (props) => {
      const calloutType = calloutTypes.find(
        (c) => c.value === props.block.props.type
      )!;
      const Icon = calloutType.icon;

      return (
        <div className={"callout"} data-callout-type={props.block.props.type}>
          {/* Icon which opens a menu to choose the Callout type */}
          <Menu withinPortal={false} zIndex={999999}>
            <Menu.Target>
              <div className={"callout-icon-wrapper"} contentEditable={false}>
                <Icon
                  className={"callout-icon"}
                  data-callout-icon-type={props.block.props.type}
                  size={24}
                />
              </div>
            </Menu.Target>
            {/* Dropdown to change the Callout type */}
            <Menu.Dropdown>
              <Menu.Label>Callout Type</Menu.Label>
              <Menu.Divider />
              {calloutTypes.map((type) => {
                const ItemIcon = type.icon;

                return (
                  <Menu.Item
                    key={type.value}
                    leftSection={
                      <ItemIcon
                        className={"callout-icon"}
                        data-callout-icon-type={type.value}
                        size={16}
                      />
                    }
                    onClick={() =>
                      props.editor.updateBlock(props.block, {
                        type: "callout",
                        props: { type: type.value },
                      })
                    }>
                    {type.title}
                  </Menu.Item>
                );
              })}
            </Menu.Dropdown>
          </Menu>
          {/* Rich text field for user to type in */}
          <div className={"inline-content"} ref={props.contentRef} />
        </div>
      );
    },
  }
);