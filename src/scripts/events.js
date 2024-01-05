document.addEventListener("DOMContentLoaded", function () {
  const links = [...document.getElementsByClassName("link")];
  const socialIcons = [...document.querySelectorAll(".social_icon")];

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
});
