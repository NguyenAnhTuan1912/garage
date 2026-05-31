// Import components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import EmptyUnderDevelopment from "@/shared/components/empty-under-development";
import CollectionManagement from "../collection-management";
import SiteCollector from "../collection-management/site-collector";
import WordCollector from "../collection-management/word-collector";

// Import state
import {
  useWorkbenchState,
  workbenchStateActions,
} from "@/extension/state/workbench";

export default function Workbench() {
  const { currentSectionName } = useWorkbenchState();

  return (
    <>
      <Accordion
        type="single"
        className="rounded-lg"
        value={currentSectionName}
        onValueChange={(value) => {
          workbenchStateActions.setCurrnetSectionName(value);
        }}
      >
        <AccordionItem value="collection-management">
          <AccordionTrigger>Collection Management</AccordionTrigger>
          <AccordionContent className="h-fit">
            <CollectionManagement />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="site-collector">
          <AccordionTrigger>Site Collector</AccordionTrigger>
          <AccordionContent className="h-fit">
            <SiteCollector />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="word-collector">
          <AccordionTrigger>Word Collector</AccordionTrigger>
          <AccordionContent className="h-fit">
            <WordCollector />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="note-writer">
          <AccordionTrigger className="h-fit">Note</AccordionTrigger>
          <AccordionContent>
            <EmptyUnderDevelopment />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="other">
          <AccordionTrigger className="h-fit">Other</AccordionTrigger>
          <AccordionContent>
            <EmptyUnderDevelopment />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
