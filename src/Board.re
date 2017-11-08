type coordinates = (int, int);

type board = {
  width: int,
  height: int,
  cells: array(int),
};


let x = None;

let indexFor = ((row, col):coordinates, board:board) => {
  if (row < 0 || row >= board.height || col < 0 || col >= board.width) None else Some(row * board.width + col)
};

let getCell = (coords:coordinates, board:board) => {
  let index = indexFor(coords, board);
  switch index {
    | None => 0
    | Some(i) => board.cells[i]
  };
};

let setCell = (value: int, coords:coordinates, board:board) => {
  let index = indexFor(coords, board);
  switch index {
    | None => ()
    | Some(i) => board.cells[i] = value
  };
};

let toggleCell = (coords:coordinates, board:board) => {
  let index = indexFor(coords, board);
  switch index {
    | None => ()
    | Some(i) => board.cells[i] = if(board.cells[i] === 0) 1 else 0;
  };
};

let livingNeighbors = ((row, col):coordinates, board:board) => {
  getCell((row - 1, col - 1), board) +
  getCell((row - 1, col), board) +
  getCell((row - 1, col + 1), board) +

  getCell((row, col - 1), board) +
  /* skip ourselves */
  getCell((row, col + 1), board) +

  getCell((row + 1, col - 1), board) +
  getCell((row + 1, col), board) +
  getCell((row + 1, col + 1), board)
};

let conwayRule = (cellValue: int, livingNeighbors: int) => {
  let isAlive = cellValue === 1;
  if(isAlive) {
    if(livingNeighbors === 2 || livingNeighbors === 3) 1 else 0;
  } else {
    if(livingNeighbors === 3) 1 else 0;
  }
};

let tick = (present: board, future: board, ~rule=conwayRule, ()) => {
  for (r in 0 to future.height) {
    for (c in 0 to future.width) {
      let coords = (r, c);
      let nextCell = rule(getCell(coords, present), livingNeighbors(coords, present));
      setCell(nextCell, coords, future);
    };
  };
  future;
};

let make = ((w: int, h: int)) => {
  {
    width: w,
    height: h,
    cells: Array.make(w*h, 0)
  };
};
