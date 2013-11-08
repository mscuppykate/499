describe("Slideshow", function() {
  // slideshow is a global variable set in the setup function of slideshow.js
  // It instantiates all the slides and options used in the site.

  it("should setup properly", function(){
    expect(slideshow.slides.length == 0).toBe(false);
  });

  it("should return the current slide index", function(){
    expect(slideshow.current_slide_index).toEqual(0);
  });

  it("should return the current slide", function(){
    expect(slideshow.current_slide()).toEqual(slideshow.slides[0]);
  });

  it("should update the current slide", function(){
    spyOn(slideshow, 'update_slide');
    slideshow.change_slide(1);
    expect(slideshow.update_slide).toHaveBeenCalled();
    expect(slideshow.current_slide_index).toEqual(1);
    expect(slideshow.current_slide()).toEqual(slideshow.slides[1]);
  })
})
