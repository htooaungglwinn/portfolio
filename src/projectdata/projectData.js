export default class ProjectData {
  constructor() {
    this.projects = [
      {
        name: "SplitNow",
        type: "Case Study",
        projectId: 1,
        detail: "Product design | August 2023",
        title: "An app that helps users to save time when dividing expenses",
        coverImage: "./public/images/Project Mobile App Mockup.png",
        pagelink: "./src/pages/splitnow.html",
      },
      {
        name: "Bookies",
        type: "Case Study",
        projectId: 2,
        detail: "Product design | January 2022",
        title: "A more efficient way to save money on books",
        coverImage: "./public/images/Project Bookies Cover.png",
        pagelink: "./src/pages/bookies.html",
      },
      {
        name: "Grow A Wish",
        type: "Redesign Project",
        projectId: 3,
        detail: "Website Redesign | August 2023",
        title:
          "A better usability and a fresh look home page for a startup brand",
        coverImage: "./public/images/Project GrowAWish.png",
        pagelink: "./src/pages/growawish.html",
      },
      {
        name: "The Samba Poster",
        type: "Poster Design",
        projectId: 4,
        detail: "Poster Design | Grid Layout",
        title:
          "Poster designs that enhance the look and feel of the Adidas Samba",
        coverImage: "./public/images/Project Samba Cover.png",
        pagelink: "./src/pages/samba.html",
      },
      {
        name: "Nike Poster",
        type: "Poster Design",
        projectId: 5,
        detail: "Poster Design | Grid Layouts",
        title:
          "Experimenting the fusion of two grid systems by the Swiss Legend Josef Müller-Brockmann",
        coverImage: "./public/images/Nike Stussy Cover.png",
        pagelink: "./src/pages/nikestussy.html",
      },
    ];
  }
}
