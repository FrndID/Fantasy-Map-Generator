declare global {
  var uploadStateFlagFunction: () => void;
  var clearAllFlagsFunction: () => void;
  var updateFlagStateSelectFunction: () => void;
}

const updateFlagStateSelectFunction = (): void => {
  const select = document.getElementById("flagStateSelect") as HTMLSelectElement;
  if (!select) return;

  select.innerHTML = '<option value="">-- Select a state --</option>';

  pack.states.forEach((state) => {
    if (!state.i || state.removed) return;
    const option = document.createElement("option");
    option.value = state.i.toString();
    option.textContent = `${state.i}: ${state.name}`;
    if (state.flag) option.textContent += " ✓";
    select.appendChild(option);
  });
};

const uploadStateFlagFunction = (): void => {
  const stateSelect = document.getElementById("flagStateSelect") as HTMLSelectElement;
  const imageInput = document.getElementById("flagImageInput") as HTMLInputElement;

  if (!stateSelect?.value) {
    tip("Please select a state", false, "error");
    return;
  }

  if (!imageInput?.files?.[0]) {
    tip("Please select an image file", false, "error");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const dataURL = e.target?.result as string;
    const stateId = parseInt(stateSelect.value, 10);

    pack.states[stateId].flag = dataURL;
    drawFlags();

    tip(`Flag uploaded for ${pack.states[stateId].name}!`, true, "success");
    imageInput.value = "";
    updateFlagStateSelectFunction();
  };

  reader.readAsDataURL(imageInput.files[0]);
};

const clearAllFlagsFunction = (): void => {
  pack.states.forEach((state) => {
    if (state.i && !state.removed) {
      state.flag = undefined;
    }
  });

  drawFlags();
  tip("All flags cleared!", true, "success");
  updateFlagStateSelectFunction();
};

window.uploadStateFlagFunction = uploadStateFlagFunction;
window.clearAllFlagsFunction = clearAllFlagsFunction;
window.updateFlagStateSelectFunction = updateFlagStateSelectFunction;

// Shortcuts for HTML onclick
window.uploadStateFlag = uploadStateFlagFunction;
window.clearAllFlags = clearAllFlagsFunction;
window.updateFlagStateSelect = updateFlagStateSelectFunction;
