var current_slide = 0;

function change_slide(slide_index){
  current_slide = slide_index;
  update_slide();
}

function update_slide(){
  $('#slide_title').text(slides[current_slide].title)
  $('#slide_options').html(''); //empty options
  // Create each option
  for (var i=0;i<slides[current_slide].options.length;i++){
    $('#slide_options').append('<li><a class="btn btn-primary slide_option" href="#" data-dest="'+ slides[current_slide].options[i].destination +'">'+ slides[current_slide].options[i].text +'</a></li>')
  }

  // Click events for each option to continue down the path
  $('.slide_option').click(function(){
    change_slide($(this).data('dest'));
  });

  // Create and link previous button
  if (current_slide != 0){
    $('#slide_options').append('<li><a class="btn btn-warning slide_option" href="#">&laquo Back</a></li>')
    $('#slide_options li a').last().click(function(){
      change_slide(slides[current_slide].previous);
    })
  }
}

function setup(){
  update_slide();
}


var slides = [
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
        link: "map.html"
      },
      {
        text: "Finding showcases",
        destination: null,
        link: "map.html"
      },
      {
        text: "Finding Food",
        destination: null,
        link: "map.html"
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
        link: "map.html"
      },
      {
        text: "Finding my showcase",
        destination: null,
        link: "map.html"
      },
      {
        text: "Setting up",
        destination: null,
        link: "map.html"
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
        link: "map.html"
      },
      {
        text: "Setting up",
        destination: null,
        link: "map.html"
      },
      {
        text: "Contacting a volunteer",
        destination: null,
        link: "map.html"
      }
    ],
    previous: 0
  }
];


$(document).ready(function(){
  setup();
})