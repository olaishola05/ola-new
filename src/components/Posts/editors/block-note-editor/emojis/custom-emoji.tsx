import {
  DefaultReactGridSuggestionItem,
  GridSuggestionMenuProps,
} from "@blocknote/react";
import "./styles.css";


export default function CustomEmojiPicker(
  props: GridSuggestionMenuProps<DefaultReactGridSuggestionItem>
) {
  return (
    <div
      className={"emoji-picker"}
      style={
        { gridTemplateColumns: `repeat(${props.columns || 1}, 1fr)` } as any
      }>
      {props.items.map((item, index) => (
        <div
          key={index}
          className={`emoji-picker-item${props.selectedIndex === index ? " selected" : ""
            }`}
          onClick={() => {
            props.onItemClick?.(item);
          }}>
          {item.icon}
        </div>
      ))}
    </div>
  );
}