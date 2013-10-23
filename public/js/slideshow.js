var slides_data = [
  {
    title: "I'm a...",
    options: [
      {
        text: "Visitor",
        destination: 1
      },
      {
        text: "Presentor",
        destination: 2
      },
      {
        text: "Vendor",
        destination: 3
      }
    ],
    previous: null
  },
  {
    title: "I need help with...",
    options: [
      {
        text: "Parking",
        destination: null,
        link: "map"
      },
      {
        text: "Finding showcases",
        destination: null,
        link: "map"
      },
      {
        text: "Finding Food",
        destination: null,
        link: "map"
      }
    ],
    previous: 0
  },
  {
    title: "I need help with...",
    options: [
      {
        text: "Parking",
        destination: null,
        link: "map"
      },
      {
        text: "Finding my showcase",
        destination: null,
        link: "map"
      },
      {
        text: "Setting up",
        destination: null,
        link: "map"
      }
    ],
    previous: 0
  },
  {
    title: "I need help with...",
    options: [
      {
        text: "Parking",
        destination: null,
        link: "map"
      },
      {
        text: "Setting up",
        destination: null,
        link: "map"
      },
      {
        text: "Contacting a volunteer",
        destination: null,
        link: "map"
      }
    ],
    previous: 0
  }
];

// Rewrite for above code. Currently not used.

var Slideshow = function(){
  this.current_slide_index = 0;
  this.slides = [];
}

Slideshow.prototype.current_slide = function(){
  return this.slides[this.current_slide_index];
}

Slideshow.prototype.update_slide = function(){
  var current_slideshow = this;
  $('#slide_title').text(current_slideshow.current_slide().title)
  $('#slide_options').html(''); //empty options
  // Create each option
  for (var i=0;i<current_slideshow.current_slide().options.length;i++){
    var href;
    if (this.current_slide().options[i].link != null){
      href = this.current_slide().options[i].link;
    }
    else{
      href = "#"
    }
    $('#slide_options').append('<li><a class="btn btn-primary slide_option" href="'+ href +'" data-dest="'+ current_slideshow.current_slide().options[i].destination +'">'+ current_slideshow.current_slide().options[i].text +'</a></li>')
  }

  // Click events for each option to continue down the path
  $('.slide_option').click(function(){
    if ($(this).data('dest') != null){
      current_slideshow.change_slide($(this).data('dest'));
    }
  });

  // Create and link previous button
  if (this.current_slide_index != 0){
    $('#slide_options').append('<li><a class="btn btn-warning slide_option" href="#">&laquo Back</a></li>')
    $('#slide_options li a').last().click(function(){
      current_slideshow.change_slide(current_slideshow.current_slide().previous);
    })
  }
}

Slideshow.prototype.change_slide = function(index){
  this.current_slide_index = index;
  this.update_slide();
}

var Slide = function(title, previous){
  this.title = title;
  this.previous = previous;
  this.options = [];
}

var Option = function(text, destination, link){
  if(typeof(link)==='undefined') link = null;
  this.text = text;
  this.destination = destination;
  this.link = link;
}


var slideshow = new Slideshow();
function setup(){
  for (var i=0; i <= slides_data.length-1; i++){
    var new_slide = new Slide(slides_data[i].title, slides_data[i].previous);
    for (var j=0; j < slides_data[i].options.length; j++){
      var option_data = slides_data[i].options[j];
      var new_option = new Option(option_data.text, option_data.destination, option_data.link);
      new_slide.options.push(new_option);
    }
    slideshow.slides.push(new_slide);
  }
  slideshow.update_slide();
}


$(document).ready(function(){
  setup();
})
