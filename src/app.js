import ProjectData from "./projectdata/projectData.js";

gsap.registerPlugin(Flip, ScrollTrigger);

window.addEventListener("load", () => {
  const lenis = new Lenis({
    lerp: 0.07,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  // Declaring Variables
  let state = null;

  const navImages = document.querySelectorAll("#nav img");

  const introSection = document.querySelector(".intro");
  const imagesWrapper = document.querySelector(".intro__images");
  const images = [...imagesWrapper.querySelectorAll("img")];

  const titleLines = 'h1 [data-animation="text-reveal"] > *';
  const subTitleLine = 'h3 [data-animation="text-reveal"] > *';

  const projectSection = document.querySelector(".projects_section");

  //   Load Initial State
  const _loadInitialState = () => {
    // console.log("Loading Initital State");
    // nav images are hidden
    navImages.forEach((navImg) => {
      gsap.set(navImg, {
        y: 100,
      });
    });

    // Fullwidth image is scaled at first
    gsap.set(".fullwidth-image img", {
      scale: 1.08,
    });

    // Full width image text is hidden
    gsap.set(".fullwidth-image__text", {
      y: 70,
      opacity: 0,
    });

    // Text line from project section are also hidden
    // gsap.set(dividerLine, {
    //   scaleX: 0,
    //   opacity: 1,
    // });
  };

  //   Create Parallex Images
  const _createPareallexImages = () => {
    // console.log("_createPareallexImages function ran");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: introSection,
        start: "top top",
        end: "bottom top",
        scrub: 0.2,
      },
    });

    images.forEach((image) => {
      tl.to(
        image,
        {
          ease: "none",
          yPercent: gsap.utils.random(-160, -90),
        },
        "<"
      );
    });
  };

  //  Get Final State
  const _getFinalState = () => {
    // console.log("Get Final State was ran");
    // To remove images from their initial position
    imagesWrapper.classList.remove("initial");

    // moving images to center
    gsap.set([images], {
      xPercent: 0,
      yPercent: 0,
    });

    state = Flip.getState([images]);
  };

  //   Setting Initial State
  const _setInitialState = () => {
    // console.log("Set Initial State was ran");
    // To set images to the initial postitions they will aimate
    imagesWrapper.classList.add("initial");

    // Changing transform origins of the images to top left
    gsap.set(images, {
      xPercent: -50,
      yPercent: -50,
    });
  };

  //   Reveal Nav
  const _revealNav = () => {
    // console.log("Reveal Nav was ran");
    if (imagesWrapper) {
      navImages.forEach((navImg) => {
        gsap.to(navImg, {
          y: 0,
          ease: "expos.inout",
          duration: 1,
          stagger: 0.8,
        });
      });
    }
  };

  //   Reveal Content
  const _revealContent = () => {
    // console.log("Reveal content was ran");
    if (imagesWrapper) {
      const tl = gsap.timeline({
        defaults: {
          y: 0,
          duration: 1.5,
          ease: "expo.inOut",
        },
      });

      tl.to(titleLines, {
        stagger: 0.2,
      }).to(
        subTitleLine,
        {
          ease: "expo.inOut",
          onComplete: () => _revealNav(),
        },
        "<+0.4"
      );

      return tl;
    }
  };

  //   Animate Images
  const _animateImages = () => {
    // console.log("Animate Images was ran");
    // animating with Flip
    Flip.to(state, {
      duration: 1.5,
      ease: "expo.inOut",
      stagger: 0.15,
      onComplete: () => _revealContent(),
    });
  };

  //   Fading Up Images
  const _fadeUpImages = () => {
    // console.log("Fade up images was ran");
    // without onComplete callback, both animations will start at once
    return gsap.to([images], {
      opacity: 1,
      duration: 0.6,
      ease: "expos.inout",
      stagger: 0.1,
      onComplete: () => _animateImages(),
    });
  };

  //   Pinned Section
  const _createPinnedSection = () => {
    // console.log("Create Pinned Section was ran");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".fullwidth-image",
        stat: "top top",
        end: "+=1500",
        scrub: 1,
        pin: true,
        ease: "expo.out",
      },
    });

    tl.to(".fullwidth-image__overlay", {
      opacity: 0.6,
    })
      .to(
        ".fullwidth-image",
        {
          // you need percentages in clip-path values
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
        0
      )
      .to(
        ".fullwidth-image img",
        {
          scale: 1,
        },
        0
      )
      .to(
        ".fullwidth-image__text",
        {
          opacity: 1,
          y: 0,
        },
        "<+=0.1"
      );
  };

  //   - - - - - - -
  //   Project Section
  //   - - - - - - -

  const _createProjectSectionTag = () => {
    const projectData = new ProjectData();

    // console.log("Crate Project Section Tags was ran");

    function elementFromHtml(html) {
      const template = document.createElement("template");

      template.innerHTML = html.trim();

      return template.content.firstElementChild;
    }

    projectData.projects.forEach((project) => {
      const projectListTags = elementFromHtml(`
                  <div class="project__wrapper">
                      <div class="project__container">
                          <div class="project__details">
                              <div><h1>${project.name}</h1></div>
                              <h3><p>${project.detail}</p></h3>
                              <div class="divider-line"></div>
                              <p class="project-description">${project.title}</p>
                              <div class="project_cta_container">
                                <div class="project__cta-wrapper">
                                  <a href="#" class="project__cta" data-text=" Case Study">View ${project.type}
                                  <svg class="project_cta_icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                                    stroke-linejoin="round" class="feather feather-arrow-up-right">
                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                    <polyline points="7 7 17 7 17 17"></polyline></svg>
                                  </a>
                                  <div class="project_cta_line"></div>
                                </div>
                              </div>
                              <h2>0${project.projectId}</h2>
                              <div class="footer-line"></div>
                          </div>
                          <div class="project__image">
                              <img src="${project.coverImage}" alt="">
                          </div>
                      </div>
                  </div>
                  `);

      // Adding event listener to each project section
      const projectCTA = projectListTags.querySelector(".project__cta");
      projectCTA.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = project.pagelink;
      });

      projectCTA.addEventListener("mouseover", () => {
        const projectCtaicon = projectCTA.querySelector(".project_cta_icon");
        const tl = gsap.timeline({ ease: "expos.out" });
        tl.to(projectCTA, {
          duration: 0.08,
          color: "var(--color-violet-400)",
          borderBottom: "2px solid var(--color-violet-400)",
        }).to(
          projectCtaicon,
          {
            yPercent: -20,
          },
          "0"
        );
        tl.play();
      });

      projectCTA.addEventListener("mouseleave", () => {
        const projectCtaicon = projectCTA.querySelector(".project_cta_icon");
        const tl = gsap.timeline({ ease: "expos.out" });
        tl.to(projectCTA, {
          duration: 0.03,
          color: "var(--text-color-dark)",
          borderBottom: "2px solid var(--text-color-dark)",
        }).to(
          projectCtaicon,
          {
            yPercent: 0,
          },
          "0"
        );
        tl.play();
      });

      projectSection.append(projectListTags);

      //   Project wrapper containers
      const projectWrapperTags =
        projectSection.querySelectorAll(".project__wrapper");

      // Looping the parent div and animating the childrens
      projectWrapperTags.forEach((projectWrapper) => {
        const dividerLine = projectWrapper.querySelector(".divider-line");
        const footerLine = projectWrapper.querySelector(".footer-line");
        const cta_wrapper = projectWrapper.querySelector(
          ".project__cta-wrapper"
        );
        const projectCtaIcon =
          projectWrapper.querySelector(".project_cta_icon");
        const projectCta = projectWrapper.querySelector(".project__cta");
        const project_cta_line =
          projectWrapper.querySelector(".project_cta_line");
        const projectHeader = projectWrapper.querySelector(
          ".project__details h1"
        );
        const projectSubtitle = projectWrapper.querySelector("h3");
        const projectDescription = projectWrapper.querySelector(
          ".project-description"
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: projectWrapper,
            start: "-=250",
            end: "",
            duration: 0.3,
          },
        });

        gsap.set(projectHeader, { y: 190 });
        gsap.set(dividerLine, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(projectCta, { y: 80 });
        gsap.set(footerLine, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(projectSubtitle, { opacity: 0 });
        gsap.set(projectDescription, { opacity: 0 });
        gsap.set(project_cta_line, { y: 100, opacity: 0 });

        tl.to(projectHeader, { y: 0, ease: "back.out" })
          .to(projectSubtitle, { opacity: 1 }, 0 + 0.1)
          .to(projectDescription, { opacity: 1 }, 0 + 0.1)
          .to(dividerLine, { scaleX: 1 }, 0 + 0.1)
          .to(projectCta, { y: 0, ease: "back.out(2)" }, 0 + 0.1)
          .to(footerLine, { scaleX: 1 }, 0 + 0.3);

        // // project events
        // cta_wrapper.addEventListener("mouseover", () => {
        //   const tl = gsap.timeline({ ease: "expos.out" });
        //   tl.to(projectCta, {
        //     duration: 0.05,
        //     color: "var(--color-violet-400)",
        //   }).to(
        //     projectCtaIcon,
        //     {
        //       yPercent: -20,
        //     },
        //     "0"
        //   );
        //   tl.play();
        // });
        // cta_wrapper.addEventListener("mouseleave", () => {
        //   const tl = gsap.timeline({ ease: "expos.out" });
        //   tl.to(projectCta, {
        //     duration: 0.03,
        //     color: "var(--text-color-dark)",
        //   }).to(
        //     projectCtaIcon,
        //     {
        //       yPercent: 0,
        //     },
        //     "0"
        //   );
        //   tl.play();
        // });
      });

      // this.projectSection.append(projectListTags);
      // - - - - - - - - - - - - - - - - - - - - - - - -
    });
  };

  //  - - - - - - - - - //
  // Provoking functional logics
  //   - - - - - - - - - //

  //   First loading initial images states
  _loadInitialState();
  //   Getting Images Final Positions
  _getFinalState();
  //   Getting Images Initial Positions
  _setInitialState();
  //   Animate images on scroll
  _createPareallexImages();
  //   Fading up images animation
  _fadeUpImages();
  //   Pinning scroll image section
  _createPinnedSection();
  //   Creating projects dynamically
  _createProjectSectionTag();

  // Grained.js
  function runGrained() {
    var options = {
      animate: true,
      patternWidth: 100,
      patternHeight: 100,
      grainOpacity: 0.07,
      grainDensity: 1,
      grainWidth: 1.1,
      grainHeight: 1,
    };
    grained("#wrapper", options);
  }

  const mediaQuery = window.matchMedia("(min-width: 999px)");

  if (mediaQuery.matches) {
    runGrained();
  }

  window.addEventListener("resize", () => {
    if (mediaQuery.matches) {
      runGrained();
    }
  });
});
