
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
    handle: ''

  _init: ->
    @wrapper = $(@opts.wrapper)
    throw new Error "simple-sortable: wrapper option is invalid" if @wrapper.length == 0

    @dragdrop = SimpleDragdrop $.extend {}, @opts,
      wrapper: null
      items: null
      el: @opts.wrapper
      draggable: @opts.items
      droppable: @opts.items

    @wrapper.data 'sortable', @

    @_bind()

  _bind: ->
    @dragdrop.on 'dragstart', (e, event) =>
      @trigger 'sortstart',
        helper: event.helper
        placeholder: event.placeholder
        item: event.dragging
    @dragdrop.on 'dragenter', (e, event) =>
      $placeholder = $(event.placeholder)
      $target = $(event.target)
      if $placeholder.prevAll().filter($target).length
        $placeholder.insertBefore $target
      else
        $placeholder.insertAfter $target

    @dragdrop.on 'before-dragend', (e, event) =>
      $placeholder = $(event.placeholder)
      $dragging = $(event.dragging)
      $placeholder.replaceWith $dragging

    @dragdrop.on 'dragend', (e, event) =>
      @trigger 'sortend',
        item: event.dragging

  destroy: ->
    @dragdrop.destroy()
    @placeholder = null

sortable = (opts) ->
  new Sortable(opts)
