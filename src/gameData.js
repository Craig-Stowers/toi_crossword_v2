const getGameData = () => {
   let allImages = [];

   allImages.push(require(`./images/01.jpg`).default);
   allImages.push(require(`./images/01b.jpg`).default);
   allImages.push(require(`./images/02.jpg`).default);
   allImages.push(require(`./images/02b.jpg`).default);
   allImages.push(require(`./images/03.jpg`).default);
   allImages.push(require(`./images/03b.jpg`).default);
   allImages.push(require(`./images/04.jpg`).default);
   allImages.push(require(`./images/04b.jpg`).default);
   allImages.push(require(`./images/05.jpg`).default);
   allImages.push(require(`./images/05b.jpg`).default);

   allImages.push(require(`./images/ui/logo-medium.png`).default);
   allImages.push(require(`./images/ui/logo-small.png`).default);
   allImages.push(require(`./images/ui/play.png`).default);
   allImages.push(require(`./images/ui/how-to-play.png`).default);
   allImages.push(require(`./images/ui/info.png`).default);
   allImages.push(require(`./images/ui/next-level.png`).default);
   allImages.push(require(`./images/ui/exit-game.png`).default);
   allImages.push(require(`./images/ui/exit-level.png`).default);
   allImages.push(require(`./images/ui/main-menu.png`).default);
   allImages.push(require(`./images/ui/diamonds.png`).default);
   allImages.push(require(`./images/ui/step1.png`).default);
   allImages.push(require(`./images/ui/step2.png`).default);
   allImages.push(require(`./images/ui/step3.png`).default);
   allImages.push(require(`./images/ui/cross.png`).default);
   allImages.push(require(`./images/ui/tick.png`).default);

   let gameData = [
      {
         title: "Level 1: Clowning around",
         images: [allImages[0], allImages[1]],
         targets: [
            { x: 35.22, y: 8.59 },
            { x: 42.85, y: 71.75 },
            { x: 80.35, y: 77.56 },
         ],
      },

      {
         title: "Level 2: Clock watching",
         images: [allImages[2], allImages[3]],
         targets: [
            { x: 3.08, y: 59.92 },
            { x: 20.45, y: 18.41 },
            { x: 52.11, y: 86.49 },
            { x: 57.14, y: 16.4 },
         ],
      },
      {
         title: "Level 3: Road to Rio",
         images: [allImages[4], allImages[5]],
         targets: [
            { x: 27.43, y: 45.64 },
            { x: 60.06, y: 26.44 },
            { x: 64.61, y: 44.97 },
            { x: 85.55, y: 52.56 },
            { x: 94, y: 37 },
         ],
      },
      {
         title: "Level 4: Fishy business",
         images: [allImages[6], allImages[7]],
         targets: [
            { x: 3.57, y: 31.8 },
            { x: 19.8, y: 19.75 },
            { x: 63.31, y: 62.38 },
            { x: 63.79, y: 41.4 },
            { x: 77.92, y: 15.5 },
            { x: 90, y: 8.5 },
         ],
      },

      {
         title: "Level 5: Guten Tag!",
         images: [allImages[8], allImages[9]],
         targets: [
            { x: 10.71, y: 45.19 },
            { x: 22.07, y: 12.83 },
            { x: 24.02, y: 61.93 },
            { x: 33.76, y: 22.42 },
            { x: 49.67, y: 72.2 },
            { x: 51.94, y: 44.97 },
            { x: 99.18, y: 44.3 },
         ],
      },
   ];

   return { gameData, allImages };
};

const { gameData, allImages } = getGameData();

export { gameData, allImages };
