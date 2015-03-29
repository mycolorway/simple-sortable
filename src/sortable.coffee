
class Sortable extends SimpleModule

  opts:
    wrapper: document
    items: null
    placeholder: null
    helper: null
    cursorPosition: 'auto'
    cursorOffset:
      top: 0
      left: 0
    distance: 1
    axis: null

  _init: ->
    @wrapper = $(@opts.wrapper)
    throw new Error "simple-sortable: wrapper option is invalid" if @wrapper.length == 0

    @dragdrop = SimpleDragdrop
      el: @opts.wrapper
      draggable: @opts.items
      droppable: @opts.items
      axis: @opts.axis
      placeholder: @opts.placeholder
      helper: @opts.helper
      cursorPosition: @opts.cursorPosition
      cursorOffset: @opts.cursorOffset
      distance: @opts.distance

    @wrapper.data 'sortable', @

    @_bind()

  _bind: ->
    @dragdrop.on 'dragstart', (e, dragging, helper, placeholder) =>
      @placeholder = $(placeholder)

      @trigger 'sortstart'

    @dragdrop.on 'dragenter', (e, $dragging, $target) =>
      if @placeholder.prevAll().filter($target).length
        @placeholder.insertBefore $target
      else
        @placeholder.insertAfter $target

    @dragdrop.on 'before-dragend', (e, $dragging) =>
      @placeholder.replaceWith $dragging

    @dragdrop.on 'dragend', (e) =>
      @trigger 'sortend'

  destroy: ->
    @dragdrop.destroy()
    @placeholder = null

sortable = (opts) ->
  new Sortable(opts)
