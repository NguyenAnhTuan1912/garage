// Import components
import Text from "./text";

export type TSectionHeaderProps = {
  title: string;
  description: string;
};

export default function SectionHeader(props: TSectionHeaderProps) {
  return (
    <div>
      <Text variant="h3">{props.title}</Text>
      <Text variant="body" className="[&:not(:first-child)]:mt-0">
        {props.description}
      </Text>
    </div>
  );
}
