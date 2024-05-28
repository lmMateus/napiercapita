'use client'
import React, { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FilterMK({ setDateStart, setDateEnd, 
  setSelectedTypes, selectedTypes, setPriceMin, setPriceMax, setStatus, selectedStatus }) {

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(false);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleTypeChange = (event) => {
    const { value, checked } = event.target;
    setSelectedTypes(prevTypes => {
      if (checked) {
        return [...prevTypes, value]; // Adiciona o tipo selecionado ao array
      } else {
        return prevTypes.filter(type => type !== value); // Remove o tipo desmarcado do array
      }
    });
  };

  const handleStatusChange = (event) => {
    const { value, checked } = event.target;
    setSelectedTypes(prevTypes => {
      if (checked) {
        return [...prevTypes, value]; // Adiciona o tipo selecionado ao array
      } else {
        return prevTypes.filter(type => type !== value); // Remove o tipo desmarcado do array
      }
    });
  };

  const handleFilterPriceMin = (price) => {
    if (price.target.value == "") {
      return setPriceMin(null)
    }
    return setPriceMin(price.target.value)
  }

  const handleFilterPriceMax = (price) => {
    if (price.target.value == "") {
      return setPriceMax(null)
    }
    return setPriceMax(price.target.value)
  }

  const handleDateStart = (date) => {
    if (date.target.value == "") {
      return setDateStart(null)
    }
    return setDateStart(date.target.value)
  }
  const handleDateEnd = (date) => {
    if (date.target.value == "") {
      return setDateEnd(null)
    }
    return setDateEnd(date.target.value)
  }

  return (
    <>
      <div>
        <nav className={`lg:hidden start-0 fixed bg-white w-full p-2 z-20`}>
          <button className={`flex gap-x-2 rounded-md p-1 `} onClick={toggleSidebar} >
            <span className='text-lg font-semibold'>
              Filtros
            </span>
            <Filter />
          </button>
        </nav>
        <div className={`w-64 fixed md:absolute start-0 h-full lg:h-auto bg-gray-50 z-30
        text-slate-900/90 p-4 shadow-lg 
        ${isOpen ? 'overflow-hidden overscroll-none' : '-translate-x-full'} lg:translate-x-0`}>
          <nav>
            <button className={`block lg:hidden absolute p-2 top-0 right-0 m-2`} onClick={toggleSidebar} >
              <X className="hover:text-slate-400" size={22} />
            </button>
            <span className="lg:relative text-lg font-semibold">Filtros</span>
            <form className='mt-6 lg:mt-0'>
              <Accordion type="single" collapsible>
                <AccordionItem value='item'>
                  <AccordionTrigger className='hover:no-underline'>Títulos</AccordionTrigger>
                  <AccordionContent className='space-y-3'>
                    {['Nota Promissória', 'Crédito Tributário',
                      'Cheque', 'Debênture', 'Factoring'].map((type, index) => (
                        <div className="flex items-center" key={index}>
                          <input
                            id={`filter-category-${index}`}
                            type="checkbox"
                            value={type}
                            checked={selectedTypes.includes(type)}
                            className="h-4 w-4 rounded border-gray-300"
                            onChange={handleTypeChange}
                          />
                          <label htmlFor={`filter-category-${index}`}
                            className="ml-3 text-sm text-gray-600">
                            {type}
                          </label>
                        </div>
                      ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion type="single" collapsible>
                <AccordionItem value='item'>
                  <AccordionTrigger className='hover:no-underline'>Data de vencimento</AccordionTrigger>
                  <AccordionContent className='space-y-3'>
                    <div className='flex items-center'>
                      <div className='p-2 text-sm space-y-5'>
                        <div>
                          <span>Entre:</span>
                        </div>
                        <div>
                          <span>Até:</span>
                        </div>
                      </div>
                      <div className='space-y-2'>
                        <input className='bg-white p-1 rounded-lg border-2 border-gray-100'
                          type="date" name="start" id="start" onChange={handleDateStart} />
                        <input className='bg-white p-1 rounded-lg border-2 border-gray-100'
                          type="date" name="end" id="end" onChange={handleDateEnd} />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion type="single" collapsible>
                <AccordionItem value='item'>
                  <AccordionTrigger className='hover:no-underline'>Valor</AccordionTrigger>
                  <AccordionContent className='border-b border-gray-200 space-y-3'>
                    <div className="space-x-1">
                      <div className="flex items-center space-x-2">
                        <input type="number" onInput={handleFilterPriceMin}
                          className="bg-gray-50 border border-gray-400 text-gray-900 
                          text-sm rounded-lg block w-full ps-3 p-2.5"
                          placeholder="Min." />
                        <input type="number" onInput={handleFilterPriceMax}
                          className="bg-gray-50 border border-gray-400 text-gray-900
                          text-sm rounded-lg block w-full ps-3 p-2.5"
                          placeholder="Max." />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>  
              <Accordion type="single" collapsible>
                <AccordionItem value='item'>
                  <AccordionTrigger className='hover:no-underline'>Status</AccordionTrigger>
                  <AccordionContent className='space-y-3'>
                    {['Antecipados', 'Ofertados'].map((status, index) => (
                        <div className="flex items-center" key={index}>
                          <input
                            id={`filter-category-${index}`}
                            type="checkbox"
                            value={status}
                            checked={selectedStatus.includes(status)}
                            className="h-4 w-4 rounded border-gray-300"
                            onChange={handleStatusChange}
                          />
                          <label htmlFor={`filter-category-${index}`}
                            className="ml-3 text-sm text-gray-600">
                            {status}
                          </label>
                        </div>
                      ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>            
            </form>
          </nav>
        </div>
      </div>
    </>
  );
};