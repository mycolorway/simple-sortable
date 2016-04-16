
class Sortable extends SimpleModule

  opts:
    wrapper: document
    items: null
    itemContainers: null
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
      itemContainers: null
      el: @opts.wrapper
      draggable: @opts.items
      droppable: @opts.itemContainers || @opts.wrapper

    @wrapper.data 'sortable', @

    @_bind()

  _bind: ->
    @dragdrop.on 'beforedragstart', (e, event) =>
      return @triggerHandler('beforesortstart', event)

    @dragdrop.on 'dragstart', (e, event) =>
      startEvent =
        helper: event.helper
        placeholder: event.placeholder
        item: event.dragging
      return if @triggerHandler('sortstart', startEvent) == false

      @_placeholderStartMove startEvent

    # @dragdrop.on 'dragenter', (e, event) =>
    #   enterEvent =
    #     helper: event.helper
    #     placeholder: event.placeholder
    #     item: event.dragging
    #     target: event.target
    #   return if @triggerHandler('sortenter', enterEvent) == false
    #
    #   @_placeholderStartMove $(event.target), enterEvent

    # @dragdrop.on 'dragleave', (e, event) =>
    #   leaveEvent =
    #     helper: event.helper
    #     placeholder: event.placeholder
    #     item: event.dragging
    #     target: event.target
    #   @_placeholderStopMove $(event.target), leaveEvent

    @dragdrop.on 'beforedragend', (e, event) =>
      @_placeholderStopMove()

      return if @triggerHandler('beforesortend', {
        helper: event.helper
        placeholder: event.placeholder
        item: event.dragging
      }) == false

      $placeholder = $(event.placeholder)
      $dragging = $(event.dragging)
      $placeholder.replaceWith $dragging

    @dragdrop.on 'dragend', (e, event) =>
      @trigger 'sortend',
        item: event.dragging

  _placeholderStartMove: (event) ->
    @wrapper.on 'mouseenter.simple-sortable', @opts.items, (e) =>
      $target = $ e.currentTarget
      enterEvent = $.extend {}, event, {
        target: $target
      }
      return if @triggerHandler('sortenter', enterEvent) == false

      $placeholder = $ event.placeholder
      if $placeholder.prevAll().filter($target).length > 0
        $placeholder.insertBefore $target
      else
        $placeholder.insertAfter $target

    @wrapper.on 'mouseenter.simple-sortable', @opts.itemContainers, (e) =>
      $container = $ e.currentTarget
      $placeholder = $ event.placeholder
      els = [event.helper.get(0), event.placeholder.get(0), event.item.get(0)]
      return unless $container.find(@opts.items).not(els).length == 0

      enterEvent = $.extend {}, event, {
        target: $container
      }
      return if @triggerHandler('sortenter', enterEvent) == false

      $placeholder.appendTo $container

  _placeholderStopMove: ->
    @wrapper.off 'mouseenter.simple-sortable'

  destroy: ->
    @dragdrop.destroy()
    @placeholder = null

sortable = (opts) ->
  new Sortable(opts)
