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
    itemContainers: null,
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
      itemContainers: null,
      el: this.opts.wrapper,
      draggable: this.opts.items,
      droppable: this.opts.itemContainers || this.opts.wrapper
    }));
    this.wrapper.data('sortable', this);
    return this._bind();
  };

  Sortable.prototype._bind = function() {
    this.dragdrop.on('beforedragstart', (function(_this) {
      return function(e, event) {
        return _this.triggerHandler('beforesortstart', event);
      };
    })(this));
    this.dragdrop.on('dragstart', (function(_this) {
      return function(e, event) {
        var startEvent;
        startEvent = {
          helper: event.helper,
          placeholder: event.placeholder,
          item: event.dragging
        };
        if (_this.triggerHandler('sortstart', startEvent) === false) {
          return;
        }
        return _this._placeholderStartMove(startEvent);
      };
    })(this));
    this.dragdrop.on('beforedragend', (function(_this) {
      return function(e, event) {
        var $dragging, $placeholder;
        _this._placeholderStopMove();
        if (_this.triggerHandler('beforesortend', {
          helper: event.helper,
          placeholder: event.placeholder,
          item: event.dragging
        }) === false) {
          return;
        }
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

  Sortable.prototype._placeholderStartMove = function(event) {
    this.wrapper.on('mouseenter.simple-sortable', this.opts.items, (function(_this) {
      return function(e) {
        var $placeholder, $target, enterEvent;
        $target = $(e.currentTarget);
        enterEvent = $.extend({}, event, {
          target: $target
        });
        if (_this.triggerHandler('sortenter', enterEvent) === false) {
          return;
        }
        $placeholder = $(event.placeholder);
        if ($placeholder.prevAll().filter($target).length > 0) {
          return $placeholder.insertBefore($target);
        } else {
          return $placeholder.insertAfter($target);
        }
      };
    })(this));
    return this.wrapper.on('mouseenter.simple-sortable', this.opts.itemContainers, (function(_this) {
      return function(e) {
        var $container, $placeholder, els, enterEvent;
        $container = $(e.currentTarget);
        $placeholder = $(event.placeholder);
        els = [event.helper.get(0), event.placeholder.get(0), event.item.get(0)];
        if ($container.find(_this.opts.items).not(els).length !== 0) {
          return;
        }
        enterEvent = $.extend({}, event, {
          target: $container
        });
        if (_this.triggerHandler('sortenter', enterEvent) === false) {
          return;
        }
        return $placeholder.appendTo($container);
      };
    })(this));
  };

  Sortable.prototype._placeholderStopMove = function() {
    return this.wrapper.off('mouseenter.simple-sortable');
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