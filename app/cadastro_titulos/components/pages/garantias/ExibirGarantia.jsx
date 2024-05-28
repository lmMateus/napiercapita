import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ExibirGarantia = ({ data }) => {
  let componente;
  switch (data.tipo_garantia) {
    case "bancaria":
      componente = (
        <div className="w-4/5">
          <h3 className="font-bold text-xl text-slate-900">Garantia Bancária</h3>

          <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-slate-600">Valor da Garantia</TableHead>
            <TableHead>Número do Banco</TableHead>
            <TableHead>Número da Conta</TableHead>
            <TableHead >Tipo da Conta</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              {data.valor_garantia}
            </TableCell>
            <TableCell>{data.garantia_num_conta}</TableCell>
            <TableCell>{data.garantia_num_banco}</TableCell>
            <TableCell>
              {data.garantia_tipo_conta}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table></div>
        
      );
      break;
    case "automovel":
      componente = (
        <div className="w-4/5">
          <h3 className="font-bold text-xl text-slate-900">Garantia Veiculo</h3>

          <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-slate-600">Valor da Garantia</TableHead>
            <TableHead>Renavan do Veiculo</TableHead>
            <TableHead>Placa do Veiculo</TableHead>
            <TableHead >Tipo de Veiculo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              {data.valor_garantia}
            </TableCell>
            <TableCell>{data.garantia_renavan}</TableCell>
            <TableCell>{data.garantia_placa}</TableCell>
            <TableCell>
              {data.garantia_tipo}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table></div>
        
      );
      break;
    case "imobiliaria":
      componente = (
        <div className="w-4/5">
          <h3 className="font-bold text-xl text-slate-900">Garantia Imobiliária</h3>

          <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-slate-600">Valor da Garantia</TableHead>
            <TableHead>Matricula do Imóvel</TableHead>
            <TableHead>Registro do Cartório</TableHead>
            <TableHead >Comarca do Imóvel</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              {data.valor_garantia}
            </TableCell>
            <TableCell>{data.garantia_matricula}</TableCell>
            <TableCell>{data.garantia_cartorio}</TableCell>
            <TableCell>
              {data.garantia_comarca}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table></div>
        
      );
      break;
    case "outro":
      componente = (
        <div className="w-4/5">
          <h3 className="font-bold text-xl text-slate-900">Garantia</h3>

          <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-slate-600">Valor da Garantia</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead >Tipo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              {data.valor_garantia}
            </TableCell>
            <TableCell>{data.garantia_descricao}</TableCell>
            <TableCell>{data.garantia_tipo}</TableCell>
          </TableRow>
        </TableBody>
      </Table></div>
        
      );
      break;
    default:
      break;
  }
  return <div>{componente}</div>;
};
