(function () {
    "use strict";
  
    // save the original methods before overwriting them
    [Document, Window, Element].forEach((cst) => {
      if (typeof cst === "function") {
        cst.prototype._addEventListener = cst.prototype.addEventListener;
        cst.prototype._removeEventListener = cst.prototype.removeEventListener;
  
        /**
         * [addEventListener description]
         * @param {[type]}  type       [description]
         * @param {[type]}  listener   [description]
         * @param {Boolean} useCapture [description]
         */
        cst.prototype.addEventListener = function (
          type,
          listener,
          useCapture = false
        ) {
          // declare listener
          this._addEventListener(type, listener, useCapture);
  
          if (!this.eventListenerList) this.eventListenerList = {};
          if (!this.eventListenerList[type]) this.eventListenerList[type] = [];
  
          // add listener to  event tracking list
          this.eventListenerList[type].push({ type, listener, useCapture });
        };
  
        /**
         * [removeEventListener description]
         * @param  {[type]}  type       [description]
         * @param  {[type]}  listener   [description]
         * @param  {Boolean} useCapture [description]
         * @return {[type]}             [description]
         */
        cst.prototype.removeEventListener = function (
          type,
          listener,
          useCapture = false
        ) {
          // remove listener
          this._removeEventListener(type, listener, useCapture);
  
          if (!this.eventListenerList) this.eventListenerList = {};
          if (!this.eventListenerList[type]) this.eventListenerList[type] = [];
  
          // Find the event in the list, If a listener is registered twice, one
          // with capture and one without, remove each one separately. Removal of
          // a capturing listener does not affect a non-capturing version of the
          // same listener, and vice versa.
          for (let i = 0; i < this.eventListenerList[type].length; i++) {
            if (
              this.eventListenerList[type][i].listener === listener &&
              this.eventListenerList[type][i].useCapture === useCapture
            ) {
              this.eventListenerList[type].splice(i, 1);
              break;
            }
          }
          // if no more events of the removed event type are left,remove the group
          if (this.eventListenerList[type].length == 0)
            delete this.eventListenerList[type];
        };
  
        /**
         * [getEventListeners description]
         * @param  {[type]} type [description]
         * @return {[type]}      [description]
         */
        cst.prototype.getEventListeners = function (type) {
          if (!this.eventListenerList) this.eventListenerList = {};
  
          // return reqested listeners type or all them
          if (type === undefined) return this.eventListenerList;
          return this.eventListenerList[type];
        };
      }
    });
  })();