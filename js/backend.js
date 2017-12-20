'use strict';

(function () {

  var setup = function (onSuccess, onError, method, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open(method, url);

    return xhr;
  };

  window.backend = {
    load: function (onLoad, error) {
      var urlServer = 'https://1510.dump.academy/code-and-magick/data';
      var methodTransmission = 'GET';
      var xhr = setup(onLoad, error, methodTransmission, urlServer);

      xhr.send();
    },

    save: function (data, onLoad, error) {
      var urlServer = ' https://js.dump.academy/code-and-magick';
      var methodTransmission = 'POST';
      var xhr = setup(onLoad, error, methodTransmission, urlServer);

      xhr.send(data);
    }
  };
})();
