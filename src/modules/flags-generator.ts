declare global {
  var generateRandomFlags: () => void;
}

const flagColors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FF6600",
  "#6600FF",
  "#00FF99",
  "#FF0099",
  "#99FF00",
  "#0099FF",
];

const generateRandomFlagsFunction = (): void => {
  pack.states.forEach((state, index) => {
    if (!state.i || state.removed) return;

    const color = flagColors[index % flagColors.length];
    const pattern = Math.floor(Math.random() * 3);

    let svg = "";
    if (pattern === 0) {
      svg = `<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50'>
        <rect width='50' height='50' fill='${color}'/>
      </svg>`;
    } else if (pattern === 1) {
      svg = `<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50'>
        <rect width='50' height='50' fill='${color}'/>
        <rect width='50' height='16.67' fill='white'/>
        <rect width='50' height='16.67' y='33.33' fill='white'/>
      </svg>`;
    } else {
      svg = `<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50'>
        <rect width='50' height='50' fill='${color}'/>
        <rect width='50' height='50' fill='none' stroke='gold' stroke-width='2'/>
      </svg>`;
    }

    const encoded = btoa(svg);
    state.flag = `data:image/svg+xml;base64,${encoded}`;
  });

  drawFlags();
  tip("Flags generated successfully!", true, "success", 3000);
};

window.generateRandomFlags = generateRandomFlagsFunction;
