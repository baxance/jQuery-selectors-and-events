'use strict';

function HornPic(description, horns, image_url, keyword, title) {
  this.description = description;
  this.horns = horns;
  this.image_url = image_url;
  this.keyword = keyword;
  this.title = title;

  HornPic.allHornPics.push(this);
}

HornPic.allHornPics = [];

HornPic.prototype.renderHorn = function() {
  const $templateCopy = $('#photo-template').clone();
  $templateCopy.removeAttr('id');
  $templateCopy.find('h2').text(this.title);
  $templateCopy.find('img').attr('src', this.image_url);
  $templateCopy.find('p').text(this.description);
  console.log($templateCopy.html());
  $('ul').append($templateCopy);
};

$.ajax('data/page-1.json').then(ImageData);

function ImageData(images) {
  console.log(images);

  images.forEach(hornJsonObject => {
    new HornPic(hornJsonObject.description, hornJsonObject.horns, hornJsonObject.image_url, hornJsonObject.keyword, hornJsonObject.title);
  });

  HornPic.allHornPics.forEach(hornPic => hornPic.renderHorn());

}


