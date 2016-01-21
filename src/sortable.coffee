
class Sortable extends SimpleModule

  opts:
    wrapper: document
    items: null
    itemContainer: null
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
      droppable: @opts.items + (if @opts.itemContainer then ",#{@opts.itemContainer}" else '')

    @wrapper.data 'sortable', @

    @_bind()

  _bind: ->
    @dragdrop.on 'dragstart', (e, event) =>
      @trigger 'sortstart',
        helper: event.helper
        placeholder: event.placeholder
        item: event.dragging
    @dragdrop.on 'dragenter', (e, event) =>
      $target = $(event.target)
      $placeholder = $(event.placeholder)
      if $target.is(@opts.itemContainer)
        els = [event.helper.get(0), event.placeholder.get(0), event.dragging.get(0)]
        return if $target.find(@opts.items).not(els).length > 0
        $placeholder.appendTo $target
      else
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
