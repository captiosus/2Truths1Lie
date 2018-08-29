var description = ["lie \\ \ˈlī \\", 'intransitive verb', '1. to make an untrue statement with intent to deceive', '2. to create a false or misleading impression']

var curr = 0;
var descriptionIndex = 0;

var container = document.getElementById('description');

window.onload = function() {
  var textFill = setInterval(function() {
    if (descriptionIndex >= description.length) {
      clearInterval(textFill);
      return;
    }
    if (curr > description[descriptionIndex].length) {
      descriptionIndex++;
      curr = 0;
      container.innerHTML += `<br>`;
      return;
    }
    container.innerHTML += description[descriptionIndex].charAt(curr);
    curr++;
  }, 40);
  document.getElementById('start').onclick = function() {
    if (textFill) {
      clearInterval(textFill);
    }
    document.getElementById('title-screen').style.display = 'none';
    document.getElementById('title-video').style.display = 'block';
  }
}
