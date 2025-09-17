const APIEntry = "https://api-homepage.kaia.io";

function isAddress(address) {
  if (typeof address !== "string") return false;
  if (address.length !== 42) return false;
  if (!address.startsWith("0x")) return false;
  return /^[0-9a-fA-F]+$/.test(address.slice(2));
}

const updateBalance = (tokenTicker) => {
  const walletAddress = document.getElementById("kaia_address").value;
  if (!walletAddress || !tokenTicker) return;

  fetch(
    `${APIEntry}/faucet/balance?address=${walletAddress}&tokenTicker=${tokenTicker}`
  )
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        loadState({ balance: result.data.balance });
        document.getElementById("token_unit").innerText = tokenTicker;
      } else {
        loadState({ balance: "0" });
      }
    })
    .catch(console.error);
};

const onAddressBlur = () => {
  const walletAddress = document.getElementById("kaia_address").value;
  if (!walletAddress) return;

  if (!isAddress(walletAddress)) {
    loadState({ isInvalidAddress: true });
    return;
  } else {
    loadState({ isInvalidAddress: false });
  }

  const tokenTicker = document.getElementById("field").value;
  updateBalance(tokenTicker);
};

function runFaucet() {
  grecaptcha.execute();
  let captchaRes = grecaptcha.getResponse();
  if (!captchaRes) return;

  const walletAddress = document.getElementById("kaia_address").value;
  const tokenTicker = document.getElementById("field").value;

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

  fetch(`${APIEntry}/faucet/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      address: walletAddress,
      tokenTicker,
      recaptcha: captchaRes,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        loadState({
          popupShow: true,
          isError: false,
          title: `Your ${tokenTicker} Faucet request accepted`,
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
    .catch((err) => console.error("Error catch:", err))
    .finally(() => {
      setTimeout(() => {
        updateBalance(tokenTicker);
      }, 3000);
    });
}

const closeFaucetModal = () => {
  loadState({ popupShow: false, isError: false, title: "", content: "" });
};

const loadConfig = () => {
  fetch(`${APIEntry}/faucet/config`)
    .then((res) => res.json())
    .then((result) => {
      if (result.success && Array.isArray(result.data)) {
        const field = document.getElementById("field");
        field.innerHTML = ""; 

        result.data.forEach((cfg) => {
          const opt = document.createElement("option");
          opt.value = cfg.tokenTicker;
          opt.textContent = cfg.tokenTicker; 
          field.appendChild(opt);
        });

        if (result.data.length > 0) {
          const firstToken = result.data[0].tokenTicker;
          updateBalance(firstToken);
        }
      }
    })
    .catch((err) => console.error("Error load config:", err));
};

document.addEventListener("DOMContentLoaded", function () {
  loadConfig();

  document.getElementById("field").addEventListener("change", () => {
    const address = document.getElementById("kaia_address").value;
    const tokenTicker = document.getElementById("field").value;
    if (address) updateBalance(tokenTicker);
  });

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
