'use client';

import { useState } from 'react';
import { addDays, format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function TestDatePicker() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
  });

  return (
    <div className="p-10">
      <h1 className="mb-6 text-2xl font-bold">Test DatePicker</h1>

      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant="outline" mode="input">
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
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <div className="mt-6">
        <p>Selected: {date?.from ? format(date.from, 'PPP') : 'None'} - {date?.to ? format(date.to, 'PPP') : 'None'}</p>
      </div>
    </div>
  );
}
