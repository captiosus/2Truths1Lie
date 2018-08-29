var video_key = [
  {'person': 'Arjun', 'answer': 1, 'title': 'Pursed Lips', 'description': 'People may purse their lips to counteract the dry mouth that comes from lying'},
  {'person': 'Ashley', 'answer': 1, 'title': 'Shifty Eyes', 'description': 'In a spontaneous situation, shifty eyes can indicate that the person is attempting to think of a lie'},
  {'person': 'Devin', 'answer': 2, 'title': 'Tone of Voice', 'description': 'Liars often try to find time to think of a lie which may cause a change in tone as they attempt to stall'},
  {'person': 'Maike', 'answer': 0, 'title': 'Smiling', 'description': 'Liars often inadvertently lift their lips into a smile'},
  {'person': 'Sarah', 'answer': 1, 'title': 'Biting Lip', 'description': 'Lip biting is one of the ways that we pacify ourselves when we are stressed'},
  {'person': 'Timur', 'answer': 1, 'title': 'Scratching Head', 'description': 'People\'s faces often itch when they are lying'},
  {'person': 'Eliana', 'answer': 2, 'title': 'Shifty Eyes', 'description': 'In a spontaneous situation, shifty eyes can indicate that the person is attempting to think of a lie'},
  {'person': 'Dj', 'answer': 0, 'title': 'Scratching Shoulder', 'description': 'Actions different from those performed during truths could indicate lying'},
  {'person': 'Marcos', 'answer': 1, 'title': 'Raising Eyebrows', 'description': 'Liars may frown and furrow their eyebrows as an expression of distress'},
  {'person': 'Sybil', 'answer': 0, 'title': 'Shifty Eyes', 'description': 'In a spontaneous situation, shifty eyes can indicate that the person is attempting to think of a lie'},
  {'person': 'Julia', 'answer': 1, 'title': 'No Trace', 'description': 'Sometimes it\'s just hard to tell'},
  {'person': 'Zain', 'answer': 1, 'title': 'Scratching Head', 'description': 'People\'s faces often itch when they are lying'}
]
var correct = `<i class="material-icons correct">check</i>`
var incorrect = `<i class="material-icons incorrect">close</i>`

var current;
var pending = false;
var counter = 0;
var score = 0;

var selection = document.getElementById('selection');
var review = document.getElementById('review-container')
var choice = document.getElementById('choice-video');
var answers = document.getElementsByClassName('choice-answer');

function removeStatic(position) {
  var video_static = document.getElementsByClassName('video-description-static');
  video_static[position].classList.add('transparent');
  if (counter == video_key.length) {
    document.getElementById('review-button').style.display = 'block';
    document.getElementById('cover').style.display = 'block';
  }
}

function getVideoContainer(index) {
  return `
    <div class="video-container">
      <div class="video-img-container">
        <img class="video-img" src="images/${video_key[index].person}.png">
        </img>
        <div class="video-img-cover hide"></div>
      </div>
      <div class="video-description">
        <p>${video_key[index].title}</p>
        <div class="video-description-static"></div>
      </div>
    </div>
  `;
}

function getReviewContainer(index) {
  return `
    <div class="review-video-container">
      <img class="review-video" src="images/${video_key[index].person}.png">
      </img>
    </div>
  `
}

for (var index = 0; index < video_key.length; index++) {
  selection.innerHTML += getVideoContainer(index);
}

for (var index = 0; index < video_key.length; index++) {
  if (index == 6) {
    review.innerHTML += `
      <div class="review-filler">
        <h1>How well did you do?</h1>
        <p><span id="final-score"></span>/${video_key.length}</p>
      </div>
    `;
  }
  review.innerHTML += getReviewContainer(index);
}

var review_videos = document.getElementsByClassName('review-video-container');

for (var index = 0; index < review_videos.length; index++) {
  review_videos[index].index = index;
  review_videos[index].onclick = function(e) {
    e.preventDefault();
    if (!video_key[this.index].correct) {
      document.getElementById('answer-correct').innerHTML = 'INCORRECT';
      document.getElementById('answer-correct').style.color = 'red';
    } else {
      document.getElementById('answer-correct').innerHTML = 'CORRECT';
      document.getElementById('answer-correct').style.color = 'green';
    }
    document.getElementById('answer-title').innerHTML = video_key[this.index].title;
    document.getElementById('answer-number').innerHTML = 'Lie ' + (video_key[this.index].answer + 1);
    document.getElementById('answer-description').innerHTML = video_key[this.index].description;
    document.getElementById('answer-video').src = 'video/' + video_key[this.index].person + 'Lie.mp4';
    document.getElementById('answer-video').load();
    document.getElementById('answer-video-cover').style.display = 'block';
    document.getElementById('answer-video-play').style.display = 'block';
    document.getElementById('answer-video-replay').style.display = 'none';
    document.getElementById('cover').style.display = 'block';
    document.getElementById('answer').style.display = 'block';
  }
}

var videos = document.getElementsByClassName('video-img');
var video_covers = document.getElementsByClassName('video-img-cover')

for (var index = 0; index < videos.length; index++) {
  videos[index].index = index;
  videos[index].addEventListener('click', function(e) {
    e.preventDefault();
    current = this.index;
    document.getElementById('cover').style.display = 'block';
    choice.src = 'video/' + video_key[this.index].person + '.mp4';
    choice.load();
    document.getElementById('choice').style.display = 'block';
    document.getElementById('choice-video-cover').style.display = 'block';
    document.getElementById('choice-video-play').style.display = 'block';
    document.getElementById('choice-video-replay').style.display = 'none';
  });
}


