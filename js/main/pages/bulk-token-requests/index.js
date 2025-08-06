function validateRequiredFieldTextBox(id) {
  const formControl = document.getElementById(id);
  if (!formControl) {
    console.error(`Element with id ${id} not found.`);
    return false;
  }

  let input = formControl.querySelector("input");
  if (!input) {
    input = formControl.querySelector("textarea");
  }
  if (!input) {
    console.error(`No input or textarea found in element with id ${id}.`);
    return false;
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

const validateWalletAddress = (id) => {
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
  const walletAddress = input.value.trim();
  const walletAddressPattern = /^(0x)?[0-9a-fA-F]{40}$/;

  if (walletAddress.length === 0) {
    errorDiv.querySelector("p").textContent =
      "Wallet Address is required.";
    gsap
      .timeline()
      .to(errorDiv, { display: "flex" })
      .to(errorDiv.children, { display: "flex" }, "<");
    $(formControl).addClass("has-error");
    return false;
  }

  if (!walletAddress.match(walletAddressPattern)) {
    errorDiv.querySelector("p").textContent =
      "Invalid Wallet Address.";
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
};

function validatePositiveNumber(id) {
  const formControl = document.getElementById(id);
  const input = formControl.querySelector("input");
  const errorDiv = formControl.querySelector(".error-container-2");
  const number = input.value;
  const numberPattern = /^[0-9]+$/;
  if (number.match(numberPattern)) {
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

function validateProjectName() {
  return validateRequiredFieldTextBox("project-name");
}

function validateRepresentativeName() {
  return validateRequiredFieldTextBox("representative-name");
}

function validateRepresentativeEmail() {
  return validateEmail("representative-email");
}

function validateTelegramId() {
  return validateRequiredFieldTextBox("representative-telegram-id");
}

function validateWalletsAddress() {
  return validateWalletAddress("wallet-address");
}

function validateIfPositiveNumber() {
  return validatePositiveNumber("tokens-required");
}

function validatePurpose() {
  return validateRequiredFieldTextBox("purpose");
}

function attachValidationToPartnerForm() {
  const fauxSubmitButton = document.getElementById("faux-submit-button");
  const realSubmitButton = document.getElementById("real-submit-button");

  fauxSubmitButton.addEventListener("click", async () => {
    let isValid = 0;

    isValid += validateProjectName() ? 0 : 1;
    isValid += validateRepresentativeName() ? 0 : 1;
    isValid += validateRepresentativeEmail() ? 0 : 1;
    isValid += validateTelegramId() ? 0 : 1;
    isValid += validateWalletsAddress() ? 0 : 1;
    isValid += validateIfPositiveNumber() ? 0 : 1;
    isValid += validatePurpose() ? 0: 1;

    if (isValid > 0) {
      const formItemWithErr = document.querySelector(
        "#wf-form-Request-Bulk-Faucets .has-error"
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
}

$(document).ready(PartnerProjectSubmission);

$(function () {
  $(window).keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});
