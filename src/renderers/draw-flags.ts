import { minmax, rn } from "../utils";
import type { State } from "../modules/states-generator";

declare global {
  var drawFlags: () => void;
}

interface FlagNode {
  i: number;
  x: number;
  y: number;
  size: number;
}

const flagsRenderer = (): void => {
  TIME && console.time("drawFlags");
  const { states } = pack;

  // Filter states yang memiliki flag dan tidak removed
  const validStates = states.filter(
    (s) => s.i && !s.removed && s.flag && s.flag.length > 0,
  );

  if (validStates.length === 0) {
    TIME && console.timeEnd("drawFlags");
    return;
  }

  // Hitung ukuran flag dinamis berdasarkan jumlah state dan ukuran peta
  const getFlagSize = (): number => {
    const startSize = minmax((graphHeight + graphWidth) / 60, 15, 80);
    const statesMod =
      1 + validStates.length / 100 - (15 - validStates.length) / 200;
    const sizeMod = +flags.select("#stateFlags").attr("data-size") || 1;
    return rn((startSize / statesMod) * sizeMod);
  };

  const flagSize = getFlagSize();

  // Build flag nodes dari state data
  const flagNodes: FlagNode[] = validStates.map((state) => {
    const [x, y] = state.pole || pack.cells.p[state.center!];
    return {
      i: state.i,
      x: rn(x, 2),
      y: rn(y, 2),
      size: flagSize,
    };
  });

  // Render flag images
  const flagString = flagNodes
    .map(
      (d) =>
        `<image data-i="${d.i}" x="${rn(d.x - d.size / 2)}" y="${rn(d.y - d.size / 2)}" width="${d.size}" height="${d.size}" href="${
          states[d.i].flag
        }" preserveAspectRatio="xMidYMid meet" style="pointer-events: none; opacity: 0.8;" />`,
    )
    .join("");

  flags.select("#stateFlags").html(flagString);

  TIME && console.timeEnd("drawFlags");
};

window.drawFlags = flagsRenderer;
