// Import components
import Text from "./text";

// Import types
import type { TTextVariant } from "./text";

type TSectionHeaderSize = "base" | "small";

export type TSectionHeaderProps = {
  title: string;
  description: string;
  size?: TSectionHeaderSize;
  className?: string;
};

export default function SectionHeader(props: TSectionHeaderProps) {
  let size: { titleSize: TTextVariant; descriptionSize: TTextVariant } = {
    titleSize: "h3",
    descriptionSize: "body",
  };

  if (props.size && props.size === "small") {
    size = {
      titleSize: "h5",
      descriptionSize: "sub-body",
    };
  }

  return (
    <div className={props.className}>
      <Text variant={size.titleSize}>{props.title}</Text>
      <Text
        variant={size.descriptionSize}
        className="[&:not(:first-child)]:mt-0"
      >
        {props.description}
      </Text>
    </div>
  );
}
