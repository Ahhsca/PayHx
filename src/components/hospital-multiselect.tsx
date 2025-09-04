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
import {
  Hospital,
  useHospitalMultiselect,
} from "@/context/hospital-multiselect-context";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import React, { useState } from "react";

const hospitals: Hospital[] = [
  {
    id: "kaiser",
    label: "Kaiser Permanente",
  },
  {
    id: "ucla",
    label: "UCLA",
  },
  {
    id: "uci",
    label: "UC Irvine",
  },
  {
    id: "ucsf",
    label: "UCSF",
  },
];

export const HospitalMultiSelect = () => {
  const [open, setOpen] = useState(false);
  const { isLargerThanMobile } = useBreakpoints();
  // const [selectedHospitals, setSelectedHospitals] = useState<
  //   (Hospital | null)[]
  // >([hospitals[0], null, null]);
  const { selectedHospitals, setSelectedHospitals } = useHospitalMultiselect();

  const onHospitalDelete = (value: number | string) => {
    const hospitalIndex = selectedHospitals.findIndex((h) => h?.id === value);
    if (hospitalIndex === -1) return;
    setSelectedHospitals((prev) => {
      const updated = [...prev];
      updated[hospitalIndex] = null;
      return updated;
    });
  };

  const selectedList = () => {
    return selectedHospitals.map((hospital) => {
      if (hospital) {
        const { id, label } = hospital;
        return (
          <Chip key={id} value={id} label={label} onClose={onHospitalDelete} />
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
  setSelectedHospitals,
}: {
  setOpen: (open: boolean) => void;
  setSelectedHospitals: React.Dispatch<
    React.SetStateAction<(Hospital | null)[]>
  >;
}) => {
  const onHospitalSelect = (value: string) => {
    setSelectedHospitals((prev) => {
      const hospital = hospitals.find((h) => h.id === value) || null;
      const firstNullIdx = prev.findIndex((h) => h === null);
      if (firstNullIdx !== -1) {
        const updated = [...prev];
        updated[firstNullIdx] = hospital;
        return updated;
      } else {
        const updated = [...prev];
        updated[updated.length - 1] = hospital;
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
          {hospitals.map((hospital) => (
            <CommandItem
              key={hospital.id}
              value={hospital.id}
              onSelect={(value) => {
                onHospitalSelect(value);
                setOpen(false);
              }}
            >
              {hospital.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
