// Field Validations
function validateNameOfOrganization() {
  return validateRequiredFieldTextBox("name-of-organization");
}

function validateOrganizationsAddress() {
  return validateRequiredFieldTextBox("organization-address");
}

function validateIaman() {
  return validateRequiredRadio("radio-partners");
}

function validateOrganizationTwitter() {
  return validateRequiredFieldTextBox("organization-twitter");
}

function validateRepresentativeName() {
  return validateRequiredFieldTextBox("representative-name");
}

function validateRepresentativeEmail() {
  return validateEmail("representative-email");
}

function validateProjectDescription() {
  return validateRequiredFieldTextBox("description-organization");
}

function validateBooleanNamePartner() {
  return validateRequiredRadio("radio-partners");
}

function validateCategoryOfTheOrganization() {
  return validateCheckboxes("project-category", "Project Category");
}

function validateContributionType() {
  let maxCheckboxes = 2;
  return validateCheckboxes(
    "contribution-type",
    "Contribution Type",
    maxCheckboxes
  );
}

function validateProjectWebsite() {
  const requireCheck = validateRequiredFieldTextBox("organization-url-website");
  if (!requireCheck) return requireCheck;
  const formControl = document.getElementById("organization-url-website");
  return validateValidUrl(formControl);
}

function validateWhitepaperDeckUrl() {
  const formControl = document.getElementById("whitepaper-deck-url");
  const input = formControl.querySelector("input");
  if (!input.value || input.value.length === 0) {
    const errorDiv = formControl.querySelector(".error-container-2");
    errorDiv.style.display = "none";
    return true;
  }
  return validateValidUrl(formControl);
}

function validatePartnerReferredBy() {
  return validateRequiredFieldTextBox("referred-by-partner");
}

function skipCategoryOfTheOrganization() {
  removeNameTagsOfCheckboxes("project-category");
}

function skipContributionType() {
  removeNameTagsOfCheckboxes("contribution-type");
}

function toggleFormVisibilityBasedOnRadio() {
  const newPartnerRadio = document.getElementById("New-Partner");
  const existingPartnerRadio = document.getElementById("Existing-Partner");
  const formControl = document.getElementById("project-logo");

  // Check the initial state of the radio when the load page
  if (newPartnerRadio.checked) {
    formControl.style.display = "block";
  } else {
    formControl.style.display = "none";
  }

  // listen to the event changes when the user chooses/Deselect Radio Button
  newPartnerRadio.addEventListener("change", function () {
    if (newPartnerRadio.checked) {
      formControl.style.display = "block";
    }
  });
  existingPartnerRadio.addEventListener("change", function () {
    if (existingPartnerRadio.checked) {
      formControl.style.display = "none";
    }
  });
}

// Normalize string: remove leading/trailing whitespace and convert to lowercase
function normalize(str) {
  return str.trim().toLowerCase();
}

// Show or hide the "Offering" and "Redeem" fields
function toggleOfferingAndRedeemFields() {
  const listOfferingRedeemField = document.getElementById(
    "box-list-offering-redeem-fields"
  );

  if (!listOfferingRedeemField) {
    return;
  }

  const hasChecked =
    document.querySelector('input[name="Ignore-Field"]:checked') !== null;

  listOfferingRedeemField.style.display = hasChecked ? "flex" : "none";
}

// Attach change event listeners to all contribution-type checkboxes
function setupContributionTypeListener() {
  const checkboxes = document.querySelectorAll('input[name="Ignore-Field"]');
  checkboxes.forEach((cb) =>
    cb.addEventListener("change", toggleOfferingAndRedeemFields)
  );
}

// Validation function: at least ONE of the two fields must be filled in
function validateOfferingAndRedeemFields() {
  const wrapper = document.getElementById("offering-redeem-fields");
  const errorBox = document.querySelector(
    "#box-list-offering-redeem-fields .error-container-2"
  );

  // If the wrapper is hidden, skip validation
  if (!wrapper || wrapper.style.display === "none") {
    if (errorBox) errorBox.style.display = "none";
    return true;
  }

  const offering = document.getElementById("Offering-Description");
  const redeem = document.getElementById("Redemption-Instructions");

  const offeringFilled = offering.value.trim() !== "";
  const redeemFilled = redeem.value.trim() !== "";

  const isValid = offeringFilled || redeemFilled;

  // Show or hide error box based on validation
  if (!isValid) {
    if (errorBox) errorBox.style.display = "flex";
    offering.classList.add("has-error");
    redeem.classList.add("has-error");
  } else {
    if (errorBox) errorBox.style.display = "none";
    offering.classList.remove("has-error");
    redeem.classList.remove("has-error");
  }

  return isValid;
}

function attachValidationToPartnerForm() {
  const fauxSubmitButton = document.getElementById("faux-submit-button");
  const realSubmitButton = document.getElementById("real-submit-button");

  fauxSubmitButton.addEventListener("click", async () => {
    let isValid = 0;

    isValid += validateNameOfOrganization() ? 0 : 1;
    isValid += validateOrganizationsAddress() ? 0 : 1;
    isValid += validateIaman() ? 0 : 1;
    isValid += validateCategoryOfTheOrganization() ? 0 : 1;
    isValid += validateContributionType() ? 0 : 1;
    isValid += validateProjectDescription() ? 0 : 1;
    isValid += validateProjectWebsite() ? 0 : 1;
    isValid += validateOrganizationTwitter() ? 0 : 1;
    isValid += validateRepresentativeName() ? 0 : 1;
    isValid += validateRepresentativeEmail() ? 0 : 1;
    isValid += validateBooleanNamePartner() ? 0 : 1;
    isValid += validateWhitepaperDeckUrl() ? 0 : 1;
    isValid += validatePartnerReferredBy() ? 0 : 1;
    isValid += validateOfferingAndRedeemFields() ? 0 : 1;

    if (isValid > 0) {
      const formItemWithErr = document.querySelector(
        "#wf-form-IOK-Partners .has-error"
      );
      formItemWithErr?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    // skip elements
    //skipCategoryOfTheOrganization();
    //skipContributionType();

    realSubmitButton.click();
  });
}

function PartnerProjectSubmission() {
  gsap.to(".error-container-2", { display: "none" });
  attachValidationToPartnerForm();
  toggleFormVisibilityBasedOnRadio();
  setupContributionTypeListener();
  toggleOfferingAndRedeemFields();
}

$(document).ready(PartnerProjectSubmission);
