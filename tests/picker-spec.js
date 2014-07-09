var $ = require('jquery'),
  expect = require('expect.js'),
  sinon = require('sinon'),
  Overlay = require('bui-overlay'),
  Picker = require('../index').ListPicker;

  describe('一般picker', function(){

  var textEl = $('<input type="text" id="c1" />').appendTo('body'),
      defaultValue = "a",
      valueEl = $('<input type="text" id="r2" />').appendTo('body');
  valueEl.val(defaultValue);

  var  items = [{text:'选项1',value:'a'},{text:'选项2',value:'b'},{text:'选项3',value:'c'},{text:"数字值",value:'3'}],
    list = new BUI.List.SimpleList({
      elCls:'bui-select-list',
      items : items
    }),
    picker = new Picker({
      children:[list],
      trigger:'#c1',
      valueField : '#r2',
      textField:textEl

    });

  picker.render();
  var list = picker.get('list');

  describe('测试初始化',function(){

    it('测试选项生成',function(){
      expect(list.get('items').length).to.be(items.length);
    });

    it('测试初始化值和文本',function(){
      expect(list.getSelectedValue()).to.be(defaultValue);

      expect(textEl.val()).to.be('选项1');
    });
  });
  describe('测试更改选项',function(){

    it('选中一项',function(){
      list.setSelectedByField('b');
      expect(valueEl.val()).to.be('b');
      expect(textEl.val()).to.be('选项2');
    });

    it('更改一项',function(){
      list.setSelectedByField('c');
      expect(valueEl.val()).to.be('c');
      expect(textEl.val()).to.be('选项3');
    });

    it('测试特殊值,非字符串',function(){
      var value = 3;
      picker.setSelectedValue(value);
      expect(valueEl.val()).to.be('3');
    });
    it('设置不存在项',function(){
      list.setSelectedByField('d');
      expect(valueEl.val()).to.be('');
      expect(textEl.val()).to.be('');
    });



    it('清除所有',function(){
      list.clearSelection('d');
      expect(valueEl.val()).to.be('');
      expect(textEl.val()).to.be('');
    });
  });

});


describe('数据生成picker', function(){

  var el = $('<div id="lp"></div>').appendTo('body'),
    items = [{text:'选项1',value:'a'},{text:'选项2',value:'b'},{text:'选项3',value:'c'},{text:"数字值",value:3}],
    picker = new Picker({
    render : '#lp',
    align:{
      points : ['tl','tl']
    },
    children:[{
        elCls:'bui-select-list',
        items : items
      }
    ]
  });
  picker.render();
  var el = picker.get('el');

  describe('测试选择器生成',function(){

    it('列表生成',function(){
      expect(picker.get('list')).not.to.be(null);
      expect(el.find('.bui-select-list').length).not.to.be(0);
      expect(el.find('.bui-list-item').length).to.be(items.length);
    });

    it('重置数据',function(){
      var items1 = [{text:'选项1',value:'a'},{text:'选项2',value:'b'},{text:'选项3',value:'c'},{text:"数字值",value:3},{text:"123",value:4}];
      picker.get('list').set('items',items1);
      expect(el.find('.bui-list-item').length).to.be(items1.length);
    });

  });

});

describe('picker事件', function(){

  $('<div id="l4"><input type="text" id="c3" class="a-picker" /><input type="text" id="c4" class="a-picker"/></div>').appendTo('body');

  var items = [{text:'选项1',value:'a'},{text:'选项2',value:'b'},{text:'选项3',value:'c'},{text:"数字值",value:3}],
    picker = new Picker({
    render : '#l4',
    trigger : '.a-picker',
    triggerActiveCls : 'active',
    align:{
      points : ['tl','tl']
    },
    children:[{
        elCls:'bui-select-list',
        items : items
      }
    ]
  });
  picker.render();

  var f1 = $('#c3'),
    f2 = $('#c4');

  describe('测试激活选择器',function(){
    it('触发选择',function(){
        f1.trigger('click');
        expect(picker.get('visible')).to.be(true);
        expect(f1.hasClass('active')).to.be(true);
    });

    it('切换trigger',function(){
        f2.trigger('click');
        expect(picker.get('visible')).to.be(true);
        expect(f1.hasClass('active')).to.be(false);
        expect(f2.hasClass('active')).to.be(true);
    });
    
    it('隐藏',function(){
      picker.hide();
      expect(f2.hasClass('active')).to.be(false);
    });
  });

});
