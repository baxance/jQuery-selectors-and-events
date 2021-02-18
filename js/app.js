'use strict';

const allHornPics = [];
const allHornPics2 = [];
console.log(allHornPics.sort(this.horns));

function HornPic(description, horns, image_url, keyword, title) {
  this.description = description;
  this.horns = horns;
  this.image_url = image_url;
  this.keyword = keyword;
  this.title = title;
}

// allHornPics.sort(compareHorns); will call this later to sort
function compareHorns(hornA, hornB) {
  if (hornA.horns > hornB.horns) {
    return 1;
  }
  else if (hornB.horns > hornA.horns) {
    return -1;
  }
  else if (hornA.horns === hornB.horns) {
    return 0;
  }
}

function compareTitle(titleA, titleB) {
  if (titleA.title > titleB.title) {
    return 1;
  }
  else if (titleB.title > titleA.title) {
    return -1;
  }
  else if (titleA.title === titleB.title) {
    return 0;
  }
}

HornPic.prototype.renderHornMustache = function() {
  const htmlTemplate = $('#mustache-template').html();

  const outputFromMustache = Mustache.render(htmlTemplate, this);

  $('body > main').append(outputFromMustache);
};

function imageData() {

  $.ajax('data/page-1.json').then(imageData => {
    imageData.forEach(hornJsonObject => {
      const newPic = new HornPic(hornJsonObject.description, hornJsonObject.horns, hornJsonObject.image_url, hornJsonObject.keyword, hornJsonObject.title);
      allHornPics.push(newPic);
    });

    allHornPics.forEach(hornPic => hornPic.renderHornMustache());
    allHornPics.forEach(hornOption => hornOption.optionHorn());
    allHornPics.sort(compareHorns); // just a test 
  });

}

function imageData2() {

  $.ajax('data/page-2.json').then(ImageData => {
    ImageData.forEach(hornJsonObject => {
      const newPic2 = new HornPic(hornJsonObject.description, hornJsonObject.horns, hornJsonObject.image_url, hornJsonObject.keyword, hornJsonObject.title);
      allHornPics2.push(newPic2);
    });

    allHornPics2.forEach(hornPic => hornPic.renderHornMustache());
    allHornPics2.forEach(hornOption => hornOption.optionHorn());
    allHornPics2.sort(compareHorns);
  });

}

HornPic.prototype.optionHorn = function() {
  const $optionCopy = $('#dropDown').clone();
  $optionCopy.attr('value', this.keyword);
  $optionCopy.text(this.keyword);
  $('select').append($optionCopy);
};

$('#selector').on('change', handleClickingOnKeyword);

function handleClickingOnKeyword() {
  $('.hornedAnimal').hide();
  const value = ($(this).val());
  $(`.${value}`).show();
}

let pageOn = 0;

$('#buttonOne').on('click', () => {
  pageOn = 1;
  $('#main').empty();
  allHornPics.forEach(hornPic => hornPic.renderHornMustache());
});

$('#buttonTwo').on('click', () => {
  pageOn = 2;
  $('#main').empty();
  allHornPics2.forEach(hornPic => hornPic.renderHornMustache());

});

$('#hornSort').on('click', () => {
  $('#main').empty();

  if (pageOn === 1) {
    allHornPics.sort(compareHorns);
    allHornPics.forEach(hornPic => hornPic.renderHornMustache());
  }
  else if (pageOn === 2) {
    allHornPics2.sort(compareHorns);
    allHornPics2.forEach(hornPic => hornPic.renderHornMustache());
  }
  else {
    allHornPics.sort(compareHorns);
    allHornPics.forEach(hornPic => hornPic.renderHornMustache());
    allHornPics2.sort(compareHorns);
    allHornPics2.forEach(hornPic => hornPic.renderHornMustache());
  }
});

$('#titleSort').on('click', () => {
  $('#main').empty();

  if (pageOn === 1) {
    allHornPics.sort(compareTitle);
    allHornPics.forEach(hornPic => hornPic.renderHornMustache());
  }
  else if (pageOn === 2) {
    allHornPics2.sort(compareTitle);
    allHornPics2.forEach(hornPic => hornPic.renderHornMustache());
  }
  else {
    allHornPics.sort(compareTitle);
    allHornPics.forEach(hornPic => hornPic.renderHornMustache());
    allHornPics2.sort(compareTitle);
    allHornPics2.forEach(hornPic => hornPic.renderHornMustache());
  }
});

// $.ajax('data/page-2.json').then(ImageData2);
imageData();
imageData2();


