const APIEntry = "https://api-homepage.kaia.io";

const loadState = (_data) => {
  if (_data.hasOwnProperty("balance")) {
    document.getElementById("kaia_balance").innerHTML = _data.balance || "0";
  }

  if (_data.hasOwnProperty("isInvalidAddress")) {
    if (_data.isInvalidAddress) {
      document.getElementById("kaia_address_error_msg").style.visibility =
        "visible";
      document.getElementById("kaia_address").style.color = "#E85B56";
      document.getElementById("kaia_address_label").style.color = "#E85B56";
      document.getElementById("kaia_address").style.border =
        "1px solid #E85B56";
    } else {
      document.getElementById("kaia_address_error_msg").style.visibility =
        "hidden";
      document.getElementById("kaia_address").style.color =
        "rgba(255, 255, 255, .4)";
      document.getElementById("kaia_address_label").style.color =
        "rgba(255, 255, 255, .99)";
      document.getElementById("kaia_address").style.border =
        "1px solid #000000";
    }
  }

  if (_data.hasOwnProperty("popupShow")) {
    if (_data.popupShow) {
      if (_data.isError) {
        document.getElementById("kaia_modal").style.backgroundColor = "#5d2422";
        document.getElementById("kaia_modal").style.border =
          "1px solid rgba(232, 91, 86, 0.15)";
        document.getElementById("kaia_modal").style.boxShadow =
          "0px 80x 16px 0px rgba(235, 128, 122, 0.25)";
        document.getElementById("kaia_modal_title").style.color = "#f0a6a0";
        document.getElementById("kaia_modal_content").style.color = "#f0a6a0";
        document.getElementById("kaia_modal_success_warning").style.visibility =
          "hidden";
        document.getElementById("kaia_modal_success_close").style.visibility =
          "hidden";
        document.getElementById("kaia_modal_fail_warning").style.visibility =
          "visible";
        document.getElementById("kaia_modal_fail_close").style.visibility =
          "visible";
      } else {
        document.getElementById("kaia_modal").style.backgroundColor = "#1f5214";
        document.getElementById("kaia_modal").style.border =
          "1px solid rgba(64, 171, 43, 0.25)";
        document.getElementById("kaia_modal").style.boxShadow =
          "0px 80x 16px 0px rgba(87, 207, 63, 0.25)";
        document.getElementById("kaia_modal_title").style.color = "#7eda6c";
        document.getElementById("kaia_modal_content").style.color = "#7eda6c";
        document.getElementById("kaia_modal_success_warning").style.visibility =
          "visible";
        document.getElementById("kaia_modal_success_close").style.visibility =
          "visible";
        document.getElementById("kaia_modal_fail_warning").style.visibility =
          "hidden";
        document.getElementById("kaia_modal_fail_close").style.visibility =
          "hidden";
      }
      document.getElementById("kaia_modal").style.visibility = "visible";
      document.getElementById("kaia_modal_bg").style.visibility = "visible";
      document.getElementById("kaia_modal_title").innerHTML = _data.title;
      document.getElementById("kaia_modal_content").innerHTML = _data.content;
    } else {
      document.getElementById("kaia_modal_success_warning").style.visibility =
        "hidden";
      document.getElementById("kaia_modal_success_close").style.visibility =
        "hidden";
      document.getElementById("kaia_modal_fail_warning").style.visibility =
        "hidden";
      document.getElementById("kaia_modal_fail_close").style.visibility =
        "hidden";
      document.getElementById("kaia_modal_title").innerHTML = _data.title;
      document.getElementById("kaia_modal_content").innerHTML = _data.content;
      document.getElementById("kaia_modal").style.visibility = "hidden";
      document.getElementById("kaia_modal_bg").style.visibility = "hidden";
    }
  }
};

function isAddress(address) {
  if (typeof address !== "string") {
    return false;
  }
  if (address.length !== 42) {
    return false;
  }
  if (address.slice(0, 2) !== "0x") {
    return false;
  }
  const hexPattern = /^[0-9a-fA-F]+$/;
  if (!hexPattern.test(address.slice(2))) {
    return false;
  }

  return true;
}

const updateBalance = () => {
  const walletAddress = document.getElementById("kaia_address").value;
  fetch(`${APIEntry}/faucet/balance?address=${walletAddress}`, {
    method: "GET",
  })
    .then(async function (response) {
      const responseText = await response.text();
      const result = JSON.parse(responseText);
      if (result.success) {
        loadState({ balance: result.data.balance });
      } else {
        loadState({ balance: "0" });
      }
    })
    .catch(function (e) {
      console.log(e);
    });
};

const onAddressBlur = () => {
  const walletAddress = document.getElementById("kaia_address").value;
  if (!walletAddress) {
    return;
  }
  if (!isAddress(walletAddress)) {
    loadState({
      isInvalidAddress: true,
      madeDate: "Invalid address",
    });
    return;
  } else {
    loadState({
      isInvalidAddress: false,
      madeDate: "",
    });
  }
  updateBalance();
};

function runFaucet() {
  grecaptcha.execute();
  let captchaRes = grecaptcha.getResponse();
  if (!captchaRes) {
    return;
  }
  const walletAddress = document.getElementById("kaia_address").value;
  if (!isAddress(walletAddress)) {
    loadState({
      popupShow: true,
      isError: true,
      title: "Invalid Address",
      content: "Please provide a valid address and retry again.",
    });
    return;
  }

  loadState({ isRunning: true });
  fetch(`${APIEntry}/faucet/run?address=${walletAddress && walletAddress}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recaptcha: captchaRes }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        loadState({
          popupShow: true,
          isError: false,
          title: "Your KAIA Faucet request accepted",
          content: "You can run faucet once every 24 hours.",
        });
      } else {
        loadState({
          popupShow: true,
          isError: true,
          title: "You can run faucet once every 24 hours",
          content:
            "Last time you ran faucet was less than 24 hours. Please retry again.",
        });
      }
    })
    .catch((err) => console.log(`Error catch: ${err}`))
    .finally(() => {
      setTimeout(() => {
        updateBalance();
      }, 3000);
    });
}

const closeFaucetModal = () => {
  loadState({ popupShow: false, isError: false, title: "", content: "" });
};

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("kaia_address")
    .addEventListener("blur", onAddressBlur);
  document.getElementById("kaia_button").addEventListener("click", runFaucet);
  document
    .getElementById("kaia_modal_fail_close")
    .addEventListener("click", closeFaucetModal);
  document
    .getElementById("kaia_modal_success_close")
    .addEventListener("click", closeFaucetModal);
});

$(function () {
  $(window).keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});
