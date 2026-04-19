declare global {
  var uploadStateFlag: () => void;
  var clearAllFlags: () => void;
  var updateFlagStateSelect: () => void;
}

const updateFlagStateSelectImpl = (): void => {
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

const uploadStateFlagImpl = (): void => {
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
    updateFlagStateSelect();
  };

  reader.readAsDataURL(imageInput.files[0]);
};

const clearAllFlagsImpl = (): void => {
  pack.states.forEach((state) => {
    if (state.i && !state.removed) {
      state.flag = undefined;
    }
  });

  drawFlags();
  tip("All flags cleared!", true, "success");
  updateFlagStateSelect();
};

window.updateFlagStateSelect = updateFlagStateSelectImpl;
window.uploadStateFlag = uploadStateFlagImpl;
window.clearAllFlags = clearAllFlagsImpl;
