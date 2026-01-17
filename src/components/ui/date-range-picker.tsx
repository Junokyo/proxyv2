'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  endOfMonth,
  endOfYear,
  format,
  isEqual,
  startOfDay,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface DateRangePickerProps {
  className?: string;
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
}

export default function DateRangePicker({ className, value, onChange }: DateRangePickerProps) {
  const today = new Date();

  const presets = [
    { label: 'Today', range: { from: today, to: today } },
    { label: 'Yesterday', range: { from: subDays(today, 1), to: subDays(today, 1) } },
    { label: 'Last 7 days', range: { from: subDays(today, 6), to: today } },
    { label: 'Last 30 days', range: { from: subDays(today, 29), to: today } },
    { label: 'Month to date', range: { from: startOfMonth(today), to: today } },
    { label: 'Last month', range: { from: startOfMonth(subMonths(today, 1)), to: endOfMonth(subMonths(today, 1)) } },
    { label: 'Year to date', range: { from: startOfYear(today), to: today } },
    { label: 'Last year', range: { from: startOfYear(subYears(today, 1)), to: endOfYear(subYears(today, 1)) } },
  ];

  const defaultPreset = presets[2];
  const [date, setDate] = useState<DateRange | undefined>(value || defaultPreset.range);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(defaultPreset.label);

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    setSelectedPreset(null);
    onChange?.(newDate);
  };

  const handlePresetClick = (preset: (typeof presets)[0]) => {
    setDate(preset.range);
    setSelectedPreset(preset.label);
    onChange?.(preset.range);
  };

  useEffect(() => {
    const matchedPreset = presets.find(
      (preset) =>
        date?.from &&
        date?.to &&
        isEqual(startOfDay(preset.range.from), startOfDay(date.from)) &&
        isEqual(startOfDay(preset.range.to), startOfDay(date.to)),
    );
    setSelectedPreset(matchedPreset?.label || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    if (value) setDate(value);
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button id="date-range" variant="outline" mode="input" className={cn('w-[280px]', className)}>
          <CalendarDays />
          {date?.from ? (
            date.to ? (
              <span>
                {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
              </span>
            ) : (
              format(date.from, 'LLL dd, y')
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex max-sm:flex-col">
          <div className="relative border-border max-sm:order-1 max-sm:border-t sm:w-32">
            <div className="h-full border-border sm:border-e py-2">
              <div className="flex flex-col px-2 gap-[2px]">
                {presets.map((preset, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className={cn('h-8 w-full justify-start', selectedPreset === preset.label && 'bg-accent')}
                    onClick={() => handlePresetClick(preset)}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
