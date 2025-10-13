"use client";

import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useHospitalMultiselectContext } from "@/context/hospital-multiselect-context";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import React, { useState } from "react";

export const HospitalMultiSelect = () => {
  const [open, setOpen] = useState(false);
  const { isLargerThanMobile } = useBreakpoints();
  const { allHospitalNames, selectedHospitals, setSelectedHospitals } =
    useHospitalMultiselectContext();

  const onHospitalDelete = (value: number) => {
    setSelectedHospitals((prev) => {
      const updated = [...prev];
      updated[value] = null;
      return updated;
    });
  };

  const selectedList = () => {
    return selectedHospitals.map((hospital, index) => {
      if (hospital) {
        return (
          <Chip
            key={index}
            value={index}
            label={hospital}
            onClose={onHospitalDelete}
          />
        );
      }
    });
  };

  if (isLargerThanMobile) {
    return (
      <div className="flex gap-1">
        {selectedList()}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[150px] justify-start">
              + Select hospital
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <HospitalList
              setOpen={setOpen}
              allHospitalNames={allHospitalNames}
              selectedHospitals={selectedHospitals}
              setSelectedHospitals={setSelectedHospitals}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <div>
      {selectedList()}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            + Select hospital
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mt-4 border-t">
            <HospitalList
              setOpen={setOpen}
              allHospitalNames={allHospitalNames}
              selectedHospitals={selectedHospitals}
              setSelectedHospitals={setSelectedHospitals}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const HospitalList = ({
  setOpen,
  allHospitalNames,
  selectedHospitals,
  setSelectedHospitals,
}: {
  setOpen: (open: boolean) => void;
  allHospitalNames: string[];
  selectedHospitals: (string | null)[];
  setSelectedHospitals: React.Dispatch<React.SetStateAction<(string | null)[]>>;
}) => {
  const onHospitalSelect = (value: number) => {
    if (selectedHospitals.includes(allHospitalNames[value])) return;
    setSelectedHospitals((prev) => {
      const firstNullIdx = prev.findIndex((h) => h === null);
      if (firstNullIdx !== -1) {
        const updated = [...prev];
        updated[firstNullIdx] = allHospitalNames[value];
        return updated;
      } else {
        const updated = [...prev];
        updated[updated.length - 1] = allHospitalNames[value];
        return updated;
      }
    });
  };

  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {allHospitalNames.map((hospital, index) => (
            <CommandItem
              key={index}
              value={String(index)}
              onSelect={(value) => {
                onHospitalSelect(Number(value));
                setOpen(false);
              }}
            >
              {hospital}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
