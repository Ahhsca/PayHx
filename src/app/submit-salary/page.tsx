"use client";

import React from "react";
import { format } from "date-fns";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronsUpDown, Check } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { toast } from "sonner";

import {
  states,
  specialties,
  unions,
  shiftDiff,
} from "@/constants/submit-salary-options";
import { addSalaryData } from "@/app/api/salary/add-salary";

// **Form schema with specialty as a string**
const formSchema = z.object({
  emailAddress: z.string().email(),
  city: z.string(),
  state: z.string(),
  zipcode: z.string(),
  date: z.date(),
  specialty: z.string().nonempty("Please select a specialty"),
  hospital: z.string(),
  union: z.string(),
  experience: z.number(),
  pay: z.number(),
  shiftDiffPay: z.number(),
  shiftDiffType: z.string(),
});

export default function SubmitSalaryPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      city: "",
      state: "",
      zipcode: "",
      date: new Date(),
      specialty: "",
      hospital: "",
      union: "",
      experience: 0,
      pay: 0,
      shiftDiffPay: 0,
      shiftDiffType: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const docId = await addSalaryData(data);
      console.log("Document written with ID: ", docId);
      toast.success("Your data has been submitted!");
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Failed to submit data.");
    }
  };

  return (
    <main className="container mx-auto">
      <div className="flex flex-col gap-4">
        <h1 className="px-2 sm:p-0 text-4xl font-extrabold tracking-tight">
          Real salaries from real nurses.
        </h1>
        <div className="sm:w-3/5">
          <p className="px-2 sm:p-0 text-left sm:text-justify">
            Your submissions lead to better wage transparency across the board!
            All submissions remain anonymous. Thank you for your help and
            support as we continue to grow. Please submit your current offer or
            upcoming offers that you have.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-1 w-full mt-8"
        >
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem className="flex">
                <FormLabel className="min-w-1/5 text-left">Email</FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="Email (e.g. payhx.live@gmail.com)"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem className="flex items-baseline">
            <FormLabel className="min-w-1/5 text-left">Location</FormLabel>
            <div className="flex w-4/5 gap-1 justify-between">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormControl className="w-3/4">
                    <Input placeholder="City (e.g. Los Angeles)" {...field} />
                  </FormControl>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            tabIndex={0}
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? states.find((s) => s.value === field.value)
                                  ?.label
                              : "State"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="State" />
                          <CommandList>
                            <CommandEmpty>No states found.</CommandEmpty>
                            <CommandGroup>
                              {states.map((state) => (
                                <CommandItem
                                  key={state.value}
                                  value={state.label}
                                  onSelect={() => field.onChange(state.value)}
                                >
                                  {state.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      state.value === field.value
                                        ? "visible"
                                        : "invisible",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex items-baseline">
                <FormLabel className="min-w-1/5 text-left">Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl data-testid="form-control">
                      <Button
                        variant={"outline"}
                        tabIndex={0}
                        className={cn(
                          "text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Specialty Combobox Field */}
          <FormField
            control={form.control}
            name="specialty"
            render={({ field }) => (
              <FormItem className="flex items-baseline">
                <FormLabel className="min-w-1/5 text-left">Specialty</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        tabIndex={0}
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? specialties.find((s) => s.value === field.value)
                              ?.label || field.value
                          : "Select specialty"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search or enter specialty..."
                        onInput={(e) => field.onChange(e.currentTarget.value)} // Update the field on input
                      />
                      <CommandList>
                        <CommandEmpty>
                          <Button
                            variant="link"
                            onClick={() => field.onChange(field.value)} // Allow adding the entered text
                          >
                            Add &quot;{field.value}&quot;
                          </Button>
                        </CommandEmpty>
                        <CommandGroup>
                          {specialties.map((specialty) => (
                            <CommandItem
                              key={specialty.value}
                              value={specialty.label}
                              onSelect={() => field.onChange(specialty.value)}
                            >
                              {specialty.label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  specialty.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hospital"
            render={({ field }) => (
              <FormItem className="flex items-baseline">
                <FormLabel className="min-w-1/5 text-left">Hospital</FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="Hospital name (e.g. Kaiser Permanente)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipcode"
            render={({ field }) => (
              <FormItem className="flex items-baseline">
                <FormLabel className="min-w-1/5 text-left">Zipcode</FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="Hospital zipcode (e.g. 90027)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="union"
            render={({ field }) => (
              <FormItem className="flex items-baseline">
                <FormLabel className="min-w-1/5 text-left">Union</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        tabIndex={0}
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? unions.find((u) => u.value === field.value)?.label
                          : "Yes/No/Unsure"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search union status..." />
                      <CommandList>
                        <CommandEmpty>No union status found.</CommandEmpty>
                        <CommandGroup>
                          {unions.map((union) => (
                            <CommandItem
                              key={union.value}
                              value={union.label}
                              onSelect={() => field.onChange(union.value)}
                            >
                              {union.label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  union.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="flex items-baseline">
                <FormLabel className="min-w-1/5 text-left">
                  Experience
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Years of Experience (i.e 5)"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pay"
            render={({ field }) => (
              <FormItem className="flex items-baseline">
                <FormLabel className="min-w-1/5">Pay (hourly)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="i.e 50"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem className="flex items-baseline">
            <FormLabel className="min-w-1/5 text-left">Shift Diff</FormLabel>
            <div className="flex w-full gap-1 justify-between">
              {/* First FormControl for shiftDiffPay */}
              <FormField
                control={form.control}
                name="shiftDiffPay"
                render={({ field }) => (
                  <FormControl className="w-3/4">
                    <Input
                      placeholder="$ More"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                )}
              />

              {/* Second FormControl for shiftDiffType */}
              <FormField
                control={form.control}
                name="shiftDiffType"
                render={({ field }) => (
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          tabIndex={0}
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? shiftDiff.find((s) => s.value === field.value)
                                ?.label || field.value
                            : "Shift Type (i.e Nights)"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search or enter shift type..."
                            onInput={(e) =>
                              field.onChange(e.currentTarget.value)
                            }
                          />
                          <CommandList>
                            <CommandEmpty>
                              <Button
                                variant="link"
                                onClick={() => {
                                  if (field.value) {
                                    field.onChange(field.value); // Allow manually entered text
                                  }
                                }}
                              >
                                Add &quot;{field.value}&quot;
                              </Button>
                            </CommandEmpty>
                            <CommandGroup>
                              {shiftDiff.map((shift) => (
                                <CommandItem
                                  key={shift.value}
                                  value={shift.label}
                                  onSelect={() => field.onChange(shift.value)}
                                >
                                  {shift.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      shift.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                )}
              />
            </div>
            <FormMessage />
          </FormItem>

          <Button type="submit" className="w-full mt-4" tabIndex={0}>
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
