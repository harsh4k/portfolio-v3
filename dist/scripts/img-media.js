/** Wodniack engine calls .play()/.pause() on <img> posters. Keep in HEAD (classic). */
if (!HTMLImageElement.prototype.play) {
  HTMLImageElement.prototype.play = function () {
    return Promise.resolve();
  };
  HTMLImageElement.prototype.pause = function () {};
}
