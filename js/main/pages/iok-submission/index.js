function validateRequiredFieldTextBox(id) {
  const formControl = document.getElementById(id);
  let input = formControl.querySelector("input");
  if (!input) {
    input = formControl.querySelector("textarea");
  }
  const errorDiv = formControl.querySelector(".error-container-2");
  if (input.value && input.value.length > 0) {
    gsap.to(errorDiv, {
      display: "none",
    });
    $(formControl).removeClass("has-error");
    return true;
  }
  gsap
    .timeline()
    .to(errorDiv, {
      display: "flex",
    })
    .to(
      errorDiv.children,
      {
        display: "flex",
      },
      "<"
    );
  $(formControl).addClass("has-error");
  return false;
}

function validateValidUrl(formControl) {
  let input = formControl.querySelector("input");
  let isValid = true;
  const errorDiv = formControl.querySelector(".error-container-2");
  const [_, required] = gsap.utils.toArray(errorDiv.children);

  try {
    new URL(input.value);
  } catch (err) {
    isValid = false;
  }

  if (isValid) {
    gsap.to(errorDiv, {
      display: "none",
    });
    $(formControl).removeClass("has-error");
    return true;
  }

  errorDiv.querySelector("p").textContent =
    "Please enter a valid URL.";
  gsap
    .timeline()
    .to(errorDiv, {
      display: "flex",
    })
    .to(required, {
      display: "none",
    });
  $(formControl).addClass("has-error");
  return false;
}

function validateEmail(id) {
  const formControl = document.getElementById(id);
  if (!formControl) {
    console.error(`Element with id ${id} not found.`);
    return false;
  }

  const input = formControl.querySelector("input");
  if (!input) {
    console.error(`No input found in element with id ${id}.`);
    return false;
  }

  const errorDiv = formControl.querySelector(".error-container-2");
  const email = input.value.trim();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (email.length === 0) {
    errorDiv.querySelector("p").textContent =
      "Representative email is required.";
    gsap
      .timeline()
      .to(errorDiv, { display: "flex" })
      .to(errorDiv.children, { display: "flex" }, "<");
    $(formControl).addClass("has-error");
    return false;
  }

  if (!email.match(emailPattern)) {
    errorDiv.querySelector("p").textContent =
      "Invalid Email Address.";
    gsap
      .timeline()
      .to(errorDiv, { display: "flex" })
      .to(errorDiv.children, { display: "flex" }, "<");
    $(formControl).addClass("has-error");
    return false;
  }

  gsap.to(errorDiv, { display: "none" });
  $(formControl).removeClass("has-error");
  return true;
}

function validateCheckbox(id) {
  const formControl = document.getElementById(id);
  const errorDiv = formControl.querySelector(".error-container-2");
  const input = formControl.querySelector("input");

  if (input.checked) {
    gsap.to(errorDiv, {
      display: "none",
    });
    $(formControl).removeClass("has-error");
    return true;
  }

  gsap.to(errorDiv, {
    display: "flex",
  });
  $(formControl).addClass("has-error");

  return false;
}

function removeNameTagsOfCheckboxes(id) {
  const formControl = document.getElementById(id);
  const inputs = formControl.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    let elem = inputs[i];
    if (elem.id.endsWith("-hidden")) {
      continue;
    }
    elem.removeAttribute("data-name");
    elem.removeAttribute("name");
  }
}

function validateCheckboxes(id, fieldName, maxCheckboxes = 0) {
  let minimum = 1;
  const formControl = document.getElementById(id);
  const errorDiv = formControl.querySelector(".error-container-2");
  const inputs = formControl.querySelectorAll("input");
  const labels = document.getElementById(id).querySelectorAll("label");
  let checkedCount = 0;
  let checkBoxLabels = "";
  for (let i = 0; i < inputs.length; i++) {
    let elem = inputs[i];
    if (elem.id.endsWith("-hidden")) {
      continue;
    }
    if (elem.checked) {
      ++checkedCount;
      let label = labels[i].querySelector(".w-form-label").innerHTML;
      checkBoxLabels += label + ",";
    }
  }
  // Add hidden element to aggregate the checkbox values
  let checkBoxHiddenId = `${id}-hidden`;
  if (!document.getElementById(checkBoxHiddenId)) {
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = fieldName;
    hiddenInput.id = checkBoxHiddenId;
    hiddenInput.value = checkBoxLabels;
    hiddenInput.setAttribute("data-name", fieldName);

    formControl.appendChild(hiddenInput);
  } else {
    document.getElementById(checkBoxHiddenId).value = checkBoxLabels;
  }

  if (checkedCount > maxCheckboxes && maxCheckboxes > 0) {
    errorDiv.querySelector("p").textContent = `Please select only up to ${maxCheckboxes} types.`;
  } else {
    errorDiv.querySelector("p").textContent = `${fieldName} is a required field.`;
  }

  if (
    checkedCount >= minimum &&
    (maxCheckboxes == 0 || (maxCheckboxes > 0 && checkedCount <= maxCheckboxes))
  ) {
    gsap.to(errorDiv, {
      display: "none",
    });
    $(formControl).removeClass("has-error");
    document.getElementById(checkBoxHiddenId).value = checkBoxLabels;
    return true;
  }

  gsap.to(errorDiv, {
    display: "flex",
  });
  $(formControl).addClass("has-error");

  return false;
}

function validateRequiredRadio(id) {
  const formControl = document.getElementById(id);
  const inputs = gsap.utils.toArray(formControl.querySelectorAll("input"));
  const errorDiv = formControl.querySelector(".error-container-2");
  let hasChecked = false;
  inputs.map((radio) => {
    if (radio.checked) {
      hasChecked = true;
      input = radio;
    }
  });
  if (hasChecked) {
    gsap.to(errorDiv, {
      display: "none",
    });
    $(formControl).removeClass("has-error");
    return true;
  }
  $(formControl).addClass("has-error");
  gsap.to(errorDiv, {
    display: "flex",
  });
  return false;
}

$(function () {
  $(window).keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});
