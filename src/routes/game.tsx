import { For, createSignal, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { useNavigate } from "solid-start";
import { twMerge } from "tailwind-merge";
import { Button } from "~/components";

const COLUMNS = 9;

export default function GamePage() {
  const navigate = useNavigate();

  let availableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [grid, setGrid] = createStore<number[]>([]);
  const [matched, setMatched] = createStore<boolean[]>([]);
  const [selected, setSelected] = createSignal<number | undefined>();

  onMount(() => {
    init();
  });

  const init = () => {
    setGrid(getRandomNumbers(35));
    setMatched(Array.from(new Array(grid.length)).map(() => false));
  };

  const check = (index: [number, number]): boolean => {
    index.sort((a, b) => a - b);
    // check if not already matched
    if (matched[index[0]] || matched[index[1]]) {
      return false;
    }
    // check if same or sum to 10
    if (
      grid[index[0]] !== grid[index[1]] &&
      grid[index[0]] + grid[index[1]] !== 10
    ) {
      return false;
    }

    // check if all numbers between are already matched
    if (getColumn(index[0]) == getColumn(index[1])) {
      for (let i = index[0] + COLUMNS; i < index[1]; i += COLUMNS) {
        if (i > matched.length || !matched[i]) return false;
      }
      return true;
    }
    if (getForwardDiagonal(index[0]) === getForwardDiagonal(index[1])) {
      for (let i = index[0] + COLUMNS + 1; i < index[1]; i += COLUMNS + 1) {
        if (i > matched.length || !matched[i]) return false;
      }
      return true;
    }
    if (getBackwardDiagonal(index[0]) === getBackwardDiagonal(index[1])) {
      for (let i = index[0] + COLUMNS - 1; i < index[1]; i += COLUMNS - 1) {
        if (i > matched.length || !matched[i]) return false;
      }
      return true;
    }
    for (let i = index[0] + 1; i < index[1]; i++) {
      // along row
      if (!matched[i]) return false;
    }
    return true;
  };

  const match = (index: [number, number]) => {
    setMatched(index[0], true);
    setMatched(index[1], true);
    setSelected(undefined);

    availableNumbers = grid
      .filter((_, index) => !matched[index])
      .filter((value, index, array) => {
        return array.indexOf(value) === index;
      })
      .sort();

    if (rowMatched(index[1])) removeRow(index[1]);
    if (rowMatched(index[0])) removeRow(index[0]);

    if (grid.length === 0) {
      navigate("/won");
    }
  };

  const rowMatched = (index: number) => {
    const row = getRow(index) * COLUMNS;
    return matched.slice(row, row + COLUMNS).every((matched) => matched);
  };

  const removeRow = (index: number) => {
    const row = getRow(index) * COLUMNS;
    setGrid(produce((grid) => grid.splice(row, COLUMNS)));
    setMatched(produce((matched) => matched.splice(row, COLUMNS)));
  };

  const onSelection = (index: number) => {
    const s = selected();
    if (s === index) {
      setSelected(undefined);
    } else if (s !== undefined) {
      if (check([s, index])) {
        match([s, index]);
      }
    } else if (!matched[index]) {
      setSelected(index);
    }
  };

  const onNewNumbers = () => {
    const count = matched.reduce((count, matched) => {
      return matched ? count : count + 1;
    }, 0);
    setGrid([...grid, ...getRandomNumbers(count)]);
    setMatched([...matched, ...Array.from(new Array(count)).map(() => false)]);
  };

  const getRow = (index: number) => Math.floor(index / COLUMNS);
  const getColumn = (index: number) => index % COLUMNS;
  const getForwardDiagonal = (index: number) => index % (COLUMNS + 1);
  const getBackwardDiagonal = (index: number) => index % (COLUMNS - 1);
  const getRandomNumbers = (count: number) => {
    return Array.from(new Array(count)).map(
      () =>
        availableNumbers[Math.floor(Math.random() * availableNumbers.length)],
    );
  };

  return (
    <div class="flex h-full w-full select-none flex-col items-center p-4">
      <div class="grid w-full max-w-screen-md grid-cols-9 border-2">
        <For each={grid}>
          {(number, index) => (
            <div
              class={twMerge(
                "flex aspect-square items-center justify-center border-b border-r text-xl active:bg-gray-400",
                selected() === index() ? "bg-gray-400" : "",
                matched[index()] ? "text-gray-600" : "",
              )}
              onClick={() => onSelection(index())}
            >
              {number}
            </div>
          )}
        </For>
      </div>
      <div class="mt-8">
        <Button class="text-sm" onClick={() => onNewNumbers()}>
          New Numbers
        </Button>
      </div>
    </div>
  );
}
