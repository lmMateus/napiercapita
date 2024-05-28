"use client"
import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { ptBR } from 'date-fns/locale'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({
  className,
  onDateChange,
}) {
  const currentYear = new Date().getFullYear()
  const [date, setDate] = React.useState({
    from: null,
    to: null,
  })

  const handleDateChange = (newDate) => {
    try{
      setDate(newDate);
      if (onDateChange) {
        // Convertendo as datas para o formato desejado
        const fromDate = newDate.from.toISOString();
        const toDate = newDate.to.toISOString();
        onDateChange({ from: fromDate, to: toDate });
      }
    } catch(err) {console.log("Erro ao obter data")}

  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd 'de' LLL 'de' yyyy", { locale: ptBR })} -{" "}
                  {format(date.to, "dd 'de' LLL 'de' yyyy", { locale: ptBR })}
                </>
              ) : (
                format(date.from, "dd 'de' LLL 'de' yyyy", { locale: ptBR })
              )
            ) : (
              <span>Selecione uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" side="bottom">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
