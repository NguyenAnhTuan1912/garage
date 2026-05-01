import { useState, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";

// Import components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";

export type TDatePickerProps = {
  label?: string;
  onDateChange?(date?: Date): void;
};

export type TDatePickerFormElementProps = TDatePickerProps & {
  field: any;
};

export function DatePicker(props: TDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (props.onDateChange) {
      props.onDateChange(date);
    }
  }, [date]);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        {props.label || "Date"}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function DatePickerFormElement(props: TDatePickerFormElementProps) {
  const [open, setOpen] = useState(false);
  const { field } = props;

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={field.name} className="px-1">
        {props.label || "Date"}
      </Label>
      <Input name={field.name} value={field.state.value} type="hidden" />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={field.name}
            className="justify-between font-normal"
          >
            {field.state.value.toLocaleDateString() || "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={field.state.value}
            captionLayout="dropdown"
            onSelect={(date) => {
              setOpen(false);
              field.handleChange(date);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