document.getElementById('cover').addEventListener('click', function(e) {
  e.preventDefault();
  this.style.display = 'none';
  document.getElementById('choice').style.display = 'none';
  document.getElementById('answer').style.display = 'none';
  document.getElementById('choice-video').pause();
  document.getElementById('answer-video').pause();
  if (pending) {
    pending = false;
    setTimeout(removeStatic(current), 1000);
  }
});

document.getElementById('choice-close').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('cover').style.display = 'none';
  document.getElementById('choice').style.display = 'none';
  document.getElementById('choice-video').pause();
});

document.getElementById('answer-close').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('cover').style.display = 'none';
  document.getElementById('answer').style.display = 'none';
  document.getElementById('answer-video').pause();
  if (pending) {
    setTimeout(removeStatic(current), 1000);
    pending = false;
  }
});

for (var index = 0; index < answers.length; index++) {
  answers[index].index = index;
  answers[index].addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('choice-video').pause();
    video_covers[current].classList.remove('hide');
    counter++;
    if (this.index != video_key[current].answer) {
      document.getElementById('answer-correct').innerHTML = 'INCORRECT';
      document.getElementById('answer-correct').style.color = 'red';
      video_key[current].correct = false;
      video_covers[current].innerHTML = incorrect;
    } else {
      document.getElementById('answer-correct').innerHTML = 'CORRECT';
      document.getElementById('answer-correct').style.color = 'green';
      video_key[current].correct = true;
      video_covers[current].innerHTML = correct;
      score++;
      document.getElementById('score').innerHTML = score;
    }
    document.getElementById('answer-title').innerHTML = video_key[current].title;
    document.getElementById('answer-description').innerHTML = video_key[current].description;
    document.getElementById('answer-number').innerHTML = 'Lie was #' + (video_key[current].answer + 1);
    document.getElementById('answer-video').src = 'video/' + video_key[current].person + 'Lie.mp4';
    document.getElementById('answer-video').load();
    document.getElementById('answer-video-cover').style.display = 'block';
    document.getElementById('answer-video-play').style.display = 'block';
    document.getElementById('answer-video-replay').style.display = 'none';
    document.getElementById('choice').style.display = 'none';
    document.getElementById('answer').style.display = 'block';
    pending = true;
  });
}

document.getElementById('title-video-play').onclick = function(e) {
  e.preventDefault();
  document.getElementById('title-video-video').play();
  document.getElementById('title-video-skip').style.display = 'block';
  document.getElementById('title-video-cover').style.display = 'none';
  this.style.display = 'none';
}

document.getElementById('title-video-replay').onclick = function(e) {
  e.preventDefault();
  document.getElementById('title-video-cover').style.display = 'none';
  document.getElementById('title-video-continue').style.display = 'none';
  document.getElementById('title-video-skip').style.display = 'block';
  document.getElementById('title-video-video').currentTime = 0;
  document.getElementById('title-video-video').play();
  this.style.display = 'none';
}

document.getElementById('title-video-skip').onclick = function(e) {
  e.preventDefault();
  document.getElementById('title-video-video').pause();
  document.getElementById('title-video').style.display = 'none';
  document.getElementById('video-screen').style.display = 'block';
}

document.getElementById('title-video-video').onended = function(e) {
  e.preventDefault();
  document.getElementById('title-video-cover').style.display = 'block';
  document.getElementById('title-video-replay').style.display = 'block';
  document.getElementById('title-video-continue').style.display = 'block';
  document.getElementById('title-video-skip').style.display = 'none';
}

document.getElementById('title-video-continue').onclick = function(e) {
  e.preventDefault();
  document.getElementById('title-video').style.display = 'none';
  document.getElementById('video-screen').style.display = 'block';
}

document.getElementById('choice-video-play').onclick = function(e) {
  e.preventDefault();
  document.getElementById('choice-video').play();
  document.getElementById('choice-video-cover').style.display = 'none';
  this.style.display = 'none';
}

document.getElementById('choice-video-replay').onclick = function(e) {
  e.preventDefault();
  document.getElementById('choice-video').currentTime = 0;
  document.getElementById('choice-video').play();
  document.getElementById('choice-video-cover').style.display = 'none';
  this.style.display = 'none';
}

document.getElementById('choice-video').onended = function(e) {
  e.preventDefault();
  document.getElementById('choice-video-cover').style.display = 'block';
  document.getElementById('choice-video-play').style.display = 'none';
  document.getElementById('choice-video-replay').style.display = 'block';
}

document.getElementById('answer-video-play').onclick = function(e) {
  e.preventDefault();
  document.getElementById('answer-video').play();
  document.getElementById('answer-video-cover').style.display = 'none';
  this.style.display = 'none';
}

document.getElementById('answer-video').onended = function(e) {
  e.preventDefault();
  document.getElementById('answer-video-cover').style.display = 'block';
  document.getElementById('answer-video-play').style.display = 'none';
  document.getElementById('answer-video-replay').style.display = 'block';
}

document.getElementById('answer-video-replay').onclick = function(e) {
  e.preventDefault();
  document.getElementById('answer-video').currentTime = 0;
  document.getElementById('answer-video').play();
  document.getElementById('answer-video-cover').style.display = 'none';
  this.style.display = 'none';
}

document.getElementById('review-button').onclick = function(e) {
  document.getElementById('video-screen').style.display = 'none';
  document.getElementById('review').style.display = 'block';
  document.getElementById('final-score').innerHTML = score;
  document.getElementById('cover').style.display = 'none';
  for (var index = 0; index < review_videos.length; index++) {
    if (video_key[index].correct) {
      review_videos[index].innerHTML += correct;
    } else {
      review_videos[index].innerHTML += incorrect;
    }
  }
}

// document.getElementById('title-screen').style.display = 'none';
