function listHoverEvents() {
    const keyList = gsap.utils.toArray(".key-events-cards");
    const list = gsap.utils.toArray(".event-list-item");
  
    if (!isEventDesktop) {
      keyList.map((item) => {
        const buttonsWrapper = [...item.children[0].children[1].children];
        buttonsWrapper.pop();
        buttonsWrapper.map((button) => {
          button.style.opacity = 1;
        });
      });
  
      list.map((item) => {
        const buttonsWrapper = [...item.children[0].children[1].children];
        buttonsWrapper.pop();
        buttonsWrapper.map((button) => {
          button.style.opacity = 1;
        });
      });
      return;
    }
  
    keyList.map((item) => {
      const buttonsWrapper = [...item.children[0].children[1].children];
      buttonsWrapper.pop();
      buttonsWrapper.map((button) => {
        button.style.opacity = 0;
      });
    });
    keyList.forEach((item) => {
      item.onmouseover = () => {
        if (!isEventDesktop) return;
        item.style.backgroundColor = "var(--elevation--p300)";
        item.style.transition = "all 0.3s";
        item.style.borderRadius = "var(--corner--lg)";
  
        const buttonsWrapper = [...item.children[0].children[1].children];
        buttonsWrapper.pop();
        buttonsWrapper.map((button) => {
          button.style.opacity = 1;
        });
      };
      item.onmouseout = () => {
        if (!isEventDesktop) return;
        item.style.backgroundColor = "";
        item.style.transition = "all 0.3s";
  
        const buttonsWrapper = [...item.children[0].children[1].children];
        buttonsWrapper.pop();
        buttonsWrapper.map((button) => {
          button.style.opacity = 0;
        });
      };
    });
  
    list.map((item) => {
      const buttonsWrapper = [...item.children[0].children[1].children];
      buttonsWrapper.pop();
      buttonsWrapper.map((button) => {
        button.style.opacity = 0;
      });
    });
  
    list.forEach((item) => {
      item.onmouseover = () => {
        if (!isEventDesktop) return;
        item.style.backgroundColor = "var(--elevation--p300)";
        item.style.transition = "all 0.3s";
  
        const buttonsWrapper = [...item.children[0].children[1].children];
        buttonsWrapper.pop();
        buttonsWrapper.map((button) => {
          button.style.opacity = 1;
        });
      };
      item.onmouseout = () => {
        if (!isEventDesktop) return;
        item.style.backgroundColor = "";
        item.style.transition = "all 0.3s";
  
        const buttonsWrapper = [...item.children[0].children[1].children];
        buttonsWrapper.pop();
        buttonsWrapper.map((button) => {
          button.style.opacity = 0;
        });
      };
    });
  }
  