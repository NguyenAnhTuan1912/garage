import { useState, useMemo } from "react";
import { useDebounceValue } from "usehooks-ts";

// Import components
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "./ui/spinner";

// Import types
import type { AxiosResponse } from "axios";
import type { UseQueryResult } from "@tanstack/react-query";
import type { TResPayload } from "../api/type";

export type TSearchableSelectWithQueryProps<TItem = any> = {
  field: any;
  isInvalid?: boolean;
  getItemSearchValue(item: TItem): string;
  getItemKey(item: TItem): string;
  getItemValue(item: TItem): string;
  buildQueryParams(text: string): any;
};

export function createSearchableSelectWithQuery(
  useQuery: (
    params?: any
  ) => UseQueryResult<AxiosResponse<TResPayload<any[], any>, any, {}>, Error>
) {
  return function SearchableSelectWithQuery<TItem = any>(
    props: TSearchableSelectWithQueryProps<TItem>
  ) {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm] = useDebounceValue(searchTerm, 500);
    const queryParams = useMemo(() => {
      return props.buildQueryParams(debouncedSearchTerm);
    }, [debouncedSearchTerm, props]);
    const { data: itemRes, isPending } = useQuery(queryParams);

    const items = itemRes?.data.data;
    // const meta = itemRes?.data.meta;

    return (
      <Select
        name={props.field.name}
        value={props.field.state.value}
        onValueChange={props.field.handleChange}
        disabled={isPending}
        onOpenChange={(open) => {
          if (!open) setSearchTerm("");
        }}
      >
        <SelectTrigger
          id={props.field.name}
          className="rounded-lg text-sm"
          aria-invalid={props.isInvalid}
        >
          <SelectValue placeholder="Collection" />
        </SelectTrigger>

        <SelectContent className="w-full rounded-lg text-sm">
          <div className="sticky top-0 z-10 bg-popover p-2">
            <Input
              placeholder="Search..."
              className="h-8 rounded-md text-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {isPending ? (
            <div className="flex items-center gap-3">
              <Spinner /> Searching...
            </div>
          ) : (
            <SelectGroup>
              {items && items.length > 0 ? (
                items.map((item) => (
                  <SelectItem
                    key={props.getItemKey(item)}
                    className="rounded-lg text-sm"
                    value={props.getItemValue(item)}
                  >
                    {props.getItemSearchValue(item)}
                  </SelectItem>
                ))
              ) : (
                <div className="py-2 text-center text-xs text-muted-foreground">
                  No results found
                </div>
              )}
            </SelectGroup>
          )}
        </SelectContent>
      </Select>
    );
  };
}
