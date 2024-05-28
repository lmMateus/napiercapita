import React, { useState } from 'react';
import  formatDate  from "../../../lib/formatDate"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarDays } from 'lucide-react';

export function DatePickerFilter({ onSelect }) {
  const [date, setDate] = useState(null); // Inicialize com null ou outra data padrão se preferir  
    const handleDateSelect = (date) => {
    setDate(date);
    onSelect(date); // Chama a função de callback do pai com a data selecionada
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarDays size={18} />
          <div className='pl-2'>
            {date ? formatDate(date) : <span>Escolha a data</span>}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
