(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('simple-sortable', ["jquery","simple-module","simple-dragdrop"], function (a0,b1,c2) {
      return (root['sortable'] = factory(a0,b1,c2));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),require("simple-module"),require("simple-dragdrop"));
  } else {
    root.simple = root.simple || {};
    root.simple['sortable'] = factory(jQuery,SimpleModule,simple.dragdrop);
  }
}(this, function ($, SimpleModule, SimpleDragdrop) {

var Sortable, sortable,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Sortable = (function(superClass) {
  extend(Sortable, superClass);

  function Sortable() {
    return Sortable.__super__.constructor.apply(this, arguments);
  }

  Sortable.prototype.opts = {
    wrapper: document,
    items: null,
    itemContainer: null,
    placeholder: null,
    helper: null,
    cursorPosition: 'auto',
    cursorOffset: {
      top: 0,
      left: 0
    },
    distance: 1,
    axis: null,
    handle: ''
  };

  Sortable.prototype._init = function() {
    this.wrapper = $(this.opts.wrapper);
    if (this.wrapper.length === 0) {
      throw new Error("simple-sortable: wrapper option is invalid");
    }
    this.dragdrop = SimpleDragdrop($.extend({}, this.opts, {
      wrapper: null,
      items: null,
      el: this.opts.wrapper,
      draggable: this.opts.items,
      droppable: this.opts.items + (this.opts.itemContainer ? "," + this.opts.itemContainer : '')
    }));
    this.wrapper.data('sortable', this);
    return this._bind();
  };

  Sortable.prototype._bind = function() {
    this.dragdrop.on('dragstart', (function(_this) {
      return function(e, event) {
        return _this.trigger('sortstart', {
          helper: event.helper,
          placeholder: event.placeholder,
          item: event.dragging
        });
      };
    })(this));
    this.dragdrop.on('dragenter', (function(_this) {
      return function(e, event) {
        var $placeholder, $target, els;
        $target = $(event.target);
        $placeholder = $(event.placeholder);
        if ($target.is(_this.opts.itemContainer)) {
          els = [event.helper.get(0), event.placeholder.get(0), event.dragging.get(0)];
          if ($target.find(_this.opts.items).not(els).length > 0) {
            return;
          }
          return $placeholder.appendTo($target);
        } else {
          if ($placeholder.prevAll().filter($target).length) {
            return $placeholder.insertBefore($target);
          } else {
            return $placeholder.insertAfter($target);
          }
        }
      };
    })(this));
    this.dragdrop.on('before-dragend', (function(_this) {
      return function(e, event) {
        var $dragging, $placeholder;
        $placeholder = $(event.placeholder);
        $dragging = $(event.dragging);
        return $placeholder.replaceWith($dragging);
      };
    })(this));
    return this.dragdrop.on('dragend', (function(_this) {
      return function(e, event) {
        return _this.trigger('sortend', {
          item: event.dragging
        });
      };
    })(this));
  };

  Sortable.prototype.destroy = function() {
    this.dragdrop.destroy();
    return this.placeholder = null;
  };

  return Sortable;

})(SimpleModule);

sortable = function(opts) {
  return new Sortable(opts);
};

return sortable;

}));