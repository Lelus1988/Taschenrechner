    const disp = document.getElementById("display");
    const keys = document.querySelectorAll(".key");
    const modeBtn = document.getElementById("modeSwitch");
    let input = "";

    keys.forEach(k => {
      k.addEventListener("click", (e) => {
        const val = k.getAttribute("data-v");

        k.classList.add("pulse");
        setTimeout(() => k.classList.remove("pulse"), 300);

        const circle = document.createElement("span");
        const rect = k.getBoundingClientRect();
        circle.className = "ripple";
        circle.style.left = `${e.clientX - rect.left}px`;
        circle.style.top = `${e.clientY - rect.top}px`;
        k.appendChild(circle);
        setTimeout(() => circle.remove(), 600);

        if (val === "C") {
          input = "";
        } else if (val === "DEL") {
          input = input.slice(0, -1);
        } else if (val === "=") {
          try {
            if (/[^0-9+\-*/%.() ]/.test(input)) throw 0;
            input = eval(input).toString();
          } catch {
            input = "Fehler";
          }
        } else {
          input += val;
        }

        disp.value = input || "0";
      });
    });

    modeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      modeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    });

    disp.value = "0";