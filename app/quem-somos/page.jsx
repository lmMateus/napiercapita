"use client"
import NavbarHomeComponent from "@/app/components/NavbarHomeComponent";
import QuemSomosImg from "@/public/QuemSomos.jpg"
import Image from "next/image";
import React from "react";
import FooterHomeComponent from "@/app/components/FooterHomeComponent";

export default function QuemSomos() {
    return (
        <>
            <NavbarHomeComponent />

            <header className="text-center py-8 bg-slate-800 text-slate-200">
                <h2 className="text-4xl font-bold">Quem Somos</h2>
            </header>
            <main className="container mx-auto p-8 md:py-12 text-slate-700 text-justify ">
                <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-justify items-center justify-items-center content-center">
                    <div className="md:col-span-2 md:pr-8">
                        <h3 className="text-2xl font-bold mb-4">Nossa História</h3>
                        <p className="text-lg">
                            Nossa história surgiu de uma visão compartilhada por um grupo de amigos apaixonados por tecnologia e inovação.
                        </p>
                        <p className="text-lg">
                            Em 2022, na FATEC Antônio Russo, cinco amigos se identificaram com a ambição de se tornarem rapidamente líderes no cenário tecnológico brasileiro. Nossa jornada para o sucesso foi alimentada pela dedicação, paixão e comprometimento de nossa equipe e parceiros.
                        </p>
                    </div>
                    <div className="md:col-span-1">
                        <Image src={QuemSomosImg} className="w-full rounded-md"/>
                    </div>

                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4">Missão</h3>
                    <p className="text-lg">
                        Nossa missão é promover a transformação tecnológica, conectando pessoas e empresas com as soluções mais avançadas do mercado. Procuramos constantemente oferecer serviços excepcionais que atendam às necessidades em constante evolução de nossos clientes, permitindo-lhes alcançar o sucesso em um mundo cada vez mais digital.
                    </p>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4">Visão</h3>
                    <p className="text-lg">
                        Nossa visão é nos tornarmos o grupo de tecnologia preferido de empresas e pessoas em todo o Brasil. Queremos gerar um impacto positivo no setor de tecnologia, capacitando nossos clientes a inovar, crescer e prosperar em um ambiente digital em constante mudança.
                    </p>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4">Valores</h3>
                    <ul className="list-disc pl-12">
                        <li className="text-lg"><strong>Inovação:</strong> Acreditamos que a inovação é a chave do sucesso e temos o compromisso de buscar constantemente soluções tecnológicas inovadoras.</li>
                        <li className="text-lg"><strong>Qualidade:</strong> Nossa dedicação à excelência e nosso compromisso com a qualidade são o que nos torna confiáveis e confiáveis.</li>
                        <li className="text-lg"><strong>Amizade:</strong> Valorizamos a importância da colaboração e da construção de relacionamentos de longo prazo com nossos clientes e parceiros.</li>
                        <li className="text-lg"><strong>Responsabilidade:</strong> Somos responsáveis perante nossos clientes, nossa equipe e a sociedade em geral, agindo com integridade em tudo o que fazemos.</li>
                        <li className="text-lg"><strong>Foco no Cliente:</strong> Colocamos nossos clientes no centro de tudo o que fazemos, garantindo que suas necessidades sejam atendidas de forma eficaz e eficiente.</li>
                    </ul>
                    <p className="text-lg mt-4">
                        Ao longo do caminho, construímos uma forte reputação baseada em nossa ética de trabalho, integridade e excelência técnica. Estamos entusiasmados em continuar crescendo e evoluindo e convidamos você a fazer parte da nossa história de sucesso. Bem-vindo ao futuro da tecnologia conosco!
                    </p>
                </div>
            </main>
            <FooterHomeComponent />
        </>

    );
}
