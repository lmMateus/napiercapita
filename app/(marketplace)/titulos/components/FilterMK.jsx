'use client'
import React, { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';

export default function FilterMK({ setDateStart, setDateEnd, setSelectedTypes, selectedTypes, setPriceMin, setPriceMax }) {
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
            <span className='font-semibold'>
              Filtros
            </span>
            <Filter />
          </button>
        </nav>
        {/* Aqui */}
        <div className={`w-64 fixed md:absolute start-0 h-full lg:h-auto bg-gray-50 z-30
        text-slate-900/90 p-4 shadow-lg 
        ${isOpen ? 'bloc overflow-hidden overscroll-none' : '-translate-x-full'} lg:translate-x-0`}>
          <nav>
            <button className={`block lg:hidden absolute p-2 top-0 right-0 m-2`} onClick={toggleSidebar} >
              <X className="hover:text-slate-400" size={22} />
            </button>
            <span className="lg:relative hidden text-xl font-semibold">Filtros</span>
            <form>
              <div className="border-b border-gray-200 py-5 space-y-3">
                <h3 className="text-md font-medium text-gray-900 mb-2 tracking-wider">Títulos</h3>
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
              </div>
              <div className="border-b border-gray-200 py-5">
                <h3 className="text-md font-medium text-gray-900 mb-2 tracking-wider">Data de vencimento</h3>
                <div className="pt-3">
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
                </div>
              </div>
              <div className="border-b border-gray-200 py-6">
                <h3 className="text-md font-medium text-gray-900 mb-2 tracking-wider">Valor da oferta</h3>
                <div className="pt-6" id="filter-section-1">
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
                </div>
              </div>
            </form>
          </nav>
        </div>
      </div>
    </>
  );
};