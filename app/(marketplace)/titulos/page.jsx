'use client'
import NavBar from '../../components/Navbar'
import React, { useState, useEffect } from 'react';
import dateCompare from "../lib/dateCompare"
import FilterMK from './components/FilterMK'
import TitleCard from './components/products/TitleCard'
import { getTitles } from './api/get-title'
import { LoaderCircle } from 'lucide-react';
import { getUser } from '../../login/api/login';

export default function Titulos() {
  const [titulos, setTitulos] = useState(null)
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [priceMin, setPriceMin] = useState(null);
  const [priceMax, setPriceMax] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [filteredTitles, setFilteredTitles] = useState(null);
  const [limit, setLimit] = useState(0);
  const [load, setLoad] = useState(false);
 

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await getUser();
      if (error) {
        console.error('Error fetching user:', error.message);
      } else {
        console.log('Session:', data);
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const _titles = await getTitles(limit);
        setTitulos(_titles);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
    fetchTitles();
  }, [limit]);

  useEffect(() => {
    const filteredTitle = () => {
      let filtered = titulos;
      if (filtered && filtered.length > 0)
        filtered = filtered.filter(title => title.status_titulo === "ofertado");
      if (selectedTypes.length > 0) {
        filtered = filtered.filter(title => selectedTypes.includes(title.tipo_titulo));
      }
      if (priceMin != null) {
        filtered = filtered.filter(title => parseFloat(priceMin) <= parseFloat(title.valor_ofertado));
      }
      if (priceMax != null) {
        filtered = filtered.filter(title => parseFloat(priceMax) >= parseFloat(title.valor_ofertado));
      }
      if (dateStart != null) {
        filtered = filtered.filter(title => dateStart <= dateCompare(title.data_vencimento));
      }
      if (dateEnd != null) {
        filtered = filtered.filter(title => dateEnd >= dateCompare(title.data_vencimento));
      }
      return filtered;
    }
    setFilteredTitles(filteredTitle());
  }, [titulos, selectedTypes, priceMin, priceMax, dateStart, dateEnd]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setLoad(true)
        setTimeout(() => {
          setLimit(lmt => lmt + 10);
          setLoad(false)
        }, 500);
      }
    })
    intersectionObserver.observe(document.querySelector('#sentinela'));
    return () => intersectionObserver.disconnect();
  }, []);

  return (
    <>      
      <div className='text-gray-900'>
        <NavBar />
        <div>
          <main className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
            <section className="pb-44">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <FilterMK
                  setDateStart={setDateStart}
                  setDateEnd={setDateEnd}
                  setSelectedTypes={setSelectedTypes}
                  selectedTypes={selectedTypes}
                  setPriceMin={setPriceMin}
                  setPriceMax={setPriceMax} />
                <div className="lg:col-span-3">
                  <div>
                    <div className="bg-white p-5 flex">
                      <div className="mx-auto py-5 px-5 w-full rounded-xl shadow">
                        <div className=''>
                          <TitleCard
                            setLimit={setLimit}
                            props={filteredTitles} />
                          <div className={`flex w-full justify-center mt-3 min-h-[32px]`}>
                            <LoaderCircle
                              className={`${load ? 'flex' : 'hidden'} animate-spin justify-self-center-center`}
                              size={32} />
                          </div>
                          <span id='sentinela' className='container'></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  )
}
