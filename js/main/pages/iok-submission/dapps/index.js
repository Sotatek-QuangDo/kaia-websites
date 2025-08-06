function validateRequiredSelectBox(id) {
  const formControl = document.getElementById(id);
  let input = formControl.querySelector("select");
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

function validateRequiredSelectBoxes(id, _name, minimumRows = 1) {
  const formControl = document.getElementById(id);

  // reset all select statement errors.
  let selectinputs = formControl.querySelectorAll("select") || [];
  let textinputs = formControl.querySelectorAll("input") || [];
  selectinputs = [...textinputs, ...selectinputs];
  for (let i = 0; i < selectinputs.length; i++) {
    let elem = selectinputs[i];
    const errorDivInternal =
      elem.parentElement.querySelector(".error-container-2");
    gsap.to(errorDivInternal, {
      display: "none",
    });
    $(elem.parentElement).removeClass("has-error");
  }

  // Check if atleast 1 row is added
  const addedSectionElements = document.getElementById("add-section-" + id);
  const errorDivs = formControl.querySelectorAll(".error-container-2");
  const errorDiv = errorDivs[errorDivs.length - 1];
  let hiddenElementLabel = "";
  if (
    addedSectionElements &&
    addedSectionElements.children.length >= minimumRows
  ) {
    for (let i = 0; i < addedSectionElements.children.length; i++) {
      let record = addedSectionElements.children[i];
      let inputs = record.querySelectorAll("input");
      for (let j = 0; j < inputs.length; j++) {
        hiddenElementLabel += inputs[j].value + ",";
      }
      hiddenElementLabel += "|";
    }
    if (!document.getElementById(id + "-hidden")) {
      let hiddenElement = document.createElement("input");
      hiddenElement.id = id + "-hidden";
      hiddenElement.type = "hidden";
      hiddenElement.name = _name;
      formControl.parentElement.appendChild(hiddenElement);
    }
    document.getElementById(id + "-hidden").value = hiddenElementLabel;

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

function validateRequiredIndividualSelectBoxes(id) {
  const formControl = document.getElementById(id);
  let selectinputs = formControl.querySelectorAll("select") || [];
  let textinputs = formControl.querySelectorAll("input") || [];
  selectinputs = [...textinputs, ...selectinputs];
  let isValid = true;
  let selectedValues = [];
  for (let i = 0; i < selectinputs.length; i++) {
    let elem = selectinputs[i];
    selectedValues.push(elem.value);
    const errorDivs = formControl.querySelectorAll(".error-container-2");
    const errorDiv = errorDivs[errorDivs.length - 1];
    if (elem.value && elem.value.length > 0) {
      gsap.to(errorDiv, {
        display: "none",
      });
      $(elem.parentElement).removeClass("has-error");
    } else {
      isValid = false;
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
      $(elem.parentElement).addClass("has-error");
    }
  }
  return { isValid: isValid, selectedValues: selectedValues };
}

// Field Validations
function validateNameOfDappProject() {
  return validateRequiredFieldTextBox("name-of-project-dapp");
}

function validateCategoryOfTheDappProject() {
  return validateCheckboxes(
    "category-of-the-project-dapp",
    "Category of the Project"
  );
}

function validateStatus() {
  return validateRequiredSelectBox("status-dapp");
}

function validateRequests() {
  return validateRequiredSelectBoxes("requests-dapp", "Requests");
}

function validateDescription() {
  return validateRequiredFieldTextBox("description-project-dapp");
}

function validateDappProjectWebsite() {
  const requireCheck = validateRequiredFieldTextBox("project-website-url-dapp");
  if (!requireCheck) return requireCheck;
  const formControl = document.getElementById("project-website-url-dapp");
  return validateValidUrl(formControl);
}

function validateDappOrganizationTwitter() {
  return validateRequiredFieldTextBox("projects-twitter-handle-dapp");
}

function validateMainnet() {
  return validateRequiredFieldTextBox("main-net-dapp");
}

function validateHasTokensInProject() {
  return validateRequiredRadio("hastokens-dapp");
}

function validateDappRepresentativeName() {
  return validateRequiredFieldTextBox("representatives-name-dapp");
}

function validateDappRepresentativeEmail() {
  return validateEmail("representatives-email-dapp");
}

function validateTokenContracts() {
  return validateRequiredSelectBoxes(
    "tokencontract-dapp",
    "Project Token Contract Details"
  );
}

function validateFoundingMembersLinkedin() {
  return validateRequiredSelectBoxes(
    "linkedin-dapp",
    "Founding Member Linkedin"
  );
}

function validateFundingTwitter() {
  let minimumRows = -1;
  return validateRequiredSelectBoxes(
    "twitter-dapp",
    "Funding Round Twitter Details",
    minimumRows
  );
}

function validateMarketingTwitter() {
  return validateRequiredSelectBoxes(
    "announcement-dapp",
    "Marketing Twitter Details"
  );
}

function validateProjectAchievements() {
  return validateRequiredFieldTextBox("project-achievements-dapp");
}

function validateMilestones() {
  return validateRequiredFieldTextBox("milestone-runway-dapp");
}

function validateExclusiveAccess() {
  return validateRequiredFieldTextBox("alpha-exclusive-access-dapp");
}

function skipCategoryOfTheDappOrganization() {
  removeNameTagsOfCheckboxes("category-of-the-project-dapp");
}

function validateDappWhitepaperDeckUrl() {
  const formControl = document.getElementById("whitepaper-deck-url-2");
  const input = formControl.querySelector("input");
  if (!input.value || input.value.length === 0) {
    const errorDiv = formControl.querySelector(".error-container-2");
    errorDiv.style.display = "none";
    return true;
  }
  return validateValidUrl(formControl);
}

function validateDappReferredBy() {
  return validateRequiredFieldTextBox("referred-by-dapp");
}

function attachAddButtonListeners() {
  attachAddButtonListener("requests-dapp");
  attachAddButtonListener("tokencontract-dapp");
  attachAddButtonListener("linkedin-dapp");
  attachAddButtonListener("twitter-dapp");
  attachAddButtonListener("announcement-dapp");
}

function attachValidationToDappForm() {
  const fauxSubmitButton = document.getElementById("faux-submit-button-dapp");
  const realSubmitButton = document.getElementById("real-submit-button-dapp");

  attachAddButtonListeners();

  fauxSubmitButton.addEventListener("click", () => {
    let isValid = 0;

    isValid += validateNameOfDappProject() ? 0 : 1;
    isValid += validateCategoryOfTheDappProject() ? 0 : 1;
    isValid += validateStatus() ? 0 : 1;
    isValid += validateRequests() ? 0 : 1;
    isValid += validateDescription() ? 0 : 1;
    isValid += validateDappProjectWebsite() ? 0 : 1;
    isValid += validateDappOrganizationTwitter() ? 0 : 1;
    isValid += validateMainnet() ? 0 : 1;
    isValid += validateHasTokensInProject() ? 0 : 1;
    isValid += validateDappRepresentativeName() ? 0 : 1;
    isValid += validateDappRepresentativeEmail() ? 0 : 1;
    isValid += validateTokenContracts() ? 0 : 1;
    isValid += validateFoundingMembersLinkedin() ? 0 : 1;
    isValid += validateFundingTwitter() ? 0 : 1;
    isValid += validateMarketingTwitter() ? 0 : 1;
    isValid += validateProjectAchievements() ? 0 : 1;
    isValid += validateMilestones() ? 0 : 1;
    isValid += validateExclusiveAccess() ? 0 : 1;
    isValid += validateDappWhitepaperDeckUrl() ? 0 : 1;
    isValid += validateDappReferredBy() ? 0 : 1;

    if (isValid > 0) {
      const formItemWithErr = document.querySelector(
        "#wf-form-IOK-Dapp-Project .has-error"
      );
      formItemWithErr?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    // skip elements
    //skipCategoryOfTheDappOrganization();

    realSubmitButton.click();
  });
}

function resetSelectBoxes(id) {
  const inputs = $("#" + id).find("select");
  for (let i = 0; i < inputs.length; i++) {
    let elem = inputs[i];
    $(elem).val("");
    $(elem).niceSelect("update");
  }
  const textinputs = $("#" + id).find("input");
  for (let i = 0; i < textinputs.length; i++) {
    let elem = textinputs[i];
    $(elem).val("");
  }
}

function attachAddButtonListener(id) {
  let addButtonSection = "add-button-" + id;
  let addTemplate = "add-template-" + id;
  let addSection = "add-section-" + id;
  document
    .getElementById(addButtonSection)
    .children[0].addEventListener("click", (event) => {
      // validate request inputs
      let { isValid, selectedValues } =
        validateRequiredIndividualSelectBoxes(id);
      if (!isValid) {
        return;
      }
      let templateDiv = document.getElementById(addTemplate).cloneNode(true);
      templateDiv.id += parseInt(Math.random() * 10000000);
      for (let i = 0; i < selectedValues.length; i++) {
        templateDiv.children[i].value = selectedValues[i];
        templateDiv.children[i].setAttribute("readonly", true);
        templateDiv.children[i].style.backgroundColor = "#3d3d3d";
      }
      templateDiv.children[selectedValues.length].addEventListener(
        "click",
        (event) => {
          templateDiv.remove();
        }
      );
      templateDiv.style.display = "flex";
      let requestsContent = document.getElementById(addSection);
      requestsContent.appendChild(templateDiv);

      // clear requests input values
      resetSelectBoxes(id);
    });
}

function loadCollectionDataToSelectById(id, subItem) {
  $("." + subItem + "-item-" + id).each(function () {
    var s = $(this).text();
    $("#" + subItem + "-select-" + id).append(
      '<option value="' + s + '">' + s + "</option>"
    );
  });
  $("#" + subItem + "-select-" + id).niceSelect("update");
}

function loadCollectionDappDataToSelect() {
  loadCollectionDataToSelectById("requests-dapp", "sector");
  loadCollectionDataToSelectById("requests-dapp", "partner");
}

function dappProjectSubmission() {
  gsap.to(".error-container-2", { display: "none" });
  attachValidationToDappForm();
  loadCollectionDappDataToSelect();
}

$(document).ready(dappProjectSubmission);
