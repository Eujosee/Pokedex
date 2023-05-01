import React, { useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

var MAX_ITEMS = 9; //o máximo de botões na páginação, usar sempre número impar
var width = window.matchMedia("(max-width: 640px)")

if (width.matches) {
    MAX_ITEMS = 3
}
const MAX_LEFT = (MAX_ITEMS - 1) / 2; //o máximo de botões na esquerda, o menos 1 é pra tirar o botão atual

//limit é o numero máximo por página, total o total de items
//offset é pra saber onde está na páginação, serve para pular os itens das paginas anteriores
export default function Pagination ({ limit, total, offset, setOffset }){
  const current = offset ? offset / limit + 1 : 1; //página atual
  const pages = Math.ceil(total / limit); //quantidade total de paginas. A divisão não pode ser quebrada, por isso o math.ceil
  const first = Math.max(current - MAX_LEFT, 1); //primeira página. Aqui o math.max serve para não haver botões com numeros negativos

  function onPageChange(page) {
    setOffset((page - 1) * limit);
  }

  useEffect(() => {
  }, [total])

  return (
    <ul className="flex flex-row justify-center items-center md:gap-x-2 mb-10 w-fit max-w-full lg:w-fit bg-gray-900 text-white rounded-3xl px-4 shadow-2xl font-bold">
        <li>
          <button
            onClick={() => onPageChange(1)}
            disabled={current === 1}
            className="p-2 rounded hover:bg-gray-800"
          >
            Primeira
          </button>
        </li>
      <li className="flex items-center justify-center">
        <button
          onClick={() => onPageChange(current - 1)}
          disabled={current === 1}
          aria-label="Voltar"
          className=" bg-gray-900 hover:bg-gray-800 rounded-full shadow-xl"
        >
          <HiChevronLeft size={40}/>
        </button>
      </li>
      {/* constroi um array a partir da quantidade de páginas
            limitando pela quantidade máxima de items(botoes) */}
      {Array.from({ length: Math.min(MAX_ITEMS, pages) })
        .map((_, index) => index + first)
        .map((page) => page <= pages ? (
          <li  key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={
                page === current
                  ? "bg-white text-gray-900 p-2 px-4 rounded-md shadow-2xl"
                  : "p-4 rounded-md hover:bg-gray-800"
              }
            >
              {page}
            </button>
          </li>
        ) : "")}
        <li className="flex items-center justify-center">
        <button
          onClick={() => onPageChange(current + 1)}
          disabled={current === pages}
          aria-label="Avançar"
          className=" bg-gray-900 hover:bg-gray-800 rounded-full shadow-xl"
        >
          <HiChevronRight size={40}/>
        </button>
      </li>
      <li>
        <button
          onClick={() => onPageChange(pages)}
          disabled={current === pages}
          className="p-2 rounded hover:bg-gray-800"
        >
             Última
        </button>
      </li>
    </ul>
  );
};
