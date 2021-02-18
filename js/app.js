'use strict';

const allHornPics = [];
const allHornPics2 = [];

function HornPic(description, horns, image_url, keyword, title) {
  this.description = description;
  this.horns = horns;
  this.image_url = image_url;
  this.keyword = keyword;
  this.title = title;
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

$('#buttonOne').on('click', () => {
  $('#main').empty();
  allHornPics.forEach(hornPic => hornPic.renderHornMustache());
});

$('#buttonTwo').on('click', () => {
  $('#main').empty();
  allHornPics2.forEach(hornPic => hornPic.renderHornMustache());

});

// $.ajax('data/page-2.json').then(ImageData2);
imageData();
imageData2();
