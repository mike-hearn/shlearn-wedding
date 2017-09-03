import Ember from "ember";

var items = [
  {
    src: "/static/website_photos/7G9A2392.jpg",
    w: 2640,
    h: 3960,
    msrc: "/static/website_photos/7G9A2392.jpg-thumb.jpg"
  },
  {
    src: "/static/website_photos/7G9A2404.jpg",
    w: 3960,
    h: 2640,
    msrc: "/static/website_photos/7G9A2404.jpg-thumb.jpg"
  },
  {
    src: "/static/website_photos/7G9A2420.jpg",
    w: 3960,
    h: 2640,
    msrc: "/static/website_photos/7G9A2420.jpg-thumb.jpg"
  },
  {
    src: "/static/website_photos/IMG_8709.jpg",
    w: 4000,
    h: 3000,
    msrc: "/static/website_photos/IMG_8709.jpg-thumb.jpg"
  },
  {
    src: "/static/website_photos/MAIN PAGE.jpg",
    msrc: "/static/website_photos/MAIN PAGE.jpg-thumb.jpg",
    h: 3960,
    w: 2640
  },
  {
    src: "/static/website_photos/MO8A3671.jpg",
    msrc: "/static/website_photos/MO8A3671.jpg-thumb.jpg",
    h: 3960,
    w: 2640
  },
  {
    src: "/static/website_photos/MO8A3690e.jpg",
    msrc: "/static/website_photos/MO8A3690e.jpg-thumb.jpg",
    h: 3960,
    w: 2640
  },
  {
    src: "/static/website_photos/MO8A3745.jpg",
    msrc: "/static/website_photos/MO8A3745.jpg-thumb.jpg",
    h: 3960,
    w: 2640
  },
  {
    src: "/static/website_photos/MO8A3771.jpg",
    msrc: "/static/website_photos/MO8A3771.jpg-thumb.jpg",
    h: 3960,
    w: 2640
  },
  {
    src: "/static/website_photos/MO8A4132.jpg",
    msrc: "/static/website_photos/MO8A4132.jpg-thumb.jpg",
    w: 3960,
    h: 2640
  },
  {
    src: "/static/website_photos/MO8A4249.jpg",
    msrc: "/static/website_photos/MO8A4249.jpg-thumb.jpg",
    w: 3960,
    h: 2640
  },
  {
    src: "/static/website_photos/MO8A4342.jpg",
    msrc: "/static/website_photos/MO8A4342.jpg-thumb.jpg",
    h: 3960,
    w: 2640
  },
  {
    src: "/static/website_photos/MO8A4377.jpg",
    msrc: "/static/website_photos/MO8A4377.jpg-thumb.jpg",
    h: 3960,
    w: 2640
  },
  {
    src: "/static/website_photos/MO8A4433.jpg",
    msrc: "/static/website_photos/MO8A4433.jpg-thumb.jpg",
    h: 3960,
    w: 2640
  },
  {
    src: "/static/website_photos/MO8A4512.jpg",
    msrc: "/static/website_photos/MO8A4512.jpg-thumb.jpg",
    h: 3960,
    w: 2640
  },
  {
    src: "/static/website_photos/MO8A4577.jpg",
    msrc: "/static/website_photos/MO8A4577.jpg-thumb.jpg",
    h: 3960,
    w: 2640
  },
  {
    src: "/static/website_photos/MO8A4669.jpg",
    msrc: "/static/website_photos/MO8A4669.jpg-thumb.jpg",
    w: 3960,
    h: 2640
  },
  {
    src: "/static/website_photos/MO8A4785.jpg",
    msrc: "/static/website_photos/MO8A4785.jpg-thumb.jpg",
    h: 3960,
    w: 2640
  }
];

export default Ember.Route.extend({
  titleToken: "Photos",
  model() {
    return items;
  }
});
