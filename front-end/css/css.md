## CSS

### 1. 盒模型

### 2. BFC、IFC、GFC、FFC

**BFC(Block formatting context)：块级格式化上下文**，是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

- 触发条件：

  - 根元素
  - 浮动元素（float 属性不为 none）
  - position 为 absolute 或 fixed
  - overflow 不为 visible 的块元素
  - display 为 inline-block、table-cell、table-caption

- BFC 布局规则

  - 属于同一个 BFC 的两个相邻 Box 垂直排列
  - BFC 内，两个相邻 Box 的垂直距离由 margin 属性决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
  - BFC 中子元素的 margin box 的左边，与包含块(BFC)border box 的左边相接触(子元素 absolute 除外)
  - BFC 的区域不会与 float 的元素区域重叠
  - 计算 BFC 的高度时，浮动子元素也参与计算
  - 文字层不会被浮动蹭覆盖，环绕于周围

- BFC 应用：

  - 防止 margin 重叠 (同一个 BFC 内的两个两个相邻 Box 的 margin 会发生重叠，触发生成两个 BFC，即不会重叠)
  - 清除内部浮动(创建一个新的 BFC，因为根据 BFC 的规则，计算 BFC 的高度时，浮动元素也参与计算)
  - 自适应多栏布局(BFC 的区域不会与 float box 重叠。因此可以触发生成一个新的 BFC)

**IFC（Inline formatting contexts）：内联格式上下文**
IFC 的 line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的 padding/margin 影响))IFC 中的 line box 一般左右都贴紧整个 IFC，但是会因为 float 元素而扰乱

- IFC 应用：

  - 水平居中：当一个块要在环境中水平居中时，设置其为 inline-block 则会在外层产生 IFC，通过 text-align 则可以使其水平居中。
  - 垂直居中：创建一个 IFC，用其中一个元素撑开父元素的高度，然后设置其 vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。

**GFC（GrideLayout formatting contexts）：网格布局格式化上下文**

当一个元素设置 display 值为 grid 的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器上定义网格定义航和网格定义列属性各在网格项目上定义网格航和网格列为每一个网格项目定义位置和空间。

- GFC 应用：
  - GridLayout 控制行列，控制对齐

**FFC（Flex formatting contexts）:自适应格式上下文**
display 值为 flex 或者 inline-flex 的元素将会生成自适应容器（flex container）。

### 3. 层叠上下文

元素提升为一个比较特殊的图层，在三维空间中(z 轴)高出普通元素一等。

- 触发条件：

  - 根层叠上下文(html)
  - position
  - css3 属性
    - flex
    - transform
    - opacity
    - filter
    - will-change
    - -webkit-overflow-scrolling

- 层叠等级：层叠上下文在 z 轴上的排序
  - 在同一层叠上下文中，层叠等级才有意义
  - z-index 的优先级最高

![层叠等级](images/层叠等级.webp)

### 4. 居中布局

水平居中：

- 行内元素：text-align:center;
- 块级元素：margin: 0 auto;
- absolute + transform
- flex + justify-content: center;

垂直居中：

- line-hight: height;
- absolute + transform
- flex + align-items: center
- table

水平垂直居中：

- absolute + transform
- flex + justify-content + align-items

### 5. 选择器优先级

- !important > 行内样式 > #id > .class > tag > \* > 继承 > 默认
- 选择器**从右往左**解析

### 6. 去除浮动影响

- 通过增加伪元素清楚浮动
  - :after / <br> : clear: both
- 创建父级 BFC
- 父级设置高度

### 7. link 与@import 的区别

### 8. CSS 预处理器

预处理器原理：将类 css 语言通过**webpack 编译**转成浏览器可读的真正 CSS.

常用功能：

- 嵌套
- 变量
- 循环语句
- 条件语句
- 自动前缀
- 单位转换
- mixin 复用

### 9. CSS 动画

- transition：过渡动画

  - transition-property: 属性
  - transition-duration: 间隔
  - transition-timing-function: 曲线
  - transition-delay： 延迟
  - 常用钩子:transitionend

- animation / keyframes：

  - animation-name: 动画名称，对应@keyframes
  - animation-duration: 间隔
  - animation-timing-function: 曲线
  - animation-delay: 延迟
  - animation-iteration-count: 次数
  - infinite: 循环动画
  - animation-direction: 方向
  - alternate: 反向播放
  - animation-fill-mode: 静止模式
  - forwards: 停止时，保留最后一帧
  - backwards: 停止时，回到第一帧
  - both: 同时运用 forwards / backwards
  - 常用钩子: animationend

- 动画属性：尽量使用动画属性进行动画，能拥有较好的性能表现
  - translate
  - scale
  - rotate
  - skew
  - opacity
  - color

### 10. 经验
