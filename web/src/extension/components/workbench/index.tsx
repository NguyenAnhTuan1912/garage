// Import components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import EmptyUnderDevelopment from "@/shared/components/empty-under-development";
import CollectionManagement from "../collection-management";

export default function Workbench() {
  return (
    <>
      <Accordion type="single" className="rounded-lg" defaultValue="collection-management">
        <AccordionItem value="collection-management">
          <AccordionTrigger>Collection Management</AccordionTrigger>
          <AccordionContent className="h-fit">
            <CollectionManagement />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="site-collector">
          <AccordionTrigger>Site Collector</AccordionTrigger>
          <AccordionContent className="h-fit">
            <EmptyUnderDevelopment />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="word-collector">
          <AccordionTrigger>Word Collector</AccordionTrigger>
          <AccordionContent className="h-fit">
            <EmptyUnderDevelopment />
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
