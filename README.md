# Simple Sortable

一个简单的排序组件，用来替代D&D API。

依赖项：

- JQuery 2.0+
- [Simple Module](https://github.com/mycolorway/simple-module)
- [Simple Dragdrop](https://github.com/mycolorway/simple-dragdrop)

### 使用方法
首先，需要在页面里引用相关脚本以及css

```html
<script type="text/javascript" src="path/to/jquery.min.js"></script>
<script type="text/javascript" src="path/to/module.js"></script>
<script type="text/javascript" src="path/to/dragdrop.js"></script>
<script type="text/javascript" src="path/to/sortable.js"></script>

```

通过sortable方法，实例化sortable对象

```
simple.dragdrop({
    wrapper: '.wrapper',
    items: '.ball'
});

```

### API 文档

####初始化选项

__wrapper__

必选，需要排序的元素的容器元素。

__items__

必选，需要排序的元素的selector string

__helper__

可选，拖拽的helper元素，可以是Dom/function，如果为空则为原元素。

__placeholder__

可选，开始拖动之后被拖拽元素会隐藏，显示placeholder，可以是Dom/function，如果为空，则是一个空白的占位元素

__cursorPosition__

可选，确定helper的相对于鼠标的位置，默认为'auto'，还可以为'center'（中心）, 'cornor'（左上角）

__cursorOffset__

可选，对helper位置进行微调，需要传入top以及left

__axis__

可选，拖拽的方向，默认为空, 可以为'x', 'y'

__distance__

可选，拖动触发的距离

#### 方法

__destroy()__

销毁sortable对象，还原初始环境

#### 事件

__sortstart__ opts: placeholder, helper, item

排序开始时触发

__sortend__ opts: item

排序结束时触发
