(function() {
    'use strict';

    // todo : use a weakmap to store the references
    const _eventListeners = new WeakMap();

    // save the original methods before overwriting them
    Element.prototype._addEventListener = Element.prototype.addEventListener;
    Element.prototype._removeEventListener = Element.prototype.removeEventListener;


    /**
     * [addEventListener description]
     * @param {[type]} a [description]
     * @param {[type]} b [description]
     * @param {[type]} c [description]
     */
    Element.prototype.addEventListener = function(a,b,c) {
        if(c==undefined)  c=false;
        this._addEventListener(a,b,c);

        if(!this.eventListenerList) this.eventListenerList = {};
        if(!this.eventListenerList[a]) this.eventListenerList[a] = [];

        //this.removeEventListener(a,b,c); // TODO - handle duplicates..
        this.eventListenerList[a].push({listener:b,useCapture:c});
    };

    /**
     * [removeEventListener description]
     * @param  {[type]} a [description]
     * @param  {[type]} b [description]
     * @param  {[type]} c [description]
     * @return {[type]}   [description]
     */
    Element.prototype.removeEventListener = function(a,b,c) {
        if(c==undefined)
            c=false;
        this._removeEventListener(a,b,c);
        if(!this.eventListenerList) this.eventListenerList = {};
        if(!this.eventListenerList[a]) this.eventListenerList[a] = [];

        // Find the event in the list
        for(var i=0;i<this.eventListenerList[a].length;i++){
            if(this.eventListenerList[a][i].listener==b && this.eventListenerList[a][i].useCapture==c){ // Hmm..
                this.eventListenerList[a].splice(i, 1);
                break;
            }
        }

        if(this.eventListenerList[a].length==0) delete this.eventListenerList[a];
    };


    /**
     * [getEventListeners description]
     * @param  {[type]} a [description]
     * @return {[type]}   [description]
     */
    Element.prototype.getEventListeners = function(a){
        if(!this.eventListenerList) this.eventListenerList = {};
        if(a==undefined)  return this.eventListenerList;
        return this.eventListenerList[a];
    };


    /*
    Element.prototype.clearEventListeners = function(a){
        if(!this.eventListenerList)
            this.eventListenerList = {};
        if(a==undefined){
            for(var x in (this.getEventListeners())) this.clearEventListeners(x);
            return;
        }
        var el = this.getEventListeners(a);
        if(el==undefined)
            return;
        for(var i = el.length - 1; i >= 0; --i) {
            var ev = el[i];
            this.removeEventListener(a, ev.listener, ev.useCapture);
        }
    };
    */

})();
