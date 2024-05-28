

export default function ProgressionBarComponent({etapa}){
    const preenchido = "#475569"

    return (
      <div className="flex justify-center mt-5">
        <div className="flex justify-around w-3/4">
        <div className='rounded-full border-solid border-2 border-slate-600 bg-slate-600 h-16 w-16 shadow-lg text-white grid place-content-center text-4xl'>1</div>
          <div className={`self-center h-px w-1/4 ${etapa > 1 ? 'border-solid': 'border-dashed'} shadow-lg border-b-2 border-slate-400`}></div>
          <div className={`rounded-full shadow-lg ${etapa > 1 ? 'border-solid border-slate-600 bg-slate-600 text-white': 'border-dashed border-slate-400'} border-2 h-16 w-16 grid place-content-center text-4xl`}>2</div>
          <div className={`self-center h-px w-1/4 ${etapa > 2 ? 'border-solid': 'border-dashed'} shadow-lg border-b-2 border-slate-400`}></div>
          <div className={`rounded-full shadow-lg ${etapa > 2 ? 'border-solid border-slate-600 bg-slate-600 text-white': 'border-dashed border-slate-400'} border-2 h-16 w-16 grid place-content-center text-4xl`}>3</div>
        </div>
      </div>
    );
}