document.addEventListener("DOMContentLoaded", function () {
  const links = [...document.getElementsByClassName("link")];
  const socialIcons = [...document.querySelectorAll(".social_icon")];
  const protoCtas = [...document.querySelectorAll(".proto_button")];
  const scrollToPrototypeLink = document.querySelector(".proto_button");

  links.forEach(function (link) {
    link.addEventListener("mouseenter", function () {
      gsap.to(link, {
        borderBottomWidth: "4px",
        duration: 0.3,
        ease: "back",
      });
    });

    link.addEventListener("mouseleave", function () {
      gsap.to(link, {
        borderBottomWidth: "0px",
        duration: 0.15,
        ease: "back",
      });
    });
  });

  socialIcons.forEach(function (icon) {
    icon.addEventListener("mouseenter", function () {
      gsap.to(icon, { opacity: 0.5 });
    });
    icon.addEventListener("mouseleave", function () {
      gsap.to(icon, { opacity: 1 });
    });
  });

  protoCtas.forEach(function (cta) {
    cta.addEventListener("mouseenter", () => {
      gsap.to(cta, {
        opacity: 0.8,
        duration: 0.2,
      });
    });

    cta.addEventListener("mouseleave", () => {
      gsap.to(cta, {
        opacity: 1,
        duration: 0.2,
      });
    });
  });

  if (scrollToPrototypeLink) {
    scrollToPrototypeLink.addEventListener("click", function (event) {
      event.preventDefault();

      const targetSection = document.getElementById("mockup");

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  }
});
