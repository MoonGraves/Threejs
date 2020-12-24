Tossa edellisen galaxi siellä esikatsellussa, jossa vasen ylä kulmassa on tollainen pikku suorituskyky, joka kuin suorittaa tämän käyttäjän olevan sovelluksen
tiedonsiirron nopeuden, josta voi klikkaa että näkyy FPS ja Ms eli bittinopeus. Bittinopeus heittää siinä 15-20Mbit/s ~~ 

  <!--Stats -->
  <script src="https://stemkoski.github.io/Three.js/js/Stats.js"></script>
  
  var stats;
  
  // STATS 
  stats = new Stats();
  stats.domElement.style.position = 'absolute'; //relative
  document.body.appendChild(stats.domElement);

  //Function animate () {
  stats.update();
