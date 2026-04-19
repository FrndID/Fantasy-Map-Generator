declare global {
  var uploadStateFlag: () => void;
  var clearAllFlags: () => void;
  var updateFlagStateSelect: () => void;
}

const updateFlagStateSelect = (): void => {
  const select = document.getElementById("flagStateSelect") as HTMLSelectElement;
  if (!select) return;

  select.innerHTML = '<option value="">-- Select a state --</option>';

  pack.states.forEach((state) => {
    if (!state.i || state.removed) return;
    const option = document.createElement("option");
    option.value = state.i.toString();
    option.textContent = `${state.i}: ${state.name}`;
    if (state.flag) option.textContent += " ✓"; // Show checkmark if has flag
    select.appendChild(option);
  });
};

const uploadStateFlag = (): void => {
  const stateSelect = document.getElementById("flagStateSelect") as HTMLSelectElement;
  const imageInput = document.getElementById("flagImageInput") as HTMLInputElement;

  if (!stateSelect.value) {
    tip("Please select a state", false, "error");
    return;
  }

  if (!imageInput.files || !imageInput.files[0]) {
    tip("Please select an image file", false, "error");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const dataURL = e.target?.result as string;
    const stateId = parseInt(stateSelect.value);

    pack.states[stateId].flag = dataURL;
    drawFlags();

    tip(`Flag uploaded for ${pack.states[stateId].name}!`, true, "success");
    imageInput.value = ""; // Clear input
    updateFlagStateSelect(); // Update select dengan checkmark
  };

  reader.readAsDataURL(imageInput.files[0]);
};

const clearAllFlags = (): void => {
  pack.states.forEach((state) => {
    if (state.i && !state.removed) {
      state.flag = undefined;
    }
  });

  drawFlags();
  tip("All flags cleared!", true, "success");
  updateFlagStateSelect();
};

window.uploadStateFlag = uploadStateFlag;
window.clearAllFlags = clearAllFlags;
window.updateFlagStateSelect = updateFlagStateSelect;
