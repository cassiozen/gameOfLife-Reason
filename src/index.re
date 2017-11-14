/* open Webapi.Dom; */
module WebApi = Webapi.Dom;

/* Utilitary Functions */
let random = Random.self_init();

let map = (f) =>
fun
| Some((v)) => Some(f(v))
| None => None;

/* Types */

type cellsT = ref(list(Dom.element));

let cells:cellsT = ref([]);

let createTable = ((rows, columns)) => {
  let table = WebApi.document |> WebApi.Document.createElement("table");
  WebApi.Element.setClassName(table, "board");
  for (r in 0 to rows-1) {
    let tr = WebApi.document |> WebApi.Document.createElement("tr");
    for (c in 0 to columns-1) {
      let td = WebApi.document |> WebApi.Document.createElement("td");
      cells := [td, ...cells^];
      WebApi.Element.setId(td, {j|$r-$c|j});
      WebApi.Element.appendChild(td, tr);
    };
    WebApi.Element.appendChild(tr, table);
  };
  table;
};

let size = (40, 60);

let presentBoard = ref(Board.make(size));
let futureBoard = ref(Board.make(size));

let table = createTable(size);

let root = WebApi.document 
  |> WebApi.Document.getElementById("root")
  |> map(WebApi.Element.appendChild(table));

let paint = () => {
  List.iter((td)=> {
    let id = WebApi.Element.id(td);
    let coords = Js.String.split("-", id);
    
    let cell = Board.getCell((int_of_string(coords[1]), int_of_string(coords[0])), presentBoard^);
    Js.log(cell);
    if(cell === 0){
      WebApi.Element.setClassName(td, "dead");
    } else {
      WebApi.Element.setClassName(td, "alive");
    }
  }, cells^);
};


let step = (rules) => {
  Board.tick(presentBoard^, futureBoard^, ~rule=rules, ());

  /* Swap the present and future boards
  (The future board is now the present, and we'll re-use the present
  board for the next step). */
  let temp = presentBoard^;
  presentBoard := futureBoard^;
  futureBoard := temp;
  paint();
};

let randomizeBoard = (_event) => {
  step((_cellValue, _livingNeighbors) => {
    Random.int(2);
  });
};

WebApi.document 
  |> WebApi.Document.getElementById("reset_btn")
  |> map(WebApi.Element.addEventListener("click", randomizeBoard));





/* // Connect #step_btn to the step function
document.getElementById('step_btn')
  .addEventListener('click', game.step)

document.getElementById('play_btn')
  .addEventListener('click', game.togglePlaying)

document.getElementById('clear_btn')
  .addEventListener('click', game.clear)

document.getElementById('reset_btn')
  .addEventListener('click', game.random) */