const cards = document.querySelectorAll(".card");

window.addEventListener("mousemove", (ev) => {
  cards.forEach((e) => {
    const blob = e.querySelector(".blob") as HTMLElement;
    const fblob = e.querySelector(".fakeblob");
    const rec = fblob!.getBoundingClientRect();

    blob!.animate(
      [
        {
          transform: `translate(${ev.clientX - rec.left - rec.width / 2}px,${
            ev.clientY - rec.top - rec.height / 2
          }px)`,
        },
      ],
      {
        duration: 300,
        fill: "forwards",
      }
    );

    blob.style.opacity = "1";
  });
});
