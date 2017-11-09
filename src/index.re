open Webapi.Dom;

let map = (f) =>
fun
| Some((v)) => Some(f(v))
| None => None;

let createTable = ((rows: int, columns: int)) => {
  let table = document |> Document.createElement("table");
  Element.setClassName(table, "board");
  for (r in 0 to rows-1) {
    let tr = document |> Document.createElement("tr");
    for (c in 0 to columns-1) {
      let td = document |> Document.createElement("td");
      Element.setId(td, {j|$r-$c|j});
      Element.appendChild(td, tr);
    };
    Element.appendChild(tr, table);
  };
  table;
};


let size = (40, 60);

let board = Board.make(size);
let table = createTable(size);

let root = document 
  |> Document.getElementById("root")
  |> map(Element.appendChild(table));
